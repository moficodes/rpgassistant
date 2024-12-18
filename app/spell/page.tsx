"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { z } from "zod";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import {spellDescriptionFlow} from "@/app/lib/genkit/genkit";

const Spell = z.object({
  index: z.string(),
  name: z.string(),
  level: z.number(),
});

type Spell = z.infer<typeof Spell>;

export default function Page() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string | null>(null);
  const [descriptionLoading, setDescriptionLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://www.dnd5eapi.co/api/spells")
      .then((res) => res.json())
      .then((data) => {
        setSpells(data.results);
        setLoading(false);
      });
  }, []);

  async function getSpellDescription(name: string) {
    const response = await spellDescriptionFlow(name);
    setDescription(response);
  }
  return (
    <div className="flex flex-1 flex-row gap-4 m-4 h-screen">
      <Card className="flex-1 p-4 w-full">
        <h1>Spell</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table className="table-fixed h-vh overflow-y-scroll">
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Describe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {spells.map((spell) => (
                <TableRow key={spell.index}>
                  <TableCell>{spell.name}</TableCell>
                  <TableCell>{spell.level}</TableCell>
                  <TableCell><button onClick={() => {getSpellDescription(spell.index)}}>Describe</button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
      <Card className="flex-1 p-4 w-full">
        <h1>Description</h1>
        {description ? (
          <p>{description}</p>
        ) : (
          <p>Click on a spell to see its description</p>
        )}
      </Card>
    </div>
  );
}
