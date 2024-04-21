import useSWR from "swr";
import { fetcher } from "@/lib/utils.ts";

export function RadionicaCard({ radionica }: { radionica: Workshop }) {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/presenters",
    fetcher,
  );
  if (error) return <div>Problem jbggggggg</div>;
  if (isLoading) return <div>Loading</div>;


  return (
    <div className="flex flex-col">
      <div>
        <img src={radionica.image} alt="Building" />
      </div>
      <div className="flex flex-col">
        <h1>{radionica.title}</h1>
        <p>{radionica.description}</p>
        <p>Predavač: {data.filter((presenter: Presenter) => radionica.presenterIds
        <button>Prijavi se</button>
      </div>
    </div>
  );
}
