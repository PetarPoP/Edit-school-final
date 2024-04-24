import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { useAdminStore, useDataStore } from "@/store.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { ListItem } from "@/components/list-item.tsx";

export function RadionicaCard({
  radionica,
}: Readonly<{ radionica: Workshop }>) {
  const store = useAdminStore();
  const storeData = useDataStore();

  return (
    <div className="flex border rounded-md overflow-hidden bg-white dark:bg-black/30 dark:text-white transition-all w-full">
      <div className="min-h-72 h-full flex justify-center items-center">
        <img
          src={radionica.image}
          alt="what"
          className="border-r h-full aspect-square object-cover bg-white"
        />
      </div>
      <div className="flex p-4 gap-2 flex-col justify-between items-start">
        <div className="flex gap-2 flex-col justify-start items-start">
          <h1 className="text-2xl font-semibold">{radionica.title}</h1>
          <p>{radionica.description}</p>
          <ListItem title={"Predavač(i)"}>
            {storeData.presenters
              .filter((presenter: Presenter) =>
                radionica.presenterIds.includes(presenter.id),
              )
              .map((presenter: Presenter) => (
                <Link
                  to={`/predavaci/${presenter.id}`}
                  key={`${presenter.id}-${radionica.id}`}
                >
                  <Badge>{presenter.name}</Badge>
                </Link>
              ))}
          </ListItem>
          <ListItem title={"Organizacija/e"}>
            {storeData.organizers
              .filter((organizer) =>
                radionica.organizersIds.includes(organizer.id),
              )
              .map((organizer) => (
                <Badge key={organizer.id}>{organizer.name}</Badge>
              ))}
          </ListItem>
          <ListItem title={"Teme"}>
            {storeData.topics
              .filter((topic) => radionica.topicIds.includes(topic.id))
              .map((topic) => (
                <Badge key={topic.id}>{topic.name}</Badge>
              ))}
          </ListItem>
          <ListItem title={"Težina"}>
            {storeData.difficulties
              .filter((diff) => radionica.difficultyIds.includes(diff.id))
              .map((diff) => (
                <Badge key={diff.id}>{diff.name}</Badge>
              ))}
          </ListItem>
        </div>
        <div className="flex gap-2">
          <Button>Prijavi se</Button>
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
