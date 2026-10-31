export type EquipmentType = 'moka' | 'espresso' | 'pourover';

export type NutProfile = 'hazelnut' | 'pecan' | 'almond' | 'walnut';

export type SweetenerType = 'maple' | 'brown_sugar' | 'honey' | 'unsweetened';

export interface PantrySettings {
  cocoaLevel: number; // 0 to 3 (teaspoons of Dutch-process cocoa)
  nutType: NutProfile;
  nutIntensity: number; // 1 to 4 (e.g. 5ml to 20ml or paste)
  sweetener: SweetenerType;
  sweetnessLevel: number; // 0 to 3
  pinchOfSalt: boolean; // science trick
  spiceChoice: 'cinnamon' | 'nutmeg' | 'cardamom' | 'none';
}

export interface SensoryProfile {
  chocolate: number; // 0 - 100
  nutty: number; // 0 - 100
  body: number; // 0 - 100
  sweetness: number; // 0 - 100
  bitterness: number; // 0 - 100
  acidity: number; // 0 - 100
}

export interface BrewStep {
  id: string;
  phaseNumber: number;
  title: string;
  subtitle: string;
  durationSeconds: number;
  autoAdvance?: boolean;
  instructions: string[];
  scienceTip: string;
  targetMetric?: string;
  cutoffAlert?: string;
}

export interface EquipmentConfig {
  name: string;
  tagline: string;
  doseGrams: number;
  grindSize: string;
  waterAmountMl: number;
  yieldGrams: number;
  waterTemp: string;
  targetTimeSeconds: number;
  ratio: string;
  steps: BrewStep[];
  goldenRule: string;
}

export interface SavedRecipe {
  id: string;
  name: string;
  date: string;
  equipment: EquipmentType;
  servings: number;
  pantry: PantrySettings;
  cozyRating: number;
  personalNotes: string;
}
