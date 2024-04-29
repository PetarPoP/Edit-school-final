import { RadionicaCard } from "../components/radionica-card.tsx";
import { useState } from "react";
import { PiPlus, PiWarehouseDuotone } from "react-icons/pi";
import { useAdminStore, useDataStore } from "@/store.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza.tsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Select } from "@radix-ui/react-select";
import { toast } from "sonner";

export function Radionice() {
  const store = useAdminStore();
  const storeData = useDataStore();
  const [topics, setTopics] = useState<string[]>([]);
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [organizers, setOrganizers] = useState<string[]>([]);
  const [presenters, setPresenters] = useState<string[]>([]);
  const [addWorkshopDialogOpen, setAddWorkshopDialogOpen] = useState(false);

  const [newWorkshop, setNewWorkshop] = useState<Partial<Workshop>>({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    topicIds: [],
    difficultyId: "",
    organizersId: "",
    presenterIds: [],
    num_of_participants: 0,
    date: new Date().toString(),
  });

  return (
    <div className="flex animate-fade-in-up flex-col">
      <div
        data-active={store.isAdmin}
        className="flex w-full items-center justify-end py-4 h-fit opacity-0 pointer-events-none
        data-[active=true]:pointer-events-auto data-[active=true]:opacity-100 transition-all"
      >
        <Credenza
          open={addWorkshopDialogOpen}
          onOpenChange={setAddWorkshopDialogOpen}
        >
          <CredenzaTrigger asChild>
            <Button className="animate-fade-in-up flex gap-2 items-center transition-all px-24">
              <PiWarehouseDuotone className="size-5" />
              <PiPlus className="size-2.5 -ml-2" />
              Dodaj radionicu
            </Button>
          </CredenzaTrigger>
          <CredenzaContent className="min-w-[525px]">
            <CredenzaHeader className="gap-3">
              <CredenzaTitle>Radionica</CredenzaTitle>
              <CredenzaDescription>Dodajte novu radionicu</CredenzaDescription>
            </CredenzaHeader>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Naziv radionice</Label>
              <Input
                type="text"
                id="name"
                placeholder="Puno ime"
                className="col-span-3"
                value={newWorkshop.title}
                onChange={(e) =>
                  setNewWorkshop({ ...newWorkshop, title: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="bio">Opis radionice</Label>
              <Textarea
                id="bio"
                placeholder="Opis radionice"
                className="col-span-3 h-24 resize-none text-left"
                value={newWorkshop.description}
                onChange={(e) =>
                  setNewWorkshop({
                    ...newWorkshop,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex justify-cente flex-col gap-2">
              <Label htmlFor="date">Datum</Label>
              <Input
                type="date"
                id="date"
                placeholder="Datum"
                className="col-span-3"
                onChange={(e) => {
                  setNewWorkshop({
                    ...newWorkshop,
                    date: new Date(e.target.value).toLocaleDateString(),
                  });
                }}
              />
            </div>
            <div className="flex w-full gap-4">
              <Select
                onValueChange={(value) => {
                  setNewWorkshop({
                    ...newWorkshop,
                    difficultyId: value ?? "",
                  });
                }}
              >
                <SelectTrigger className="w-1/2 text-center">
                  <SelectValue
                    className="text-center"
                    placeholder="Odaberite težinu"
                  />
                </SelectTrigger>
                <SelectContent className="w-56 max-h-56 overflow-y-scroll">
                  <SelectGroup>
                    {storeData.difficulties.map((diff) => (
                      <SelectItem key={diff.id} value={diff.id}>
                        {diff.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => {
                  setNewWorkshop({
                    ...newWorkshop,
                    organizersId: value ?? "",
                  });
                }}
              >
                <SelectTrigger className="w-1/2">
                  <SelectValue placeholder="Odaberite organizaciju" />
                </SelectTrigger>
                <SelectContent className="w-56 max-h-56 overflow-y-scroll">
                  <SelectGroup>
                    {storeData.organizers.map((org) => (
                      <SelectItem key={org.id} value={org.id}>
                        {org.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild={true}>
                  <Button className="w-1/2 text-left" variant="outline">
                    Odaberite Temu
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 h-56 overflow-y-scroll">
                  <DropdownMenuLabel>Tema</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {storeData.topics.map((value) => (
                    <DropdownMenuCheckboxItem
                      key={`${value.id}-${value.name}`}
                      onCheckedChange={(checked) => {
                        setNewWorkshop({
                          ...newWorkshop,
                          topicIds: checked
                            ? [...(newWorkshop.topicIds ?? []), value.id]
                            : newWorkshop.topicIds?.filter(
                                (id) => id !== value.id,
                              ),
                        });
                      }}
                      checked={newWorkshop.topicIds?.includes(value.id)}
                      onSelect={(e) => e.preventDefault()}
                    >
                      {value.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild={true}>
                  <Button className="w-1/2" variant="outline">
                    Odaberite Predavače
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 h-56 overflow-y-scroll">
                  <DropdownMenuLabel>Predavači</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {storeData.presenters.map((value) => (
                    <DropdownMenuCheckboxItem
                      key={`${value.id}-${value.name}`}
                      onCheckedChange={(checked) => {
                        setNewWorkshop({
                          ...newWorkshop,
                          presenterIds: checked
                            ? [...(newWorkshop.presenterIds ?? []), value.id]
                            : newWorkshop.presenterIds?.filter(
                                (id) => id !== value.id,
                              ),
                        });
                      }}
                      checked={newWorkshop.presenterIds?.includes(value.id)}
                      onSelect={(e) => e.preventDefault()}
                    >
                      {value.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <CredenzaFooter>
              <Button
                type="button"
                onClick={async () => {
                  if (!newWorkshop.title) {
                    toast.error("Naslov je obavezan");
                    return;
                  }
                  if (!newWorkshop.description) {
                    toast.error("Opis je obavezan");
                    return;
                  }
                  if (
                    !newWorkshop.topicIds ||
                    newWorkshop.topicIds.length === 0
                  ) {
                    toast.error("Morate odabrati barem jednu temu");
                    return;
                  }
                  if (!newWorkshop.difficultyId) {
                    toast.error("Razina težine je obavezna");
                    return;
                  }

                  if (!newWorkshop.organizersId) {
                    toast.error("ID organizatora je obavezan");
                    return;
                  }
                  if (
                    !newWorkshop.presenterIds ||
                    newWorkshop.presenterIds.length === 0
                  ) {
                    toast.error("Morate odabrati barem jednog predavača");
                    return;
                  }

                  const resp = await fetch(
                    `${import.meta.env.VITE_API_URL}/workshops`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        ...newWorkshop,
                        image: `https://robohash.org/${newWorkshop.id}`,
                      }),
                    },
                  );

                  if (!resp.ok) {
                    toast.error("Problem pri dodavanju");
                  } else {
                    await storeData.fetch();
                    toast.success("Dodano");
                  }
                  setAddWorkshopDialogOpen(false);
                  setNewWorkshop({
                    id: crypto.randomUUID(),
                    title: "",
                    description: "",
                    topicIds: [],
                    difficultyId: "",
                    organizersId: "",
                    presenterIds: [],
                    num_of_participants: 0,
                    date: new Date().toString(),
                  });
                }}
              >
                Spremi
              </Button>
            </CredenzaFooter>
          </CredenzaContent>
        </Credenza>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col w-full md:w-fit gap-8 pr-8">
          <div>
            <h1 className="mb-2 text-lg">Predavači</h1>
            <Select
              onValueChange={(id) => {
                if (id === "All") {
                  setPresenters([]);
                  return;
                } else {
                  setPresenters([id]);
                }
              }}
            >
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Sve" />
              </SelectTrigger>
              <SelectContent className="w-56 max-h-56 overflow-y-scroll">
                <SelectGroup>
                  <SelectItem key="all" value="All">
                    {" "}
                    Sve{" "}
                  </SelectItem>
                  {storeData.presenters.map((presenter) => (
                    <SelectItem key={presenter.id} value={presenter.id}>
                      {presenter.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h1 className="mb-2 text-lg">Teme</h1>
            <Select
              onValueChange={(id) => {
                if (id === "All") {
                  setTopics([]);
                  return;
                } else {
                  setTopics([id]);
                }
              }}
            >
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Sve" />
              </SelectTrigger>
              <SelectContent className="w-56 max-h-56 overflow-y-scroll">
                <SelectGroup>
                  <SelectItem key="all" value="All">
                    {" "}
                    Sve{" "}
                  </SelectItem>
                  {storeData.topics.map((topic) => (
                    <SelectItem key={topic.id} value={topic.id}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <h1 className="mb-2 text-lg">Organizatori</h1>
            <Select
              onValueChange={(id) => {
                if (id === "All") {
                  setOrganizers([]);
                  return;
                } else {
                  setOrganizers([id]);
                }
              }}
            >
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Sve" />
              </SelectTrigger>
              <SelectContent className="w-56 max-h-56 overflow-y-scroll">
                <SelectGroup>
                  <SelectItem key="all" value="All">
                    {" "}
                    Sve{" "}
                  </SelectItem>
                  {storeData.organizers.map((organizer) => (
                    <SelectItem key={organizer.id} value={organizer.id}>
                      {organizer.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="md:pb-0 pb-8">
            <h1 className="mb-2 text-lg">Težine</h1>
            <Select
              onValueChange={(id) => {
                if (id === "All") {
                  setDifficulties([]);
                  return;
                } else {
                  setDifficulties([id]);
                }
              }}
            >
              <SelectTrigger className="w-full md:w-[150px] text-center">
                <SelectValue className="text-center" placeholder="Sve" />
              </SelectTrigger>
              <SelectContent className="w-56 max-h-56 overflow-y-scroll">
                <SelectGroup>
                  <SelectItem key="All" value="All">
                    {" "}
                    Sve{" "}
                  </SelectItem>
                  {storeData.difficulties.map((diff) => (
                    <SelectItem key={diff.id} value={diff.id}>
                      {diff.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {storeData.workshops
            .filter((radionica: Workshop) => {
              return (
                (topics.length === 0 ||
                  topics.some((topic) => radionica.topicIds.includes(topic))) &&
                (difficulties.length === 0 ||
                  difficulties.some((difficulty) =>
                    radionica.difficultyId.includes(difficulty),
                  )) &&
                (organizers.length === 0 ||
                  organizers.some((organizer) =>
                    radionica.organizersId.includes(organizer),
                  )) &&
                (presenters.length === 0 ||
                  presenters.some((presenter) =>
                    radionica.presenterIds.includes(presenter),
                  ))
              );
            })
            .map((radionica: Workshop) => (
              <RadionicaCard key={radionica.id} radionica={radionica} />
            ))}
        </div>
      </div>
    </div>
  );
}
