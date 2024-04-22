import useSWR from "swr";
import { fetcher } from "@/lib/utils.ts";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";

export function RadionicaCard({ radionica }: { radionica: Workshop }) {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/presenters",
    fetcher,
  );

  if (error) return <div>Problem jbggggggg</div>;
  if (isLoading) return <div>Loading</div>;

  return (
    <div className="flex border rounded-md overflow-hidden bg-white transition-all w-full">
      <div>
        <img src={radionica.image} alt="Building" className="border" />
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
        </div>
        <div className="flex gap-2">
          <Button>Prijavi se</Button>
          <Button variant="secondary">Uredi</Button>
        </div>
      </div>
    </div>
  );
}
