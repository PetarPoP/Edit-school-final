import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PiPlus, PiWarehouseDuotone } from "react-icons/pi";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { toast } from "sonner";
import { useDataStore } from "@/store.tsx";
import { useState } from "react";

export function DodajRadionicu() {
  const storeData = useDataStore();
  const [addWorkshopDialogOpen, setAddWorkshopDialogOpen] = useState(false);

  const [newWorkshop, setNewWorkshop] = useState<Partial<Workshop>>({
    id: crypto.randomUUID(),
    title: "",
    description: "",
    topicIds: [],
    difficultyId: "",
    organizersId: "",
    presenterIds: [],
    num_of_participants: [],
    date: new Date().toString(),
  });

  return (
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
                        : newWorkshop.topicIds?.filter((id) => id !== value.id),
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
              if (!newWorkshop.topicIds || newWorkshop.topicIds.length === 0) {
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

              const resp = await fetch(`http://localhost:3000/workshops`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...newWorkshop,
                  image: `https://robohash.org/${newWorkshop.id}`,
                }),
              });

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
                num_of_participants: [],
                date: new Date().toString(),
              });
            }}
          >
            Spremi
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}

export function UrediRadionicu({ workshop }: { workshop: Workshop }) {
  const storeData = useDataStore();
  const [editWorkshop, setEditWorkshop] = useState<string | null>(null);

  const workshopIndex = storeData.workshops.findIndex(
    (work) => work.id === workshop.id,
  );

  const [toUpdateWorkshop, setToUpdateWorkshop] = useState(
    storeData.workshops[workshopIndex],
  );

  return (
    <Credenza
      open={editWorkshop === workshop.id}
      onOpenChange={(isOpen) => {
        setEditWorkshop(isOpen ? workshop.id : null);
        setToUpdateWorkshop(workshop);
      }}
    >
      <CredenzaTrigger asChild>
        <Button
          className="animate-fade-in-up transition-all"
          variant="secondary"
        >
          Uredi
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="min-w-[525px]">
        <CredenzaHeader className="flex justify-center items-center uppercase">
          <CredenzaTitle>{workshop.title}</CredenzaTitle>
        </CredenzaHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Naziv radionice</Label>
          <Input
            type="text"
            id="name"
            value={toUpdateWorkshop.title}
            onChange={(e) => {
              setToUpdateWorkshop({
                ...toUpdateWorkshop,
                title: e.target.value,
              });
            }}
            placeholder="Puni naziv radionice"
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bio">Opis radionice</Label>
          <Textarea
            id="bio"
            value={toUpdateWorkshop.description}
            onChange={(e) => {
              setToUpdateWorkshop({
                ...toUpdateWorkshop,
                description: e.target.value,
              });
            }}
            placeholder="Opis radionice"
            className="col-span-3"
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
              setToUpdateWorkshop({
                ...toUpdateWorkshop,
                date: new Date(e.target.value).toLocaleDateString(),
              });
            }}
          />
        </div>
        <div className="flex w-full gap-4">
          <Select
            onValueChange={(value) => {
              setToUpdateWorkshop({
                ...toUpdateWorkshop,
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
              setToUpdateWorkshop({
                ...toUpdateWorkshop,
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
                    setToUpdateWorkshop({
                      ...toUpdateWorkshop,
                      topicIds: checked
                        ? [...(toUpdateWorkshop.topicIds ?? []), value.id]
                        : toUpdateWorkshop.topicIds?.filter(
                            (id) => id !== value.id,
                          ),
                    });
                  }}
                  checked={toUpdateWorkshop.topicIds?.includes(value.id)}
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
                    setToUpdateWorkshop({
                      ...toUpdateWorkshop,
                      presenterIds: checked
                        ? [...(toUpdateWorkshop.presenterIds ?? []), value.id]
                        : toUpdateWorkshop.presenterIds?.filter(
                            (id) => id !== value.id,
                          ),
                    });
                  }}
                  checked={toUpdateWorkshop.presenterIds?.includes(value.id)}
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
            onClick={async () => {
              if (!toUpdateWorkshop.title) {
                toast.error("Naslov je obavezan");
                return;
              }
              if (!toUpdateWorkshop.description) {
                toast.error("Opis je obavezan");
                return;
              }
              if (
                !toUpdateWorkshop.topicIds ||
                toUpdateWorkshop.topicIds.length === 0
              ) {
                toast.error("Morate odabrati barem jednu temu");
                return;
              }
              if (!toUpdateWorkshop.difficultyId) {
                toast.error("Razina težine je obavezna");
                return;
              }

              if (!toUpdateWorkshop.organizersId) {
                toast.error("ID organizatora je obavezan");
                return;
              }
              if (
                !toUpdateWorkshop.presenterIds ||
                toUpdateWorkshop.presenterIds.length === 0
              ) {
                toast.error("Morate odabrati barem jednog predavača");
                return;
              }

              const resp = await fetch(
                `http://localhost:3000/workshops/${workshop.id}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(toUpdateWorkshop),
                },
              );

              if (!resp.ok) {
                toast.error("Greška prilikom uređivanja radionice");
              } else {
                await storeData.fetch();
                toast.success("Uspiješno ste uređili radionicu");
                setEditWorkshop(null);
              }
            }}
          >
            Potvrdi promjene
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}

export function IzbrisiRadionicu({ workshop }: { workshop: Workshop }) {
  const storeData = useDataStore();
  const [deleteWorkshop, setDeleteWorkshop] = useState<string | null>(null);

  return (
    <Credenza
      open={deleteWorkshop === workshop.id}
      onOpenChange={(isOpen) => {
        setDeleteWorkshop(isOpen ? workshop.id : null);
      }}
    >
      <CredenzaTrigger asChild>
        <Button
          className="animate-fade-in-up transition-all"
          variant="destructive"
        >
          Izbriši
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="min-w-[525px]">
        <CredenzaHeader className="flex justify-center items-center uppercase">
          <CredenzaTitle>Potvrdite brisanje</CredenzaTitle>
        </CredenzaHeader>
        <p className="flex justify-center items-center">
          Jeste li sigurni da želite izbrisati radionicu{" "}
          {workshop.title.toUpperCase()}?
        </p>
        <CredenzaFooter>
          <Button
            onClick={() => {
              fetch(`http://localhost:3000/workshops/${workshop.id}`, {
                method: "DELETE",
              }).then(async (resp) => {
                if (!resp.ok) {
                  toast.error("Greška prilikom brisanja radionice");
                } else {
                  await storeData.fetch();
                  toast.success("Uspiješno ste izbrisali radionicu");
                  setDeleteWorkshop(null);
                }
              });
            }}
          >
            Izbriši
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
