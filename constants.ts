import { ChemicalElement, ElementCategory } from './types';

// Helper to assign colors based on category
const getCategoryColor = (cat: ElementCategory): string => {
  switch (cat) {
    case ElementCategory.ALKALI_METAL: return 'bg-red-500 border-red-400';
    case ElementCategory.ALKALINE_EARTH_METAL: return 'bg-orange-400 border-orange-300';
    case ElementCategory.TRANSITION_METAL: return 'bg-yellow-600 border-yellow-500';
    case ElementCategory.POST_TRANSITION_METAL: return 'bg-green-400 border-green-300';
    case ElementCategory.METALLOID: return 'bg-teal-500 border-teal-400';
    case ElementCategory.NONMETAL: return 'bg-blue-500 border-blue-400';
    case ElementCategory.HALOGEN: return 'bg-indigo-500 border-indigo-400';
    case ElementCategory.NOBLE_GAS: return 'bg-purple-500 border-purple-400';
    case ElementCategory.LANTHANIDE: return 'bg-pink-400 border-pink-300';
    case ElementCategory.ACTINIDE: return 'bg-pink-600 border-pink-500';
    case ElementCategory.UNKNOWN: return 'bg-gray-500 border-gray-400';
    default: return 'bg-gray-400 border-gray-300';
  }
};

