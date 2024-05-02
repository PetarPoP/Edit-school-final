import { RadionicaCard } from "../components/radionica-card.tsx";
import { useState } from "react";
import { useAdminStore, useDataStore } from "@/store.tsx";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Select } from "@radix-ui/react-select";
import { DodajRadionicu } from "@/components/logika-radionici.tsx";

export function Radionice() {
  const store = useAdminStore();
  const storeData = useDataStore();
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [organizers, setOrganizers] = useState<string[]>([]);
  const [presenters, setPresenters] = useState<string[]>([]);

  return (
    <div className="flex animate-fade-in-up flex-col">
      <div
        data-active={store.isAdmin}
        className="flex w-full items-center justify-end py-4 h-fit opacity-0 pointer-events-none
        data-[active=true]:pointer-events-auto data-[active=true]:opacity-100 transition-all"
      >
        <DodajRadionicu />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-fit gap-8 pr-8">
          <div>
            <h1 className="mb-2 text-lg">Predavači</h1>
            <Select
              onValueChange={(id) => {
                if (id === "All") {
                  setPresenters([]);
                  return;
                } else {
                  setPresenters([id]);
                }
              }}
            >
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Sve" />
              </SelectTrigger>
              <SelectContent className="w-56 max-h-56 overflow-y-scroll">
                <SelectGroup>
                  <SelectItem key="all" value="All">
                    {" "}
                    Sve{" "}
                  </SelectItem>
                  {storeData.presenters.map((presenter) => (
                    <SelectItem key={presenter.id} value={presenter.id}>
                      {presenter.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h1 className="mb-2 text-lg">Teme</h1>
            <Select
              onValueChange={(id) => {
                if (id === "All") {
                  setTopics([]);
                  return;
                } else {
                  setTopics([id]);
                }
              }}
            >
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Sve" />
              </SelectTrigger>
              <SelectContent className="w-56 max-h-56 overflow-y-scroll">
                <SelectGroup>
                  <SelectItem key="all" value="All">
                    {" "}
                    Sve{" "}
                  </SelectItem>
                  {storeData.topics.map((topic) => (
                    <SelectItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h1 className="mb-2 text-lg">Organizatori</h1>
            <Select
              onValueChange={(id) => {
                if (id === "All") {
                  setOrganizers([]);
                  return;
                } else {
                  setOrganizers([id]);
                }
              }}
            >
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Sve" />
              </SelectTrigger>
              <SelectContent className="w-56 max-h-56 overflow-y-scroll">
                <SelectGroup>
                  <SelectItem key="all" value="All">
                    {" "}
                    Sve{" "}
                  </SelectItem>
                  {storeData.organizers.map((organizer) => (
                    <SelectItem key={organizer.id} value={organizer.id}>
                      {organizer.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="md:pb-0 pb-8">
            <h1 className="mb-2 text-lg">Težine</h1>
            <Select
              onValueChange={(id) => {
                if (id === "All") {
                  setDifficulties([]);
                  return;
                } else {
                  setDifficulties([id]);
                }
              }}
            >
              <SelectTrigger className="w-full md:w-[150px] text-center">
                <SelectValue className="text-center" placeholder="Sve" />
              </SelectTrigger>
              <SelectContent className="w-56 max-h-56 overflow-y-scroll">
                <SelectGroup>
                  <SelectItem key="All" value="All">
                    {" "}
                    Sve{" "}
                  </SelectItem>
                  {storeData.difficulties.map((diff) => (
                    <SelectItem key={diff.id} value={diff.id}>
                      {diff.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {storeData.workshops
            .filter((radionica: Workshop) => {
              return (
                (topics.length === 0 ||
                  topics.some((topic) => radionica.topicIds.includes(topic))) &&
                (difficulties.length === 0 ||
                  difficulties.some((difficulty) =>
                    radionica.difficultyId.includes(difficulty),
                  )) &&
                (organizers.length === 0 ||
                  organizers.some((organizer) =>
                    radionica.organizersId.includes(organizer),
                  )) &&
                (presenters.length === 0 ||
                  presenters.some((presenter) =>
                    radionica.presenterIds.includes(presenter),
                  ))
              );
            })
            .map((radionica: Workshop) => (
              <RadionicaCard key={radionica.id} radionica={radionica} />
            ))}
        </div>
      </div>
    </div>
  );
}
