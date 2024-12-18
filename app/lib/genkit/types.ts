import { z } from 'zod';

export const NPCGenFlowOutput = z.object({
  name: z.string(),
  species: z.string(),
  age: z.number(),
  gender: z.string(),
  description: z.string(),
  voice: z.string(),
  personality: z.string(),
  secret: z.string(),
  motivation: z.string(),
});

export const LocationGenFlowOutput = z.object({
  name: z.string(),
  description: z.string(),
  rumors: z.string().array(),
  secrets: z.string().array(),
  treasures: z.string().array(),
});

export type NPCGenFlowOutput = z.infer<typeof NPCGenFlowOutput>;
export type LocationGenFlowOutput = z.infer<typeof LocationGenFlowOutput>;