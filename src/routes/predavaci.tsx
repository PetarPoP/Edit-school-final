import { PredavaciCard } from "@/components/predavaci-card.tsx";
import useSWR from "swr";
import { fetcher } from "@/lib/utils.ts";
import { FilterHeader } from "@/components/filter-header.tsx";
import { useState } from "react";

export function Predavaci() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/presenters",
    fetcher,
  );

  const {
    data: names,
    error: namesError,
    isLoading: namesIsLoading,
  } = useSWR("http://localhost:3000/themes", fetcher);

  const {
    data: organizations,
    error: organizationsError,
    isLoading: organizationsIsLoading,
  } = useSWR("http://localhost:3000/organizers", fetcher);

  const [selectedFilter, setSelectedFilter] = useState([] as string[]);

  const handleFilter = (id: string) => {
    setSelectedFilter((prev) => {
      if (prev.includes(id)) {
        return prev.filter((filter) => filter !== id);
      }
      return [...prev, id];
    });
  };

  if (error || namesError || organizationsError)
    return <div>Problem jbggggggg</div>;
  if (isLoading || namesIsLoading || organizationsIsLoading)
    return <div>Loading</div>;

  const filteredPresenters = selectedFilter
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
          <h1>Organizacije</h1>
          <FilterHeader onFilter={handleFilter} names={organizations} />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {filteredPresenters.map((presenter: Presenter) => (
          <PredavaciCard key={presenter.id} presenter={presenter} />
        ))}
      </div>
    </div>
  );
}