// Simplified mapping for the periodic table grid
const elementsData = [
  // Period 1
  { n: 1, s: 'H', name: 'Hydrogen', cat: ElementCategory.NONMETAL, g: 1, p: 1 },
  { n: 2, s: 'He', name: 'Helium', cat: ElementCategory.NOBLE_GAS, g: 18, p: 1 },
  // Period 2
  { n: 3, s: 'Li', name: 'Lithium', cat: ElementCategory.ALKALI_METAL, g: 1, p: 2 },
  { n: 4, s: 'Be', name: 'Beryllium', cat: ElementCategory.ALKALINE_EARTH_METAL, g: 2, p: 2 },
  { n: 5, s: 'B', name: 'Boron', cat: ElementCategory.METALLOID, g: 13, p: 2 },
  { n: 6, s: 'C', name: 'Carbon', cat: ElementCategory.NONMETAL, g: 14, p: 2 },
  { n: 7, s: 'N', name: 'Nitrogen', cat: ElementCategory.NONMETAL, g: 15, p: 2 },
  { n: 8, s: 'O', name: 'Oxygen', cat: ElementCategory.NONMETAL, g: 16, p: 2 },
  { n: 9, s: 'F', name: 'Fluorine', cat: ElementCategory.HALOGEN, g: 17, p: 2 },
  { n: 10, s: 'Ne', name: 'Neon', cat: ElementCategory.NOBLE_GAS, g: 18, p: 2 },
  // Period 3
  { n: 11, s: 'Na', name: 'Sodium', cat: ElementCategory.ALKALI_METAL, g: 1, p: 3 },
  { n: 12, s: 'Mg', name: 'Magnesium', cat: ElementCategory.ALKALINE_EARTH_METAL, g: 2, p: 3 },
  { n: 13, s: 'Al', name: 'Aluminium', cat: ElementCategory.POST_TRANSITION_METAL, g: 13, p: 3 },
  { n: 14, s: 'Si', name: 'Silicon', cat: ElementCategory.METALLOID, g: 14, p: 3 },
  { n: 15, s: 'P', name: 'Phosphorus', cat: ElementCategory.NONMETAL, g: 15, p: 3 },
  { n: 16, s: 'S', name: 'Sulfur', cat: ElementCategory.NONMETAL, g: 16, p: 3 },
  { n: 17, s: 'Cl', name: 'Chlorine', cat: ElementCategory.HALOGEN, g: 17, p: 3 },
  { n: 18, s: 'Ar', name: 'Argon', cat: ElementCategory.NOBLE_GAS, g: 18, p: 3 },
  // Period 4
  { n: 19, s: 'K', name: 'Potassium', cat: ElementCategory.ALKALI_METAL, g: 1, p: 4 },
  { n: 20, s: 'Ca', name: 'Calcium', cat: ElementCategory.ALKALINE_EARTH_METAL, g: 2, p: 4 },
  { n: 21, s: 'Sc', name: 'Scandium', cat: ElementCategory.TRANSITION_METAL, g: 3, p: 4 },
  { n: 22, s: 'Ti', name: 'Titanium', cat: ElementCategory.TRANSITION_METAL, g: 4, p: 4 },
  { n: 23, s: 'V', name: 'Vanadium', cat: ElementCategory.TRANSITION_METAL, g: 5, p: 4 },
  { n: 24, s: 'Cr', name: 'Chromium', cat: ElementCategory.TRANSITION_METAL, g: 6, p: 4 },
  { n: 25, s: 'Mn', name: 'Manganese', cat: ElementCategory.TRANSITION_METAL, g: 7, p: 4 },
  { n: 26, s: 'Fe', name: 'Iron', cat: ElementCategory.TRANSITION_METAL, g: 8, p: 4 },
  { n: 27, s: 'Co', name: 'Cobalt', cat: ElementCategory.TRANSITION_METAL, g: 9, p: 4 },
  { n: 28, s: 'Ni', name: 'Nickel', cat: ElementCategory.TRANSITION_METAL, g: 10, p: 4 },
  { n: 29, s: 'Cu', name: 'Copper', cat: ElementCategory.TRANSITION_METAL, g: 11, p: 4 },
  { n: 30, s: 'Zn', name: 'Zinc', cat: ElementCategory.TRANSITION_METAL, g: 12, p: 4 },
  { n: 31, s: 'Ga', name: 'Gallium', cat: ElementCategory.POST_TRANSITION_METAL, g: 13, p: 4 },
  { n: 32, s: 'Ge', name: 'Germanium', cat: ElementCategory.METALLOID, g: 14, p: 4 },
  { n: 33, s: 'As', name: 'Arsenic', cat: ElementCategory.METALLOID, g: 15, p: 4 },
  { n: 34, s: 'Se', name: 'Selenium', cat: ElementCategory.NONMETAL, g: 16, p: 4 },
  { n: 35, s: 'Br', name: 'Bromine', cat: ElementCategory.HALOGEN, g: 17, p: 4 },
  { n: 36, s: 'Kr', name: 'Krypton', cat: ElementCategory.NOBLE_GAS, g: 18, p: 4 },
  // Period 5
  { n: 37, s: 'Rb', name: 'Rubidium', cat: ElementCategory.ALKALI_METAL, g: 1, p: 5 },
  { n: 38, s: 'Sr', name: 'Strontium', cat: ElementCategory.ALKALINE_EARTH_METAL, g: 2, p: 5 },
  { n: 39, s: 'Y', name: 'Yttrium', cat: ElementCategory.TRANSITION_METAL, g: 3, p: 5 },
  { n: 40, s: 'Zr', name: 'Zirconium', cat: ElementCategory.TRANSITION_METAL, g: 4, p: 5 },
  { n: 41, s: 'Nb', name: 'Niobium', cat: ElementCategory.TRANSITION_METAL, g: 5, p: 5 },
  { n: 42, s: 'Mo', name: 'Molybdenum', cat: ElementCategory.TRANSITION_METAL, g: 6, p: 5 },
  { n: 43, s: 'Tc', name: 'Technetium', cat: ElementCategory.TRANSITION_METAL, g: 7, p: 5 },
  { n: 44, s: 'Ru', name: 'Ruthenium', cat: ElementCategory.TRANSITION_METAL, g: 8, p: 5 },
  { n: 45, s: 'Rh', name: 'Rhodium', cat: ElementCategory.TRANSITION_METAL, g: 9, p: 5 },
  { n: 46, s: 'Pd', name: 'Palladium', cat: ElementCategory.TRANSITION_METAL, g: 10, p: 5 },
  { n: 47, s: 'Ag', name: 'Silver', cat: ElementCategory.TRANSITION_METAL, g: 11, p: 5 },
  { n: 48, s: 'Cd', name: 'Cadmium', cat: ElementCategory.TRANSITION_METAL, g: 12, p: 5 },
  { n: 49, s: 'In', name: 'Indium', cat: ElementCategory.POST_TRANSITION_METAL, g: 13, p: 5 },
  { n: 50, s: 'Sn', name: 'Tin', cat: ElementCategory.POST_TRANSITION_METAL, g: 14, p: 5 },
  { n: 51, s: 'Sb', name: 'Antimony', cat: ElementCategory.METALLOID, g: 15, p: 5 },
  { n: 52, s: 'Te', name: 'Tellurium', cat: ElementCategory.METALLOID, g: 16, p: 5 },
  { n: 53, s: 'I', name: 'Iodine', cat: ElementCategory.HALOGEN, g: 17, p: 5 },
  { n: 54, s: 'Xe', name: 'Xenon', cat: ElementCategory.NOBLE_GAS, g: 18, p: 5 },
  // Period 6
  { n: 55, s: 'Cs', name: 'Cesium', cat: ElementCategory.ALKALI_METAL, g: 1, p: 6 },
  { n: 56, s: 'Ba', name: 'Barium', cat: ElementCategory.ALKALINE_EARTH_METAL, g: 2, p: 6 },
  { n: 57, s: 'La', name: 'Lanthanum', cat: ElementCategory.LANTHANIDE, g: 3, p: 6 }, // Special case, handled in f-block
  { n: 72, s: 'Hf', name: 'Hafnium', cat: ElementCategory.TRANSITION_METAL, g: 4, p: 6 },
  { n: 73, s: 'Ta', name: 'Tantalum', cat: ElementCategory.TRANSITION_METAL, g: 5, p: 6 },
  { n: 74, s: 'W', name: 'Tungsten', cat: ElementCategory.TRANSITION_METAL, g: 6, p: 6 },
  { n: 75, s: 'Re', name: 'Rhenium', cat: ElementCategory.TRANSITION_METAL, g: 7, p: 6 },
  { n: 76, s: 'Os', name: 'Osmium', cat: ElementCategory.TRANSITION_METAL, g: 8, p: 6 },
  { n: 77, s: 'Ir', name: 'Iridium', cat: ElementCategory.TRANSITION_METAL, g: 9, p: 6 },
  { n: 78, s: 'Pt', name: 'Platinum', cat: ElementCategory.TRANSITION_METAL, g: 10, p: 6 },
  { n: 79, s: 'Au', name: 'Gold', cat: ElementCategory.TRANSITION_METAL, g: 11, p: 6 },
  { n: 80, s: 'Hg', name: 'Mercury', cat: ElementCategory.TRANSITION_METAL, g: 12, p: 6 },
  { n: 81, s: 'Tl', name: 'Thallium', cat: ElementCategory.POST_TRANSITION_METAL, g: 13, p: 6 },
  { n: 82, s: 'Pb', name: 'Lead', cat: ElementCategory.POST_TRANSITION_METAL, g: 14, p: 6 },
  { n: 83, s: 'Bi', name: 'Bismuth', cat: ElementCategory.POST_TRANSITION_METAL, g: 15, p: 6 },
  { n: 84, s: 'Po', name: 'Polonium', cat: ElementCategory.METALLOID, g: 16, p: 6 },
  { n: 85, s: 'At', name: 'Astatine', cat: ElementCategory.HALOGEN, g: 17, p: 6 },
  { n: 86, s: 'Rn', name: 'Radon', cat: ElementCategory.NOBLE_GAS, g: 18, p: 6 },
  // Period 7
  { n: 87, s: 'Fr', name: 'Francium', cat: ElementCategory.ALKALI_METAL, g: 1, p: 7 },
  { n: 88, s: 'Ra', name: 'Radium', cat: ElementCategory.ALKALINE_EARTH_METAL, g: 2, p: 7 },
  { n: 89, s: 'Ac', name: 'Actinium', cat: ElementCategory.ACTINIDE, g: 3, p: 7 }, // Special case, handled in f-block
  { n: 104, s: 'Rf', name: 'Rutherfordium', cat: ElementCategory.TRANSITION_METAL, g: 4, p: 7 },
  { n: 105, s: 'Db', name: 'Dubnium', cat: ElementCategory.TRANSITION_METAL, g: 5, p: 7 },
  { n: 106, s: 'Sg', name: 'Seaborgium', cat: ElementCategory.TRANSITION_METAL, g: 6, p: 7 },
  { n: 107, s: 'Bh', name: 'Bohrium', cat: ElementCategory.TRANSITION_METAL, g: 7, p: 7 },
  { n: 108, s: 'Hs', name: 'Hassium', cat: ElementCategory.TRANSITION_METAL, g: 8, p: 7 },
  { n: 109, s: 'Mt', name: 'Meitnerium', cat: ElementCategory.UNKNOWN, g: 9, p: 7 },
  { n: 110, s: 'Ds', name: 'Darmstadtium', cat: ElementCategory.UNKNOWN, g: 10, p: 7 },
  { n: 111, s: 'Rg', name: 'Roentgenium', cat: ElementCategory.UNKNOWN, g: 11, p: 7 },
  { n: 112, s: 'Cn', name: 'Copernicium', cat: ElementCategory.UNKNOWN, g: 12, p: 7 },
  { n: 113, s: 'Nh', name: 'Nihonium', cat: ElementCategory.UNKNOWN, g: 13, p: 7 },
  { n: 114, s: 'Fl', name: 'Flerovium', cat: ElementCategory.UNKNOWN, g: 14, p: 7 },
  { n: 115, s: 'Mc', name: 'Moscovium', cat: ElementCategory.UNKNOWN, g: 15, p: 7 },
  { n: 116, s: 'Lv', name: 'Livermorium', cat: ElementCategory.UNKNOWN, g: 16, p: 7 },
  { n: 117, s: 'Ts', name: 'Tennessine', cat: ElementCategory.UNKNOWN, g: 17, p: 7 },
  { n: 118, s: 'Og', name: 'Oganesson', cat: ElementCategory.UNKNOWN, g: 18, p: 7 },
  
  // Lanthanides
  { n: 58, s: 'Ce', name: 'Cerium', cat: ElementCategory.LANTHANIDE, g: 4, p: 8 },
  { n: 59, s: 'Pr', name: 'Praseodymium', cat: ElementCategory.LANTHANIDE, g: 5, p: 8 },
  { n: 60, s: 'Nd', name: 'Neodymium', cat: ElementCategory.LANTHANIDE, g: 6, p: 8 },
  { n: 61, s: 'Pm', name: 'Promethium', cat: ElementCategory.LANTHANIDE, g: 7, p: 8 },
  { n: 62, s: 'Sm', name: 'Samarium', cat: ElementCategory.LANTHANIDE, g: 8, p: 8 },
  { n: 63, s: 'Eu', name: 'Europium', cat: ElementCategory.LANTHANIDE, g: 9, p: 8 },
  { n: 64, s: 'Gd', name: 'Gadolinium', cat: ElementCategory.LANTHANIDE, g: 10, p: 8 },
  { n: 65, s: 'Tb', name: 'Terbium', cat: ElementCategory.LANTHANIDE, g: 11, p: 8 },
  { n: 66, s: 'Dy', name: 'Dysprosium', cat: ElementCategory.LANTHANIDE, g: 12, p: 8 },
  { n: 67, s: 'Ho', name: 'Holmium', cat: ElementCategory.LANTHANIDE, g: 13, p: 8 },
  { n: 68, s: 'Er', name: 'Erbium', cat: ElementCategory.LANTHANIDE, g: 14, p: 8 },
  { n: 69, s: 'Tm', name: 'Thulium', cat: ElementCategory.LANTHANIDE, g: 15, p: 8 },
  { n: 70, s: 'Yb', name: 'Ytterbium', cat: ElementCategory.LANTHANIDE, g: 16, p: 8 },
  { n: 71, s: 'Lu', name: 'Lutetium', cat: ElementCategory.LANTHANIDE, g: 17, p: 8 },
  
  // Actinides
  { n: 90, s: 'Th', name: 'Thorium', cat: ElementCategory.ACTINIDE, g: 4, p: 9 },
  { n: 91, s: 'Pa', name: 'Protactinium', cat: ElementCategory.ACTINIDE, g: 5, p: 9 },
  { n: 92, s: 'U', name: 'Uranium', cat: ElementCategory.ACTINIDE, g: 6, p: 9 },
  { n: 93, s: 'Np', name: 'Neptunium', cat: ElementCategory.ACTINIDE, g: 7, p: 9 },
  { n: 94, s: 'Pu', name: 'Plutonium', cat: ElementCategory.ACTINIDE, g: 8, p: 9 },
  { n: 95, s: 'Am', name: 'Americium', cat: ElementCategory.ACTINIDE, g: 9, p: 9 },
  { n: 96, s: 'Cm', name: 'Curium', cat: ElementCategory.ACTINIDE, g: 10, p: 9 },
  { n: 97, s: 'Bk', name: 'Berkelium', cat: ElementCategory.ACTINIDE, g: 11, p: 9 },
  { n: 98, s: 'Cf', name: 'Californium', cat: ElementCategory.ACTINIDE, g: 12, p: 9 },
  { n: 99, s: 'Es', name: 'Einsteinium', cat: ElementCategory.ACTINIDE, g: 13, p: 9 },
  { n: 100, s: 'Fm', name: 'Fermium', cat: ElementCategory.ACTINIDE, g: 14, p: 9 },
  { n: 101, s: 'Md', name: 'Mendelevium', cat: ElementCategory.ACTINIDE, g: 15, p: 9 },
  { n: 102, s: 'No', name: 'Nobelium', cat: ElementCategory.ACTINIDE, g: 16, p: 9 },
  { n: 103, s: 'Lr', name: 'Lawrencium', cat: ElementCategory.ACTINIDE, g: 17, p: 9 },
];

// Sort by atomic number to maintain order
elementsData.sort((a, b) => (typeof a.n === 'number' && typeof b.n === 'number' ? a.n - b.n : 0));

export const AVAILABLE_ELEMENTS: ChemicalElement[] = elementsData.map(e => ({
  symbol: e.s,
  name: e.name,
  number: e.n,
  category: e.cat,
  color: getCategoryColor(e.cat),
  description: `${e.cat}`,
  group: e.g,
  period: e.p
}));