"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { locationCreateFlow } from "@/app/lib/genkit/genkit";
import { useState, useEffect } from "react";
import { LocationGenFlowOutput } from "@/app/lib/genkit/types";
import { getLocations } from "@/app/lib/firebase/actions";

const Locations = ({ locations }: { locations: LocationGenFlowOutput[] }) => {
  return (
    <div>
      <Accordion type="single" collapsible>
        {locations.map((location) => (
          <AccordionItem key={location.name} value={location.name}>
            <AccordionTrigger className="text-xl">{location.name} ({location.locationType})</AccordionTrigger>
            <AccordionContent className="text-base">{location.description}</AccordionContent>
            <AccordionContent className="text-lg">Rumors</AccordionContent>
            <AccordionContent>{location.rumors.map((rumor, index) => <li key={index}>{rumor}</li>)}</AccordionContent>
            <AccordionContent className="text-lg">Secrets</AccordionContent>
            <AccordionContent>{location.secrets.map((secret, index) => <li key={index}>{secret}</li>)}</AccordionContent>
            <AccordionContent className="text-lg">Tresures</AccordionContent>
            <AccordionContent>{location.treasures.map((treasure, index) => <li key={index}>{treasure}</li>)}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

const Location = ({ location }: { location: LocationGenFlowOutput }) => {
  return (
    <div>
      <p className="text-lg">{location.name}</p>
      <p className="text-sm">{location.description}</p>
      <div>
        <p className="text-lg">Rumors</p>
        {location.rumors.map((rumor, index) => (
          <li key={index}>{rumor}</li>
        ))}
      </div>
      <div>
        <p className="text-lg">Secrets</p>
        {location.secrets.map((secret, index) => (
          <li key={index}>{secret}</li>
        ))}
      </div>
      <div>
        <p className="text-lg">Treasures</p>
        {location.treasures.map((treasure, index) => (
          <li key={index}>{treasure}</li>
        ))}
      </div>
    </div>
  );
};

export default function Page() {
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<LocationGenFlowOutput>();
  const [locations, setLocations] = useState<LocationGenFlowOutput[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const locations = await getLocations();
      setLocations(locations);
    };
    fetchData();
  }, []);

  async function createNewLocation(description: string) {
    const response = await locationCreateFlow(description);
    setLocation(response);
    setLocations([...locations, response]);
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
              setLocation(undefined);
              setDescription("");
            }}
          >
            Clear
          </Button>
        </div>
        <div className="flex-1">
          {location && <Location location={location} />}
        </div>
      </div>
      <div className="flex-1">
        {locations.length > 0 && <Locations locations={locations} />}
      </div>
    </div>
  );
}
