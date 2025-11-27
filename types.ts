export enum ElementCategory {
  ALKALI_METAL = 'Alkali Metal',
  NONMETAL = 'Nonmetal',
  NOBLE_GAS = 'Noble Gas',
  TRANSITION_METAL = 'Transition Metal',
  HALOGEN = 'Halogen',
  COMPOUND = 'Compound'
}

export interface ChemicalElement {
  symbol: string;
  name: string;
  number: number | string;
  category: ElementCategory;
  color: string;
  description: string;
}

export enum ReactionEffect {
  NONE = 'NONE',
  BUBBLES = 'BUBBLES',
  EXPLOSION = 'EXPLOSION',
  FIRE = 'FIRE',
  FREEZE = 'FREEZE',
  COLOR_CHANGE = 'COLOR_CHANGE',
  GLOW = 'GLOW',
  SMOKE = 'SMOKE'
}

export interface ReactionResponse {
  funDescription: string;
  visualEffect: ReactionEffect;
  balancedEquation: string;
  isPossible: boolean;
  resultColor?: string; // Hex code for the resulting liquid/substance
}

export interface DragItem {
  symbol: string;
  type: string;
}
