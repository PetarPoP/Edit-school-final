import { RadionicaCard } from "../components/radionica-card.tsx";
import useSWR from "swr";
import { fetcher } from "@/lib/utils.ts";
import { FilterHeader } from "@/components/filter-header.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PiPlus, PiWarehouseDuotone } from "react-icons/pi";
import { useAdminStore } from "@/store.tsx";

export function Radionice() {
  const store = useAdminStore();
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_URL}/workshops`,
    fetcher,
  );

  const {
    data: topicsData,
    isLoading: topicsIsLoading,
    error: topicsIsError,
  } = useSWR(`${import.meta.env.VITE_API_URL}/topics`, fetcher);

  const {
    data: difficultiesData,
    isLoading: difficultiesIsLoading,
    error: difficultiesIsError,
  } = useSWR(`${import.meta.env.VITE_API_URL}/difficulties`, fetcher);

  if (isLoading || topicsIsLoading || difficultiesIsLoading)
    return <div>Loading</div>;
  if (error || topicsIsError || difficultiesIsError) return <div>error</div>;

  return (
    <div className="flex animate-fade-in-up flex-col">
      <div
        data-active={store.isAdmin}
        className="flex w-full items-center justify-end py-4 h-fit opacity-0 pointer-events-none  data-[active=true]:pointer-events-auto data-[active=true]:opacity-100 transition-all"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button className="animate-fade-in-up flex gap-2 items-center transition-all px-24">
              <PiWarehouseDuotone className="size-5" />
              <PiPlus className="size-2.5 -ml-2" />
              Dodaj radionicu
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Radionica</DialogTitle>
              <DialogDescription>Dodajte novu radionicu</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Puno ime:
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Puno ime"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Razlog za prijavu
                </Label>
                <Input
                  type="text"
                  id="rzp"
                  placeholder="Razlog za prijavu"
                  className="col-span-3 h-24 resize-none text-left"
                />
              </div>
            </form>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
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
            <h1 className="mb-2 text-lg">Težine</h1>
            <FilterHeader
              onFilter={(id) => {
                difficulties?.includes(id)
                  ? setDifficulties(difficulties?.filter((t) => t !== id))
                  : setDifficulties([...(difficulties ?? []), id]);
              }}
              names={difficultiesData}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {data.
              .filter((radionica: Workshop) => {
                if (topics.length === 0  && difficulties.length === 0) return true;
                if (topics.length > 0 && difficu)
          })
          map((radionica: Workshop) => (
            <RadionicaCard key={radionica.id} radionica={radionica} />
          ))}
        </div>
      </div>
    </div>
  );
}
