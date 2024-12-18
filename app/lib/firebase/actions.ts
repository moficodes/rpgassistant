'use server';

import { firestore } from "@/app/lib/firebase/config";
import { LocationGenFlowOutput, NPCGenFlowOutput } from "@/app/lib/genkit/types";

export async function getLocations() {
  const snapshot = await firestore.collection("locations").get();
  const response =  snapshot.docs.map(doc => doc.data() as LocationGenFlowOutput);
  console.log(response);
  return response;
}

export async function getNPCs() {
  const snapshot = await firestore.collection("npcs").get();
  const response =  snapshot.docs.map(doc => doc.data() as NPCGenFlowOutput);
  console.log(response);
  return response;
}