export type GameState = 'RECIPE' | 'MATERIALS' | 'SMELT' | 'SHAPE' | 'DEMON_CORE' | 'SPIRIT_ESSENCE' | 'HARMONIZATION' | 'TEMPERING';

export type CraftingTier = 'Fabing' | 'LingQi' | 'FaBao';

export interface CraftingContext {
  recipeIndex: number | null;
  tier: CraftingTier;
  investedStones: number;
  chosenFlawCategory: string | null;
  chosenHarmonizationCard: any | null;
  stats: Record<string, number>;
}
