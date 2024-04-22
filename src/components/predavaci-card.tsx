import { Button } from "@/components/ui/button.tsx";
import useSWR from "swr";
import { fetcher } from "@/lib/utils.ts";

export function PredavaciCard({ presenter }: { presenter: Presenter }) {
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

  if (organizersError || themesError) return <div>Problem jbggggggg</div>;
  if (organizersIsLoading || themesIsLoading) return <div>Loading</div>;
  return (
    <div className="flex border rounded-md overflow-hidden bg-white transition-all w-full">
      <div>
        <img src={presenter.image} alt="Presenter" className="border" />
      </div>
      <div className="flex p-4 gap-2 flex-col justify-between items-start">
        <div className="flex gap-2 flex-col justify-start items-start">
          <h1 className="text-2xl font-semibold">{presenter.name}</h1>
          <p>{presenter.bio}</p>
          <p className="flex gap-1">
            <span>Organizacija/e:</span>
            {(organizers as Organizers[])
              .filter((organizer) =>
                presenter.organizersIds.includes(organizer.id),
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
              .filter((theme) => presenter.themeIds.includes(theme.id))
              .map((theme) => (
                <span className="bg-gray-200 px-1 py-0.5 rounded-md border">
                  {theme.name}
                </span>
              ))}
          </p>
        </div>
        <div className="flex gap-2">
          <Button>Pregledaj radionice</Button>
          <Button variant="secondary">Uredi</Button>
        </div>
      </div>
    </div>
  );
}
