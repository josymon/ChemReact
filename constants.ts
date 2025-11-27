import { ChemicalElement, ElementCategory } from './types';

export const AVAILABLE_ELEMENTS: ChemicalElement[] = [
  { symbol: 'H', name: 'Hydrogen', number: 1, category: ElementCategory.NONMETAL, color: 'bg-red-400', description: 'Lightest element!' },
  { symbol: 'He', name: 'Helium', number: 2, category: ElementCategory.NOBLE_GAS, color: 'bg-pink-300', description: 'Makes balloons float.' },
  { symbol: 'Li', name: 'Lithium', number: 3, category: ElementCategory.ALKALI_METAL, color: 'bg-purple-500', description: 'In batteries.' },
  { symbol: 'C', name: 'Carbon', number: 6, category: ElementCategory.NONMETAL, color: 'bg-gray-600', description: 'Diamond & Coal.' },
  { symbol: 'N', name: 'Nitrogen', number: 7, category: ElementCategory.NONMETAL, color: 'bg-blue-400', description: 'Most of our air.' },
  { symbol: 'O', name: 'Oxygen', number: 8, category: ElementCategory.NONMETAL, color: 'bg-blue-600', description: 'We breathe this!' },
  { symbol: 'F', name: 'Fluorine', number: 9, category: ElementCategory.HALOGEN, color: 'bg-green-400', description: 'Reacts with everything!' },
  { symbol: 'Na', name: 'Sodium', number: 11, category: ElementCategory.ALKALI_METAL, color: 'bg-purple-600', description: 'Salty metal.' },
  { symbol: 'Cl', name: 'Chlorine', number: 17, category: ElementCategory.HALOGEN, color: 'bg-green-600', description: 'Pool cleaner.' },
  { symbol: 'K', name: 'Potassium', number: 19, category: ElementCategory.ALKALI_METAL, color: 'bg-purple-700', description: 'In bananas!' },
  { symbol: 'Fe', name: 'Iron', number: 26, category: ElementCategory.TRANSITION_METAL, color: 'bg-orange-700', description: 'Strong metal.' },
  { symbol: 'Cu', name: 'Copper', number: 29, category: ElementCategory.TRANSITION_METAL, color: 'bg-orange-500', description: 'Shiny penny.' },
  { symbol: 'Ag', name: 'Silver', number: 47, category: ElementCategory.TRANSITION_METAL, color: 'bg-gray-300', description: 'Shiny jewelry.' },
  { symbol: 'Au', name: 'Gold', number: 79, category: ElementCategory.TRANSITION_METAL, color: 'bg-yellow-400', description: 'Precious metal.' },
  // Compounds
  { symbol: 'H2O', name: 'Water', number: 'C', category: ElementCategory.COMPOUND, color: 'bg-blue-300', description: 'Splash!' },
  { symbol: 'CO2', name: 'Carbon Dioxide', number: 'C', category: ElementCategory.COMPOUND, color: 'bg-gray-400', description: 'Fizzy gas.' },
];
