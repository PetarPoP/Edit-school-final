import { useState } from "react";
import { cn } from "@/lib/utils.ts";
import { AdministracijaDataTable } from "@/components/administracija-data-table.tsx";
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
import { PiPlus, PiUserPlusLight, PiWarehouseDuotone } from "react-icons/pi";
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

type NavItem = {
  id: string;
  name: string;
};

const navItems: NavItem[] = [
  { id: "1", name: "Radionice" },
  { id: "2", name: "Organizacije" },
  { id: "3", name: "Predavaci" },
];

export function Administracija() {
  const storeData = useDataStore();
  const [activeTab, setActiveTab] = useState<string>("1");
  const [addPresenterDialogOpen, setAddPresenterDialogOpen] = useState(false);
  const [addWorkshopDialogOpen, setAddWorkshopDialogOpen] = useState(false);
  const [addOrgDialogOpen, setAddOrgDialogOpen] = useState(false);

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

  const [newOrg, setNewOrg] = useState<Partial<Filter>>({
    id: crypto.randomUUID(),
    name: "",
    description: "",
  });

  const [newPresenter, setNewPresenter] = useState<Partial<Presenter>>({
    id: crypto.randomUUID(),
    name: "",
    image: "",
    description: "",
    organizersId: "",
    topicIds: [],
  });

  const handleTabChange = (id: string) => {
    setActiveTab(id);
  };

  return (
    <div>
      <nav
        className={cn(
          "flex animate-fade-in transition-all w-full items-center justify-between",
        )}
      >
        <div className="flex gap-4 transition-all w-fit items-center justify-center overflow-x-auto overflow-y-hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={cn(
                "animate-fade-in-up text-lg font-monospace font-medium duration-100 text-center rounded-md opacity-80 transition-all py-4 hover:opacity-90",
                {
                  "font-bold underline opacity-100": activeTab === item.id,
                },
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
        {activeTab === "1" && (
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
                <CredenzaDescription>
                  Dodajte novu radionicu
                </CredenzaDescription>
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
                      `http://localhost:3000/workshops`,
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
        )}
        {activeTab === "2" && (
          <Credenza open={addOrgDialogOpen} onOpenChange={setAddOrgDialogOpen}>
            <CredenzaTrigger asChild>
              <Button className="animate-fade-in-up flex gap-2 items-center transition-all px-24">
                <PiWarehouseDuotone className="size-5" />
                <PiPlus className="size-2.5 -ml-2" />
                Dodaj organizaciju
              </Button>
            </CredenzaTrigger>
            <CredenzaContent className="min-w-[525px]">
              <CredenzaHeader className="gap-3">
                <CredenzaTitle>Radionica</CredenzaTitle>
                <CredenzaDescription>
                  Dodajte novu radionicu
                </CredenzaDescription>
              </CredenzaHeader>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Naziv organizacije</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Puno ime"
                  className="col-span-3"
                  value={newOrg.name}
                  onChange={(e) =>
                    setNewOrg({ ...newOrg, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="bio">Opis radionice</Label>
                <Textarea
                  id="bio"
                  placeholder="Opis radionice"
                  className="col-span-3 h-24 resize-none text-left"
                  value={newOrg.description}
                  onChange={(e) =>
                    setNewOrg({
                      ...newOrg,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <CredenzaFooter>
                <Button
                  type="button"
                  onClick={async () => {
                    if (!newOrg.name) {
                      toast.error("Ime je obavezano");
                      return;
                    }
                    if (!newOrg.description) {
                      toast.error("Opis je obavezan");
                      return;
                    }

                    const resp = await fetch(
                      `http://localhost:3000/organizers`,
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      },
                    );

                    if (!resp.ok) {
                      toast.error("Problem pri dodavanju");
                    } else {
                      await storeData.fetch();
                      toast.success("Dodano");
                    }
                    setAddOrgDialogOpen(false);
                  }}
                >
                  Spremi
                </Button>
              </CredenzaFooter>
            </CredenzaContent>
          </Credenza>
        )}
        {activeTab === "3" && (
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
                <CredenzaDescription>
                  Dodajte novog predavača
                </CredenzaDescription>
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
                      `http://localhost:3000/presenters`,
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
        )}
      </nav>
      <div>
        <AdministracijaDataTable id={activeTab} />
      </div>
    </div>
  );
}
