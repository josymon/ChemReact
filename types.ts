export enum ElementCategory {
  ALKALI_METAL = 'Alkali Metal',
  ALKALINE_EARTH_METAL = 'Alkaline Earth Metal',
  TRANSITION_METAL = 'Transition Metal',
  POST_TRANSITION_METAL = 'Post-Transition Metal',
  METALLOID = 'Metalloid',
  NONMETAL = 'Nonmetal',
  HALOGEN = 'Halogen',
  NOBLE_GAS = 'Noble Gas',
  LANTHANIDE = 'Lanthanide',
  ACTINIDE = 'Actinide',
  COMPOUND = 'Compound',
  UNKNOWN = 'Unknown'
}

export interface ChemicalElement {
  symbol: string;
  name: string;
  number: number | string;
  category: ElementCategory;
  color: string;
  description: string;
  group?: number; // 1-18
  period?: number; // 1-7
}

export enum ReactionEffect {
  NONE = 'NONE',
  BUBBLES = 'BUBBLES',
  EXPLOSION = 'EXPLOSION',
  FIRE = 'FIRE',
  FREEZE = 'FREEZE',
  COLOR_CHANGE = 'COLOR_CHANGE',
  GLOW = 'GLOW',
  SMOKE = 'SMOKE',
  PRECIPITATE = 'PRECIPITATE'
}

export interface ReactionProduct {
  symbol: string;
  name: string;
  count: number;
}

export interface ReactionResponse {
  funDescription: string;
  visualEffect: ReactionEffect;
  balancedEquation: string;
  isPossible: boolean;
  resultColor?: string; // Hex code
  products?: ReactionProduct[]; // The resulting molecules
}

export interface DragItem {
  symbol: string;
  type: string;
}