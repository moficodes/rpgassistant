"use server";
import { genkit, z } from "genkit";
import { ollama } from "genkitx-ollama";
import { NPCGenFlowOutput } from "./types";

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

ai.startFlowServer({
  flows: [menuSuggestionFlow, npcCreateFlow],
});