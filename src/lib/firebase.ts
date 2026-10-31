import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  signOut, 
  GoogleAuthProvider, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocFromServer,
  query,
  orderBy
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { SavedRecipe } from '../types/coffee';

const app = initializeApp(firebaseConfig);

// CRITICAL: Must pass firebaseConfig.firestoreDatabaseId to getFirestore
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map((provider) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validate connection on startup
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or database initializing.');
    }
    return false;
  }
}

// Auth helpers
export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google Sign-In failed:', error);
    throw error;
  }
}

export async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign-Out failed:', error);
    throw error;
  }
}

// Real-time listener for user recipe journal
export function subscribeToUserRecipes(
  userId: string,
  onUpdate: (recipes: SavedRecipe[]) => void,
  onError?: (err: unknown) => void
): () => void {
  const path = `users/${userId}/recipes`;
  const q = collection(db, 'users', userId, 'recipes');

  return onSnapshot(
    q,
    (snapshot) => {
      const recipes: SavedRecipe[] = [];
      snapshot.forEach((d) => {
        recipes.push(d.data() as SavedRecipe);
      });
      // Sort newest first
      recipes.sort((a, b) => (b.date > a.date ? 1 : -1));
      onUpdate(recipes);
    },
    (error) => {
      if (onError) onError(error);
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// Save or update recipe in Firestore
export async function saveRecipeToFirestore(userId: string, recipe: SavedRecipe): Promise<void> {
  const path = `users/${userId}/recipes/${recipe.id}`;
  try {
    const recipeRef = doc(db, 'users', userId, 'recipes', recipe.id);
    const cleanPayload = {
      id: recipe.id,
      userId,
      name: recipe.name.slice(0, 100),
      date: recipe.date,
      equipment: recipe.equipment,
      servings: Number(recipe.servings),
      pantry: recipe.pantry,
      cozyRating: Number(recipe.cozyRating),
      personalNotes: (recipe.personalNotes || '').slice(0, 500),
      createdAt: new Date().toISOString(),
    };
    await setDoc(recipeRef, cleanPayload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Delete recipe from Firestore
export async function deleteRecipeFromFirestore(userId: string, recipeId: string): Promise<void> {
  const path = `users/${userId}/recipes/${recipeId}`;
  try {
    const recipeRef = doc(db, 'users', userId, 'recipes', recipeId);
    await deleteDoc(recipeRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
