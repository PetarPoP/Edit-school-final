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
import { PiUserPlusLight } from "react-icons/pi";
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

export function DodajPredavaca() {
  const storeData = useDataStore();
  const [addPresenterDialogOpen, setAddPresenterDialogOpen] = useState(false);

  const [newPresenter, setNewPresenter] = useState<Partial<Presenter>>({
    id: crypto.randomUUID(),
    name: "",
    image: "",
    description: "",
    organizersId: "",
    topicIds: [],
  });

  return (
    <Credenza
      open={addPresenterDialogOpen}
      onOpenChange={setAddPresenterDialogOpen}
    >
      <CredenzaTrigger asChild>
        <Button className="animate-fade-in-up flex gap-2 items-center transition-all px-24">
          <PiUserPlusLight className="size-5" />
          Dodaj predavača
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="min-w-[525px]">
        <CredenzaHeader className="gap-3">
          <CredenzaTitle>Predavač</CredenzaTitle>
          <CredenzaDescription>Dodajte novog predavača</CredenzaDescription>
        </CredenzaHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Ime i prezime</Label>
          <Input
            type="text"
            id="name"
            placeholder="Puno ime"
            className="col-span-3"
            value={newPresenter.name}
            onChange={(e) =>
              setNewPresenter({ ...newPresenter, name: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bio">Biografija</Label>
          <Textarea
            id="bio"
            placeholder="Opis predavača"
            className="col-span-3 h-24 resize-none text-left"
            value={newPresenter.description}
            onChange={(e) =>
              setNewPresenter({
                ...newPresenter,
                description: e.target.value,
              })
            }
          />
        </div>
        <div className="flex w-full gap-4">
          <Select
            onValueChange={(value) => {
              setNewPresenter({
                ...newPresenter,
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
                    setNewPresenter({
                      ...newPresenter,
                      topicIds: checked
                        ? [...(newPresenter.topicIds ?? []), value.id]
                        : newPresenter.topicIds?.filter(
                            (id) => id !== value.id,
                          ),
                    });
                  }}
                  checked={newPresenter.topicIds?.includes(value.id)}
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
              console.log("wtf");
              if (!newPresenter.name) {
                toast.error("Naslov je obavezan");
                return;
              }
              if (!newPresenter.description) {
                toast.error("Opis je obavezan");
                return;
              }
              if (
                !newPresenter.topicIds ||
                newPresenter.topicIds.length === 0
              ) {
                toast.error("Morate odabrati barem jednu temu");
                return;
              }
              if (!newPresenter.organizersId) {
                toast.error("ID organizatora je obavezan");
                return;
              }
              console.log("here we go");

              const resp = await fetch(`http://localhost:3000/presenters`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...newPresenter,
                  image: `https://robohash.org/${newPresenter.id}`,
                }),
              });

              if (!resp.ok) {
                toast.error("Problem pri dodavanju");
              } else {
                await storeData.fetch();
                toast.success("Dodano");
              }
              setAddPresenterDialogOpen(false);
            }}
          >
            Spremi
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}

export function UrediPredavaca({ presenter }: { presenter: Presenter }) {
  const storeData = useDataStore();
  const [editPresenter, setEditPresenter] = useState(false);

  const presenterIndex = storeData.presenters.findIndex(
    (pres) => pres.id === presenter.id,
  );

  const [toUpdatePresenter, setToUpdatePresenter] = useState(
    storeData.presenters[presenterIndex],
  );

  return (
    <Credenza open={editPresenter} onOpenChange={setEditPresenter}>
      <CredenzaTrigger asChild>
        <Button
          className="animate-fade-in-up transition-all hover:font-bold"
          variant={"secondary"}
        >
          Uredi
        </Button>
      </CredenzaTrigger>
      <CredenzaContent className="min-w-[525px]">
        <CredenzaHeader className="flex justify-center items-center uppercase">
          <CredenzaTitle>{presenter.name}</CredenzaTitle>
        </CredenzaHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Ime i prezime</Label>
          <Input
            type="text"
            id="name"
            value={toUpdatePresenter.name}
            onChange={(e) =>
              setToUpdatePresenter({
                ...toUpdatePresenter,
                name: e.target.value,
              })
            }
            placeholder="Puno ime"
            className="col-span-3"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bio">Opis predavača</Label>
          <Textarea
            id="bio"
            placeholder="Opis predavača"
            value={toUpdatePresenter.description}
            onChange={(e) =>
              setToUpdatePresenter({
                ...toUpdatePresenter,
                description: e.target.value,
              })
            }
            className="col-span-3 h-24 resize-none text-left"
          />
        </div>
        <div className="flex justify-center items-center gap-4">
          <Select
            onValueChange={(value) => {
              setToUpdatePresenter({
                ...toUpdatePresenter,
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
                    setToUpdatePresenter({
                      ...toUpdatePresenter,
                      topicIds: checked
                        ? [...(toUpdatePresenter.topicIds ?? []), value.id]
                        : toUpdatePresenter.topicIds?.filter(
                            (id) => id !== value.id,
                          ),
                    });
                  }}
                  checked={toUpdatePresenter.topicIds?.includes(value.id)}
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
              if (!toUpdatePresenter.organizersId) {
                toast.error("Molimo odaberite organizaciju");
                return;
              }
              if (!toUpdatePresenter.topicIds) {
                toast.error("Molimo odaberite temu");
                return;
              }

              const nameInput = document.getElementById(
                "name",
              ) as HTMLInputElement;

              const name = nameInput.value;

              if (!name) {
                toast.error("Molimo unesite ime");
                return;
              }

              const resp = await fetch(
                `http://localhost:3000/presenters/${presenter.id}`,
                {
                  method: "PATCH",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(toUpdatePresenter),
                },
              );

              if (!resp.ok) {
                toast.error("Greška prilikom prijave na radionicu");
              } else {
                await storeData.fetch();
                toast.success("Uspiješno ste se prijavili na radionicu");
                setEditPresenter(false);
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

export function IzbrisiPredavaca({ presenter }: { presenter: Presenter }) {
  const storeData = useDataStore();
  const [deletePresenter, setDeletePresenter] = useState<string | null>(null);

  return (
    <Credenza
      open={deletePresenter === presenter.id}
      onOpenChange={(isOpen) => {
        setDeletePresenter(isOpen ? presenter.id : null);
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
          Jeste li sigurni da želite izbrisati predavača{" "}
          {presenter.name.toUpperCase()}?
        </p>
        <CredenzaFooter>
          <Button
            onClick={() => {
              fetch(`http://localhost:3000/presenters/${presenter.id}`, {
                method: "DELETE",
              }).then(async (resp) => {
                if (!resp.ok) {
                  toast.error("Greška prilikom brisanja predavača");
                } else {
                  await storeData.fetch();
                  toast.success("Uspiješno ste izbrisali predavača");
                  setDeletePresenter(null);
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
