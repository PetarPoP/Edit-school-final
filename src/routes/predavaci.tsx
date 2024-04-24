import { PredavaciCard } from "@/components/predavaci-card.tsx";
import useSWR from "swr";
import { fetcher } from "@/lib/utils.ts";
import { FilterHeader } from "@/components/filter-header.tsx";
import { PiUserPlusDuotone } from "react-icons/pi";
import { useState } from "react";
import DialogAdd from "@/components/dialog-add.tsx";

export function Predavaci() {
  const [topics, setTopics] = useState<string[]>([]);
  const [org, setOrg] = useState<string[]>([]);

  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/presenters`,
    fetcher,
  );

  const {
    data: topicsData,
    isLoading: topicsIsLoading,
    error: topicsIsError,
  } = useSWR(`${import.meta.env.VITE_API_URL}/topics`, fetcher);

  const {
    data: organizations,
    error: organizationsError,
    isLoading: organizationsIsLoading,
  } = useSWR(`${import.meta.env.VITE_API_URL}/organizers`, fetcher);

  if (error || topicsIsError || organizationsError)
    return <div>Problem jbggggggg</div>;
  if (isLoading || topicsIsLoading || organizationsIsLoading)
    return <div>Loading</div>;

  return (
    <div className="flex animate-fade-in-up flex-col">
      <DialogAdd
        ButtonText="Dodaj predavača"
        Icon={PiUserPlusDuotone}
        Title="Predavač"
        Description="Dodajte novog predavača"
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
            <h1 className="mb-2">Organizacije</h1>
            <FilterHeader
              onFilter={(id) => {
                org?.includes(id)
                  ? setOrg(org?.filter((t) => t !== id))
                  : setOrg([...(org ?? []), id]);
              }}
              names={organizations}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {data
            .filter((presenter: Presenter) => {
              if (topics.length === 0 && org.length === 0) return true;
              if (topics.length > 0 && org.length === 0) {
                return topics.some((topic) =>
                  presenter.topicIds.includes(topic),
                );
              }
              if (topics.length === 0 && org.length > 0) {
                return org.some((orgData) =>
                  presenter.organizersIds.includes(orgData),
                );
              }
              if (topics.length > 0 && org.length > 0) {
                return (
                  topics.some((topic) => presenter.topicIds.includes(topic)) &&
                  org.some((orgData) =>
                    presenter.organizersIds.includes(orgData),
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
