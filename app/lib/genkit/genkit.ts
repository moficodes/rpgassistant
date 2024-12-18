"use server";
import { genkit, z } from "genkit";
import { ollama } from "genkitx-ollama";
import { LocationGenFlowOutput, NPCGenFlowOutput } from "./types";

const ai = genkit({
  plugins: [
    ollama({
      models: [
        {
          name: "llama3.3",
          type: "generate",
        },
      ],
      serverAddress: "http://localhost:8080",
    }),
  ],
  model: "ollama/llama3.3",
});

export const menuSuggestionFlow = ai.defineFlow(
  {
    name: "menuSuggestionFlow",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (restaurantTheme) => {
    const { text } = await ai.generate({
      prompt: `Invent a menu item for a ${restaurantTheme} themed restaurant.`,
    });
    return text;
  }
);

export const npcCreateFlow = ai.defineFlow(
  {
    name: "npcCreateFlow",
    inputSchema: z.string(),
    outputSchema: NPCGenFlowOutput,
  },
  async (npcDescription) => {
    const npcGen = ai.prompt('npc');
    const { output } = await npcGen({
      description: npcDescription,
    });
    if (!output) {
      throw new Error("Failed to generate NPC");
    }
    return output;
  }
);

export const locationCreateFlow = ai.defineFlow(
  {
    name: "locationCreateFlow",
    inputSchema: z.string(),
    outputSchema: LocationGenFlowOutput,
  },
  async (locationDescription) => {
    const locationGen = ai.prompt('location');
    const { output } = await locationGen({
      description: locationDescription,
    });
    if (!output) {
      throw new Error("Failed to generate location");
    }
    return output;
  }
);

const getSpell = ai.defineTool(
  {
    name: "getSpell",
    description: "Get description of a spell",
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (name) => {
    const response = await fetch(`https://www.dnd5eapi.co/api/spells/${name}`)
    const {desc} = await response.json();
    return desc.join('');
  }
);

export const spellDescriptionFlow = ai.defineFlow(
  {
    name: "spellDescriptionFlow",
    inputSchema: z.string(),
    outputSchema: z.string(),

  },
  async (spellName) => {
    const {text} = await ai.generate({
      prompt: `Provide a short visual description of the spell: ${spellName}. Describe what it looks like as the caster casts it.`,
      tools: [getSpell],
    })
    return text;
  }
);

ai.startFlowServer({
  flows: [npcCreateFlow, locationCreateFlow],
});