import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ReactionResponse, ReactionEffect } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const reactionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    funDescription: {
      type: Type.STRING,
      description: "A fun, child-friendly description of what happens. Use simple words and emojis.",
    },
    visualEffect: {
      type: Type.STRING,
      enum: Object.values(ReactionEffect),
      description: "The primary visual effect to trigger in the animation.",
    },
    balancedEquation: {
      type: Type.STRING,
      description: "The balanced chemical equation (e.g., 2H2 + O2 -> 2H2O). If no reaction, just list ingredients.",
    },
    isPossible: {
      type: Type.BOOLEAN,
      description: "True if a chemical reaction actually occurs, False if they just mix or do nothing.",
    },
    resultColor: {
      type: Type.STRING,
      description: "A valid Hex color code representing the resulting substance (e.g., #FFFFFF for steam, #FF0000 for rust).",
    },
    products: {
      type: Type.ARRAY,
      description: "List of the resulting compounds/elements formed in the beaker. If just a mix, list the ingredients.",
      items: {
        type: Type.OBJECT,
        properties: {
          symbol: { type: Type.STRING, description: "Chemical symbol (e.g., H2O, NaCl)" },
          name: { type: Type.STRING, description: "Common name (e.g., Water, Salt)" },
          count: { type: Type.NUMBER, description: "Relative visual quantity (1-3)" }
        }
      }
    }
  },
  required: ["funDescription", "visualEffect", "balancedEquation", "isPossible", "products"],
};

export const simulateReaction = async (reactants: string[]): Promise<ReactionResponse> => {
  if (!apiKey) {
    return {
      funDescription: "API Key is missing! I can't run the simulation without it.",
      visualEffect: ReactionEffect.NONE,
      balancedEquation: "",
      isPossible: false
    };
  }

  const reactantList = reactants.join(", ");

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Simulate the chemical reaction between these reactants: ${reactantList}`,
      config: {
        systemInstruction: `You are a Chemistry Simulation Engine for a kids' educational app. 
        Your role is to simulate chemical reactions based on a list of ingredients.
        
        Rules:
        1. Tone: Fun, enthusiastic, simple (Ages 8-12).
        2. Accuracy: Provide the real balanced equation.
        3. Visuals: Choose the most appropriate visual effect enum.
        4. Colors: Provide a hex code that best represents the result.
        5. If nothing happens (e.g., Noble gases), explain why simply.
        6. If the reaction is dangerous (explosive), describe it safely but excitingly!
        7. Products: List the resulting molecules/elements so the app can visualize the change (e.g., H + H + O -> H2O).`,
        responseMimeType: "application/json",
        responseSchema: reactionSchema,
        temperature: 0.3, 
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as ReactionResponse;
    }
    
    throw new Error("No response text");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      funDescription: "Oops! The chemistry lab is having a hiccup. Try again!",
      visualEffect: ReactionEffect.SMOKE,
      balancedEquation: "Error + You -> Sad Face",
      isPossible: false
    };
  }
};