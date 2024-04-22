import { RadionicaCard } from "../components/radionica-card.tsx";
import useSWR from "swr";
import { fetcher } from "@/lib/utils.ts";
import { FilterHeader } from "@/components/filter-header.tsx";
import { useState } from "react";

export function Radionice() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/workshops",
    fetcher,
  );

  const {
    data: names,
    error: namesError,
    isLoading: namesIsLoading,
  } = useSWR("http://localhost:3000/themes", fetcher);

  const {
    data: difficulty,
    error: difficultyError,
    isLoading: difficultyIsLoading,
  } = useSWR("http://localhost:3000/difficulties", fetcher);

  const [selectedFilter, setSelectedFilter] = useState([] as string[]);

  const handleFilter = (id: string) => {
    setSelectedFilter((prev) => {
      if (prev.includes(id)) {
        return prev.filter((filter) => filter !== id);
      }
      return [...prev, id];
    });
  };

  if (error || namesError || difficultyError)
    return <div>Problem jbggggggg</div>;
  if (isLoading || namesIsLoading || difficultyIsLoading)
    return <div>Loading</div>;

  const filteredWorkshops = selectedFilter
    ? data.filter((workshop: Workshop) => {
        if (selectedFilter.length === 0) return true;
        return selectedFilter.some((filter) =>
          workshop.themeIds.includes(filter),
        );
      })
    : data;

  return (
    <div className="flex animate-fade-in-up flex-row">
      <div className="flex flex-col w-[10vw] gap-8">
        <div>
          <h1>Teme</h1>
          <FilterHeader onFilter={handleFilter} names={names} />
        </div>
        <div>
          <h1>Težina</h1>
          <FilterHeader onFilter={handleFilter} names={difficulty} />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {filteredWorkshops.map((radionica: Workshop) => (
          <RadionicaCard key={radionica.id} radionica={radionica} />
        ))}
      </div>
    </div>
  );
}
