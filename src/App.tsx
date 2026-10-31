import React, { useState, useEffect } from 'react';
import { EquipmentType, PantrySettings, SavedRecipe } from './types/coffee';
import { Header } from './components/Header';
import { HeroDrink } from './components/HeroDrink';
import { PantryCustomizer } from './components/PantryCustomizer';
import { RecipeCard } from './components/RecipeCard';
import { BrewAssistant } from './components/BrewAssistant';
import { ExtractionScience } from './components/ExtractionScience';
import { SavedBrews } from './components/SavedBrews';
import { ShoppingListModal } from './components/ShoppingListModal';
import { ShareRecipeModal } from './components/ShareRecipeModal';
import { VisualizeBrewModal } from './components/VisualizeBrewModal';
import { formatEmojiRecipe } from './utils/formatRecipe';
import { 
  auth, 
  signInWithGoogle, 
  signOutUser, 
  subscribeToUserRecipes, 
  saveRecipeToFirestore, 
  deleteRecipeFromFirestore, 
  testConnection 
} from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Star, X } from 'lucide-react';

const INITIAL_PANTRY: PantrySettings = {
  cocoaLevel: 2, // 2 tsp Dutch cocoa (rich fudge note)
  nutType: 'hazelnut',
  nutIntensity: 3, // Distinct toasted aroma
  sweetener: 'maple',
  sweetnessLevel: 1, // Subtle touch
  pinchOfSalt: true, // Essential bitterness suppressor
  spiceChoice: 'cinnamon',
};

const DEFAULT_SAVED_RECIPES: SavedRecipe[] = [
  {
    id: 'signature-hazelnut',
    name: 'Signature Toasted Hazelnut Cacao Cortado',
    date: 'Daily Morning',
    equipment: 'moka',
    servings: 1,
    pantry: INITIAL_PANTRY,
    cozyRating: 5,
    personalNotes: 'Unsweetened Dutch cacao dissolved into the hot Moka stream with a pinch of sea salt, topped with silky 62°C oat microfoam.',
  },
  {
    id: 'pecan-maple-breve',
    name: 'Roasted Pecan & Dark Maple Cortado',
    date: 'Weekend Treat',
    equipment: 'espresso',
    servings: 2,
    pantry: {
      cocoaLevel: 2,
      nutType: 'pecan',
      nutIntensity: 4,
      sweetener: 'maple',
      sweetnessLevel: 2,
      pinchOfSalt: true,
      spiceChoice: 'nutmeg',
    },
    cozyRating: 5,
    personalNotes: 'Rich autumn pecan notes with real Grade A maple. Tastes like a cozy liquid pecan pie with dense caffeine punch.',
  },
  {
    id: 'pure-dark-almond',
    name: 'Midnight Almond & Cacao Ristretto',
    date: 'High Energy',
    equipment: 'espresso',
    servings: 1,
    pantry: {
      cocoaLevel: 3,
      nutType: 'almond',
      nutIntensity: 2,
      sweetener: 'unsweetened',
      sweetnessLevel: 0,
      pinchOfSalt: true,
      spiceChoice: 'none',
    },
    cozyRating: 4,
    personalNotes: 'Double dark ganache with zero sugar added, letting natural oat milk sweetness and toasted almond carry the body.',
  },
];

