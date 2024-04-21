import { RadionicaCard } from "../components/radionica-card.tsx";
import useSWR from "swr";
import { fetcher } from "@/lib/utils.ts";

export function Radionice() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/workshops",
    fetcher,
  );

  if (error) return <div>Problem jbggggggg</div>;
  if (isLoading) return <div>Loading</div>;
  return (
    <div className="flex animate-fade-in-up flex-col">
      <div>
        <h1>Teme</h1>
        <h1>Težina</h1>
      </div>
      <div className="flex flex-col gap-2">
        {data.map((radionica: Workshop) => (
          <RadionicaCard key={radionica.id} radionica={radionica} />
        ))}
      </div>
    </div>
  );
}
