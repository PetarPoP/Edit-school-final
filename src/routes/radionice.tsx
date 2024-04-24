import { RadionicaCard } from "../components/radionica-card.tsx";
import useSWR from "swr";
import { fetcher } from "@/lib/utils.ts";
import { FilterHeader } from "@/components/filter-header.tsx";
import { useState } from "react";
import { PiPlus, PiWarehouseDuotone } from "react-icons/pi";
import DialogAdd from "@/components/dialog-add.tsx";

export function Radionice() {
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/workshops`,
    fetcher,
  );

  const {
    data: topicsData,
    isLoading: topicsIsLoading,
    error: topicsIsError,
  } = useSWR(`${import.meta.env.VITE_API_URL}/topics`, fetcher);

  const {
    data: difficultiesData,
    isLoading: difficultiesIsLoading,
    error: difficultiesIsError,
  } = useSWR(`${import.meta.env.VITE_API_URL}/difficulties`, fetcher);

  if (isLoading || topicsIsLoading || difficultiesIsLoading)
    return <div>Loading</div>;
  if (error || topicsIsError || difficultiesIsError) return <div>error</div>;

  return (
    <div className="flex animate-fade-in-up flex-col">
      <DialogAdd
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
              names={topicsData}
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
              names={difficultiesData}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {data
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
