import { Button } from "@/components/ui/button.tsx";
import { useAdminStore, useDataStore } from "@/store.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { ListItem } from "@/components/list-item.tsx";

export function PredavaciCard({
  presenter,
}: Readonly<{ presenter: Presenter }>) {
  const store = useAdminStore();
  const storeData = useDataStore();

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
            {storeData.organizers
              .filter((organizer: Filter) =>
                presenter.organizersIds.includes(organizer.id),
              )
              .map((organizer: Filter) => (
                <Badge key={organizer.id}>{organizer.name}</Badge>
              ))}
          </ListItem>
          <ListItem title={"Teme"}>
            {storeData.topics
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
