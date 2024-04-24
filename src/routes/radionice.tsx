import { RadionicaCard } from "../components/radionica-card.tsx";
import { FilterHeader } from "@/components/filter-header.tsx";
import { useState } from "react";
import { PiPlus, PiWarehouseDuotone } from "react-icons/pi";
import DialogAdd from "@/components/dialog-add.tsx";
import { useDataStore } from "@/store.tsx";

export function Radionice() {
  const storeData = useDataStore();
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);

  return (
    <div className="flex animate-fade-in-up flex-col">
      <DialogAdd
        type={2}
        ButtonText="Dodaj radionicu"
        Icon={PiWarehouseDuotone}
        IconSecondary={PiPlus}
        Title="Radionica"
        Description="Dodajte novu radionicu"
      />
      <div className="flex flex-row">
        <div className="flex flex-col w-[10vw] gap-8">
          <div>
            <h1 className="mb-2 text-lg">Teme</h1>
            <FilterHeader
              onFilter={(id) => {
                topics?.includes(id)
                  ? setTopics(topics?.filter((t) => t !== id))
                  : setTopics([...(topics ?? []), id]);
              }}
              names={storeData.topics}
            />
          </div>
          <div>
            <h1 className="mb-2 text-lg">Težine</h1>
            <FilterHeader
              onFilter={(id) => {
                difficulties?.includes(id)
                  ? setDifficulties(difficulties?.filter((t) => t !== id))
                  : setDifficulties([...(difficulties ?? []), id]);
              }}
              names={storeData.difficulties}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {storeData.workshops
            .filter((radionica: Workshop) => {
              if (topics.length === 0 && difficulties.length === 0) return true;
              if (topics.length > 0 && difficulties.length === 0) {
                return topics.some((topic) =>
                  radionica.topicIds.includes(topic),
                );
              }
              if (topics.length === 0 && difficulties.length > 0) {
                return difficulties.some((difficulty) =>
                  radionica.difficultyIds.includes(difficulty),
                );
              }
              if (topics.length > 0 && difficulties.length > 0) {
                return (
                  topics.some((topic) => radionica.topicIds.includes(topic)) &&
                  difficulties.some((difficulty) =>
                    radionica.difficultyIds.includes(difficulty),
                  )
                );
              }
            })
            .map((radionica: Workshop) => (
              <RadionicaCard key={radionica.id} radionica={radionica} />
            ))}
        </div>
      </div>
    </div>
  );
}
