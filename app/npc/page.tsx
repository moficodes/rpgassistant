"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { npcCreateFlow } from "@/app/lib/genkit/genkit";
import { useState, useEffect } from "react";
import { NPCGenFlowOutput } from "@/app/lib/genkit/types";
import { getNPCs } from "@/app/lib/firebase/actions";

const NPCs = ({ npcs }: { npcs: NPCGenFlowOutput[] }) => {
  return (
    <div>
      <Accordion type="single" collapsible>
        {npcs.map((npc) => (
          <AccordionItem key={npc.name} value={npc.name}>
            <AccordionTrigger className="text-xl">{npc.name} ({npc.species})</AccordionTrigger>
            <AccordionContent className="text-base">{npc.description}</AccordionContent>
            <AccordionContent>{npc.motivation}</AccordionContent>
            <AccordionContent>{npc.secret}</AccordionContent>
            <AccordionContent>{npc.personality}</AccordionContent>
            <AccordionContent>{npc.voice}</AccordionContent>

          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const NPC = ({ npc }: { npc: NPCGenFlowOutput }) => {
  return (
    <div>
      <p className="text-lg">{npc.name}</p>
      <p className="text-sm">{npc.description}</p>
      <p>Species: {npc.species}</p>
      <p>Age: {npc.age}</p>
      <p>Secret: {npc.secret}</p>
      <p>Motivation: {npc.motivation}</p>
      <p>Personality: {npc.personality}</p>
      <p>Voice: {npc.voice}</p>
    </div>
  );
};

export default function Page() {
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [npc, setNPC] = useState<NPCGenFlowOutput>();
  const [npcs, setNPCs] = useState<NPCGenFlowOutput[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const npcs = await getNPCs();
      console.log(npcs);
      setNPCs(npcs);
    };
    fetchData();
  }, []);

  async function createNewLocation(description: string) {
    const response = await npcCreateFlow(description);
    console.log(response);
    setNPC(response);
    setNPCs([...npcs, response]);
  }
  return (
    <div className="flex flex-row gap-4 w-screen p-4">
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex flex-row gap-4">
          <Input
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            type="text"
          ></Input>
          <Button
            onClick={() => {
              createNewLocation(description);
            }}
          >
            Generate
          </Button>
          <Button
            onClick={() => {
              setNPC(undefined);
              setDescription("");
            }}
          >
            Clear
          </Button>
        </div>
        <div className="flex-1">
          {npc && <NPC npc={npc} />}
        </div>
      </div>
      <div className="flex-1">
        {npcs.length > 0 && <NPCs npcs={npcs} />}
      </div>
    </div>
  );
}
