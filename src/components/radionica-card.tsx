import useSWR from "swr";
import { fetcher } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { useAdminStore } from "@/store.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { ListItem } from "@/components/list-item.tsx";

export function RadionicaCard({
  radionica,
}: Readonly<{ radionica: Workshop }>) {
  const store = useAdminStore();

  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/presenters`,
    fetcher,
  );

  const {
    data: organizers,
    error: organizersError,
    isLoading: organizersIsLoading,
  } = useSWR(`${import.meta.env.VITE_API_URL}/organizers`, fetcher);

  const {
    data: themes,
    error: themesError,
    isLoading: themesIsLoading,
  } = useSWR(`${import.meta.env.VITE_API_URL}/topics`, fetcher);

  const {
    data: difficulties,
    error: difficultiesError,
    isLoading: difficultiesIsLoading,
  } = useSWR(`${import.meta.env.VITE_API_URL}/difficulties`, fetcher);

  if (error || organizersError || themesError || difficultiesError)
    return <div>Loading</div>;
  if (
    isLoading ||
    organizersIsLoading ||
    themesIsLoading ||
    difficultiesIsLoading
  )
    return <div>Loading</div>;

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
            {data
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
            {(organizers as Organizers[])
              .filter((organizer) =>
                radionica.organizersIds.includes(organizer.id),
              )
              .map((organizer) => (
                <Badge key={organizer.id}>{organizer.name}</Badge>
              ))}
          </ListItem>
          <ListItem title={"Teme"}>
            {(themes as Filter[])
              .filter((theme) => radionica.topicIds.includes(theme.id))
              .map((theme) => (
                <Badge key={theme.id}>{theme.name}</Badge>
              ))}
          </ListItem>
          <ListItem title={"Težina"}>
            {(difficulties as Filter[])
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
