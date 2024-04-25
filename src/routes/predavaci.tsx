import { PredavaciCard } from "@/components/predavaci-card.tsx";
import { FilterHeader } from "@/components/filter-header.tsx";
import { PiUserPlusLight } from "react-icons/pi";
import { useState } from "react";
import { useAdminStore, useDataStore } from "@/store.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza.tsx";
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

export function Predavaci() {
  const store = useAdminStore();
  const storeData = useDataStore();
  const [topics, setTopics] = useState<string[]>([]);
  const [org, setOrg] = useState<string[]>([]);
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
    <div className="flex animate-fade-in-up flex-col">
      <div
        data-active={store.isAdmin}
        className="flex w-full items-center justify-end py-4 h-fit opacity-0 pointer-events-none  data-[active=true]:pointer-events-auto data-[active=true]:opacity-100 transition-all"
      >
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

                  const resp = await fetch(
                    `${import.meta.env.VITE_API_URL}/presenters`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        ...newPresenter,
                        image: `https://robohash.org/${newPresenter.id}`,
                      }),
                    },
                  );

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
              names={storeData.topics}
            />
          </div>
          <div>
            <h1 className="mb-2">Organizacije</h1>
            <FilterHeader
              onFilter={(id) => {
                org?.includes(id)
                  ? setOrg(org?.filter((t) => t !== id))
                  : setOrg([...(org ?? []), id]);
              }}
              names={storeData.organizers}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {storeData.presenters
            .filter((presenter: Presenter) => {
              if (topics.length === 0 && org.length === 0) return true;
              if (topics.length > 0 && org.length === 0) {
                return topics.some((topic) =>
                  presenter.topicIds.includes(topic),
                );
              }
              if (topics.length === 0 && org.length > 0) {
                return org.some((orgData) =>
                  presenter.organizersId.includes(orgData),
                );
              }
              if (topics.length > 0 && org.length > 0) {
                return (
                  topics.some((topic) => presenter.topicIds.includes(topic)) &&
                  org.some((orgData) =>
                    presenter.organizersId.includes(orgData),
                  )
                );
              }
            })
            .map((presenter: Presenter) => (
              <PredavaciCard key={presenter.id} presenter={presenter} />
            ))}
        </div>
      </div>
    </div>
  );
}
