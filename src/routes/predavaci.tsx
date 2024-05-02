import { PredavaciCard } from "@/components/predavaci-card.tsx";
import { useState } from "react";
import { useAdminStore, useDataStore } from "@/store.tsx";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { DodajPredavaca } from "@/components/logika-predavaci.tsx";

export function Predavaci() {
  const store = useAdminStore();
  const storeData = useDataStore();
  const [topics, setTopics] = useState<string[]>([]);
  const [org, setOrg] = useState<string[]>([]);

  return (
    <div className="flex animate-fade-in-up flex-col">
      <div
        data-active={store.isAdmin}
        className="flex w-full items-center justify-end py-4 h-fit opacity-0 pointer-events-none  data-[active=true]:pointer-events-auto data-[active=true]:opacity-100 transition-all"
      >
        <DodajPredavaca />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-fit gap-8 pr-8">
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
          <div className="md:pb-0 pb-8">
            <h1 className="mb-2">Organizacije</h1>
            <Select
              onValueChange={(id) => {
                if (id === "All") {
                  setOrg([]);
                  return;
                } else {
                  setOrg([id]);
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
                  {storeData.organizers.map((org) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {storeData.presenters
            .filter((presenter: Presenter) => {
              if (topics.length === 0 && org.length === 0) return true;
              if (topics.length > 0 && org.length === 0) {
                return topics.some((topic) =>
                  presenter.topicIds.includes(topic),
                );
              }
              if (topics.length === 0 && org.length > 0) {
                return org.some((orgData) =>
                  presenter.organizersId.includes(orgData),
                );
              }
              if (topics.length > 0 && org.length > 0) {
                return (
                  topics.some((topic) => presenter.topicIds.includes(topic)) &&
                  org.some((orgData) =>
                    presenter.organizersId.includes(orgData),
                  )
                );
              }
            })
            .map((presenter: Presenter) => (
              <PredavaciCard key={presenter.id} presenter={presenter} />
            ))}
        </div>
      </div>
    </div>
  );
}