export default function App() {
  const [equipment, setEquipment] = useState<EquipmentType>('moka');
  const [servings, setServings] = useState<number>(1);
  const [pantry, setPantry] = useState<PantrySettings>(INITIAL_PANTRY);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [triggerStartCount, setTriggerStartCount] = useState<number>(0);

  // Firebase Auth & Cloud Sync State
  const [user, setUser] = useState<User | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const handleTriggerStartBrew = () => {
    setTriggerStartCount((prev) => prev + 1);
    handleNavigate('timer');
  };

  // Saved recipes state with localStorage fallback
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>(() => {
    try {
      const stored = localStorage.getItem('velvet_roast_presets');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to load saved presets from localStorage:', e);
    }
    return DEFAULT_SAVED_RECIPES;
  });

  // Modal State for saving custom preset
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');
  const [newPresetRating, setNewPresetRating] = useState(5);
  const [newPresetNotes, setNewPresetNotes] = useState('');

  // Shopping List Modal State
  const [isShoppingListOpen, setIsShoppingListOpen] = useState(false);

  // Share Recipe Modal State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareRecipeText, setShareRecipeText] = useState('');

  // Visualize Brew Modal State
  const [isVisualizeModalOpen, setIsVisualizeModalOpen] = useState(false);

  const handleTriggerCopyRecipe = () => {
    const text = formatEmojiRecipe(equipment, pantry, servings);
    navigator.clipboard.writeText(text);
    setShareRecipeText(text);
    setIsShareModalOpen(true);
  };

  // Test connection and observe Firebase Auth state
  useEffect(() => {
    testConnection();

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen to Firestore real-time updates when user is authenticated
  useEffect(() => {
    if (!user) return;

    setIsSyncing(true);
    const unsubscribeSnapshot = subscribeToUserRecipes(
      user.uid,
      (cloudRecipes) => {
        if (cloudRecipes.length > 0) {
          setSavedRecipes(cloudRecipes);
        }
        setIsSyncing(false);
      },
      (err) => {
        console.warn('Firestore snapshot error:', err);
        setIsSyncing(false);
      }
    );

    return () => unsubscribeSnapshot();
  }, [user]);

  // Sync dark class on document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist locally for instant offline fallback
  useEffect(() => {
    try {
      localStorage.setItem('velvet_roast_presets', JSON.stringify(savedRecipes));
    } catch (e) {
      console.warn('Failed to persist presets to localStorage:', e);
    }
  }, [savedRecipes]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  const handleLoadRecipe = (recipe: SavedRecipe) => {
    setEquipment(recipe.equipment);
    setServings(recipe.servings);
    setPantry(recipe.pantry);
    handleNavigate('recipe');
  };

  const handleDeleteRecipe = async (id: string) => {
    setSavedRecipes((prev) => prev.filter((r) => r.id !== id));
    if (user) {
      try {
        await deleteRecipeFromFirestore(user.uid, id);
      } catch (err) {
        console.error('Failed to delete recipe from cloud:', err);
      }
    }
  };

  const handleOpenSaveModal = () => {
    setNewPresetName(`My ${pantry.nutType.charAt(0).toUpperCase() + pantry.nutType.slice(1)} Cacao Cortado`);
    setNewPresetRating(5);
    setNewPresetNotes('');
    setIsModalOpen(true);
  };

  const handleConfirmSavePreset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresetName.trim()) return;

    const newRecipe: SavedRecipe = {
      id: `custom-${Date.now()}`,
      name: newPresetName.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      equipment,
      servings,
      pantry,
      cozyRating: newPresetRating,
      personalNotes: newPresetNotes.trim(),
    };

    setSavedRecipes([newRecipe, ...savedRecipes]);
    setIsModalOpen(false);

    // Save to Firestore if user is authenticated
    if (user) {
      try {
        await saveRecipeToFirestore(user.uid, newRecipe);
      } catch (err) {
        console.error('Failed to save recipe to cloud:', err);
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-[#080D18] via-[#10132B] to-[#1D0C28] text-[#F7F6FC]' 
        : 'bg-gradient-to-br from-[#FFFFFF] via-[#FDFBF7] to-[#F5ECD8] text-[#1A1924]'
    }`}>
      
      {/* Top Bar adhering to the 3-zone contract */}
      <Header
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenShoppingList={() => setIsShoppingListOpen(true)}
        onOpenVisualizeBrew={() => setIsVisualizeModalOpen(true)}
        user={user}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />

      <main>
        {/* Hero Drink Showcase */}
        <HeroDrink
          equipment={equipment}
          onSelectEquipment={setEquipment}
          servings={servings}
          onSelectServings={setServings}
          onStartBrew={handleTriggerStartBrew}
          onOpenShoppingList={() => setIsShoppingListOpen(true)}
          onCopyRecipe={handleTriggerCopyRecipe}
          onOpenVisualizeBrew={() => setIsVisualizeModalOpen(true)}
        />

        {/* Scaled Dosing & Ingredient Card */}
        <RecipeCard
          equipment={equipment}
          pantry={pantry}
          servings={servings}
          onSaveRecipeModal={handleOpenSaveModal}
          onStartBrewTimer={handleTriggerStartBrew}
          onOpenShoppingList={() => setIsShoppingListOpen(true)}
          onShareRecipe={(text) => {
            setShareRecipeText(text);
            setIsShareModalOpen(true);
          }}
          onOpenVisualizeBrew={() => setIsVisualizeModalOpen(true)}
        />

        {/* Pantry Customizer & Dynamic Sensory Radar */}
        <PantryCustomizer
          pantry={pantry}
          onChangePantry={setPantry}
          equipment={equipment}
          onOpenVisualizeBrew={() => setIsVisualizeModalOpen(true)}
        />

        {/* Live Step-by-Step Brew Assistant with Visual Countdown & Acoustic Chimes */}
        <BrewAssistant
          equipment={equipment}
          pantry={pantry}
          servings={servings}
          triggerStartCount={triggerStartCount}
        />

        {/* My Morning Brew Journal (Connected to Firebase Firestore & Auth) */}
        <SavedBrews
          savedRecipes={savedRecipes}
          onLoadRecipe={handleLoadRecipe}
          onDeleteRecipe={handleDeleteRecipe}
          onOpenSaveModal={handleOpenSaveModal}
          user={user}
          onSignIn={handleSignIn}
          isSyncing={isSyncing}
          onCopySavedRecipe={(r) => {
            const text = formatEmojiRecipe(r.equipment, r.pantry, r.servings);
            navigator.clipboard.writeText(text);
            setShareRecipeText(text);
            setIsShareModalOpen(true);
          }}
        />

        {/* The Zero-Bitterness Science & Dial-In Diagnostics */}
        <ExtractionScience />
      </main>

      {/* Clean Editorial Footer */}
      <footer className="py-12 border-t border-[#E6D9C0] dark:border-[#2D2146] text-center text-xs text-[#7E766A] dark:text-[#9088A5] transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-2">
          <div className="font-serif-display text-base font-medium text-[#1A1924] dark:text-[#F7F6FC]">
            Velvet Roast
          </div>
          <p>
            Engineered for dark roast coffee lovers who crave intensity, zero sourness, and velvety chocolate warmth.
          </p>
          <div className="pt-2 text-[11px] text-[#A0885E] dark:text-[#7A608F]">
            Cortado Formulation: 1 Part Dense Ristretto Extract · 1 Part Silky 62°C Barista Oat Milk · Cloud Database Sync
          </div>
        </div>
      </footer>

      {/* Save Recipe Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-gradient-to-br from-white via-[#FCFAF5] to-[#F8F2E4] dark:from-[#11172E] dark:via-[#17122C] dark:to-[#220E2C] border border-[#E6D9C0] dark:border-[#3B254E] rounded-2xl w-full max-w-md p-6 space-y-5 shadow-2xl transition-colors">
            <div className="flex items-center justify-between border-b border-[#E6D9C0] dark:border-[#2E2145] pb-3">
              <h3 className="font-serif-display text-lg font-semibold text-[#1A1924] dark:text-[#F7F6FC]">
                Log Recipe to Journal
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#7E766A] dark:text-[#9088A5] hover:text-[#1A1924] dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmSavePreset} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7E766A] dark:text-[#9F96B2] mb-1">
                  Preset Title
                </label>
                <input
                  type="text"
                  required
                  value={newPresetName}
                  onChange={(e) => setNewPresetName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B101D] border border-[#E6D9C0] dark:border-[#35274B] text-sm text-[#1A1924] dark:text-[#F7F6FC] focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="e.g. Autumn Hazelnut Ganache"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7E766A] dark:text-[#9F96B2] mb-1">
                  Cozy Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewPresetRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= newPresetRating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-[#D8C9AA] dark:text-[#35254A]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-[#7E766A] dark:text-[#9F96B2] ml-2 font-mono-data">
                    {newPresetRating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#7E766A] dark:text-[#9F96B2] mb-1">
                  Barista Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={newPresetNotes}
                  onChange={(e) => setNewPresetNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#0B101D] border border-[#E6D9C0] dark:border-[#35274B] text-xs text-[#1A1924] dark:text-[#F7F6FC] focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="e.g. Extra dash of cinnamon on top; pulled ristretto cut at 26 seconds."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6D9C0] dark:border-[#2E2145]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-[#7E766A] dark:text-[#9F96B2] hover:text-[#1A1924] dark:hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 rounded-lg shadow transition-all"
                >
                  Save to Journal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Shopping List Modal */}
      <ShoppingListModal
        isOpen={isShoppingListOpen}
        onClose={() => setIsShoppingListOpen(false)}
        equipment={equipment}
        pantry={pantry}
        servings={servings}
      />

      {/* Share & Social Media Modal */}
      <ShareRecipeModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        recipeText={shareRecipeText}
        recipeTitle={`Toasted Cacao & ${pantry.nutType.charAt(0).toUpperCase() + pantry.nutType.slice(1)} Oat Cortado`}
      />

      {/* Visualize Brew Modal */}
      <VisualizeBrewModal
        isOpen={isVisualizeModalOpen}
        onClose={() => setIsVisualizeModalOpen(false)}
        equipment={equipment}
        pantry={pantry}
        servings={servings}
      />

    </div>
  );
}
