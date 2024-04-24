import { Button } from "@/components/ui/button.tsx";
import useSWR from "swr";
import { fetcher } from "@/lib/utils.ts";
import { useAdminStore } from "@/store.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { ListItem } from "@/components/list-item.tsx";

export function PredavaciCard({
  presenter,
}: Readonly<{ presenter: Presenter }>) {
  const store = useAdminStore();
  const {
    data: organizers,
    error: organizersError,
    isLoading: organizersIsLoading,
  } = useSWR(`${import.meta.env.VITE_API_URL}/organizers`, fetcher);

  const {
    data: topics,
    error: topicsError,
    isLoading: topicsIsLoading,
  } = useSWR(`${import.meta.env.VITE_API_URL}/topics`, fetcher);

  if (organizersError || topicsError) return <div>Loading</div>;
  if (organizersIsLoading || topicsIsLoading) return <div>Loading</div>;
  return (
    <div className="flex border rounded-md overflow-hidden bg-white dark:bg-black/30 dark:text-white transition-all w-full">
      <div>
        <img
          src={presenter.image}
          alt="Presenter"
          className="border-r bg-white"
        />
      </div>
      <div className="flex p-4 gap-2 flex-col justify-between items-start">
        <div className="flex gap-2 flex-col justify-start items-start">
          <h1 className="text-2xl font-semibold">{presenter.name}</h1>
          <p>{presenter.description}</p>
          <ListItem title="ORGANIZACIJE">
            {organizers
              .filter((organizer: Organizers) =>
                presenter.organizersIds.includes(organizer.id),
              )
              .map((organizer: Organizers) => (
                <Badge key={organizer.id}>{organizer.name}</Badge>
              ))}
          </ListItem>
          <ListItem title={"Teme"}>
            {topics
              .filter((topic: Filter) => presenter.topicIds.includes(topic.id))
              .map((topic: Filter) => (
                <Badge key={topic.id}>{topic.name}</Badge>
              ))}
          </ListItem>
        </div>
        <div className="flex gap-2">
          <Button>Pregledaj radionice</Button>
          {store.isAdmin && (
            <Button
              className="animate-fade-in-up transition-all"
              variant="secondary"
            >
              Uredi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
