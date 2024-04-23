import { PredavaciCard } from "@/components/predavaci-card.tsx";
import useSWR from "swr";
import { fetcher } from "@/lib/utils.ts";
import { FilterHeader } from "@/components/filter-header.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useAdminStore } from "@/store.tsx";
import { PiUserPlusDuotone } from "react-icons/pi";

export function Predavaci() {
  const store = useAdminStore();

  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/presenters`,
    fetcher,
  );

  const {
    data: names,
    error: namesError,
    isLoading: namesIsLoading,
  } = useSWR(`${import.meta.env.VITE_API_URL}/topics`, fetcher);

  const {
    data: organizations,
    error: organizationsError,
    isLoading: organizationsIsLoading,
  } = useSWR(`${import.meta.env.VITE_API_URL}/organizers`, fetcher);

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
          workshop.topicIds.includes(filter),
        );
      })
    : data;

  return (
    <div className="flex animate-fade-in-up flex-col">
      <div
        data-active={store.isAdmin}
        className="flex w-full items-center justify-end py-4 h-fit opacity-0 pointer-events-none  data-[active=true]:pointer-events-auto data-[active=true]:opacity-100 transition-all"
      >
        <Button className="animate-fade-in-up flex gap-2 items-center transition-all px-24">
          <PiUserPlusDuotone className="size-5" />
          Dodaj predavača
        </Button>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-[10vw] gap-8">
          <div>
            <h1 className="mb-2">Teme</h1>
            <FilterHeader onFilter={handleFilter} names={names} />
          </div>
          <div>
            <h1 className="mb-2">Organizacije</h1>
            <FilterHeader onFilter={handleFilter} names={organizations} />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {filteredPresenters.map((presenter: Presenter) => (
            <PredavaciCard key={presenter.id} presenter={presenter} />
          ))}
        </div>
      </div>
    </div>
  );
}
