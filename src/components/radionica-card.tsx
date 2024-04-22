import useSWR from "swr";
import { fetcher } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { useAdminStore } from "@/store.tsx";

export function RadionicaCard({ radionica }: { radionica: Workshop }) {
  const store = useAdminStore();

  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/presenters",
    fetcher,
  );

  const {
    data: organizers,
    error: organizersError,
    isLoading: organizersIsLoading,
  } = useSWR("http://localhost:3000/organizers", fetcher);

  const {
    data: themes,
    error: themesError,
    isLoading: themesIsLoading,
  } = useSWR("http://localhost:3000/themes", fetcher);

  const {
    data: difficulties,
    error: difficultiesError,
    isLoading: difficultiesIsLoading,
  } = useSWR("http://localhost:3000/difficulties", fetcher);

  if (error || organizersError || themesError || difficultiesError)
    return <div>Problem jbggggggg</div>;
  if (
    isLoading ||
    organizersIsLoading ||
    themesIsLoading ||
    difficultiesIsLoading
  )
    return <div>Loading</div>;

  return (
    <div className="flex border rounded-md overflow-hidden bg-white transition-all w-full">
      <div className="min-h-72 flex justify-center items-center">
        <img src={radionica.image} alt="what" className="border" />
      </div>
      <div className="flex p-4 gap-2 flex-col justify-between items-start">
        <div className="flex gap-2 flex-col justify-start items-start">
          <h1 className="text-2xl font-semibold">{radionica.title}</h1>
          <p>{radionica.description}</p>
          <p className="flex gap-1">
            <span>Predavač(i):</span>
            {(data as Presenter[])
              .filter((presenter) =>
                radionica.presenterIds.includes(presenter.id),
              )
              .map((presenter) => (
                <Link
                  to={`/predavaci/${presenter.id}`}
                  key={`${presenter.id}-${radionica.id}`}
                  className="bg-gray-200 px-1 py-0.5 hover:bg-gray-300 transition-all rounded-md border"
                >
                  {presenter.name}
                </Link>
              ))}
          </p>
          <p className="flex gap-1">
            <span>Organizacija/e:</span>
            {(organizers as Organizers[])
              .filter((organizer) =>
                radionica.organizersIds.includes(organizer.id),
              )
              .map((organizer) => (
                <span className="bg-gray-200 px-1 py-0.5 rounded-md border">
                  {organizer.name}
                </span>
              ))}
          </p>
          <p className="flex gap-1">
            <span>Teme:</span>
            {(themes as Theme[])
              .filter((theme) => radionica.themeIds.includes(theme.id))
              .map((theme) => (
                <span className="bg-gray-200 px-1 py-0.5 rounded-md border">
                  {theme.name}
                </span>
              ))}
          </p>
          <p className="flex gap-1">
            <span>Težina:</span>
            {(difficulties as Difficulty[])
              .filter((diff) => radionica.difficultyIds.includes(diff.id))
              .map((diff) => (
                <span className="bg-gray-200 px-1 py-0.5 rounded-md border">
                  {diff.name}
                </span>
              ))}
          </p>
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
