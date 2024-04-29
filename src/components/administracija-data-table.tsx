import { useDataStore } from "@/store.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Credenza,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza.tsx";
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
import { useState } from "react";

export function AdministracijaDataTable({ id }: { id: string }) {
  const storeData = useDataStore();
  const [editWorkshop, setEditWorkshop] = useState<string | null>(null);
  const [editOrganizer, setEditOrganizer] = useState<string | null>(null);
  const [editPresenter, setEditPresenter] = useState<string | null>(null);

  const [deleteWorkshop, setDeleteWorkshop] = useState<string | null>(null);
  const [deleteOrganizer, setDeleteOrganizer] = useState<string | null>(null);
  const [deletePresenter, setDeletePresenter] = useState<string | null>(null);

  const [toUpdateWorkshop, setToUpdateWorkshop] = useState<Workshop>({
    id: "",
    title: "",
    image: "",
    description: "",
    date: "",
    presenterIds: [],
    organizersId: "",
    topicIds: [],
    difficultyId: "",
    num_of_participants: 0,
  });

  const [toUpdateOrganizer, setToUpdateOrganizer] = useState<Filter>({
    id: "",
    name: "",
    description: "",
  });

  const [toUpdatePresenter, setToUpdatePresenter] = useState<Presenter>({
    id: "",
    name: "",
    image: "",
    description: "",
    organizersId: "",
    topicIds: [],
  });

  return (
    <div>
      {id === "1" && (
        <div className="flex w-full flex-col gap-4">
          {storeData.workshops.map((workshop) => {
            return (
              <div
                key={workshop.id}
                className="flex items-center justify-between border-2 rounded-md p-2 w-full gap-4 bg-white dark:bg-black/30 dark:text-white transition-all"
              >
                <div className="w-full">{workshop.title}</div>
                <div className="w-full">{workshop.description}</div>
                <div className="w-full">{workshop.date}</div>
                <div>
                  <Credenza
                    open={editWorkshop === workshop.id}
                    onOpenChange={(isOpen) => {
                      setEditWorkshop(isOpen ? workshop.id : null);
                      setToUpdateWorkshop(workshop);
                    }}
                  >
                    <CredenzaTrigger asChild>
                      <Button className="animate-fade-in-up transition-all">
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
                              date: new Date(
                                e.target.value,
                              ).toLocaleDateString(),
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
                            <Button
                              className="w-1/2 text-left"
                              variant="outline"
                            >
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
                                      ? [
                                          ...(toUpdateWorkshop.topicIds ?? []),
                                          value.id,
                                        ]
                                      : toUpdateWorkshop.topicIds?.filter(
                                          (id) => id !== value.id,
                                        ),
                                  });
                                }}
                                checked={toUpdateWorkshop.topicIds?.includes(
                                  value.id,
                                )}
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
                                      ? [
                                          ...(toUpdateWorkshop.presenterIds ??
                                            []),
                                          value.id,
                                        ]
                                      : toUpdateWorkshop.presenterIds?.filter(
                                          (id) => id !== value.id,
                                        ),
                                  });
                                }}
                                checked={toUpdateWorkshop.presenterIds?.includes(
                                  value.id,
                                )}
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
                              toast.error(
                                "Morate odabrati barem jednog predavača",
                              );
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
                              toast.error(
                                "Greška prilikom uređivanja radionice",
                              );
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
                </div>
                <div>
                  <Credenza
                    open={deleteWorkshop === workshop.id}
                    onOpenChange={(isOpen) => {
                      setDeleteWorkshop(isOpen ? workshop.id : null);
                      setToUpdateWorkshop(workshop);
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
                            fetch(
                              `http://localhost:3000/workshops/${workshop.id}`,
                              {
                                method: "DELETE",
                              },
                            ).then(async (resp) => {
                              if (!resp.ok) {
                                toast.error(
                                  "Greška prilikom brisanja radionice",
                                );
                              } else {
                                await storeData.fetch();
                                toast.success(
                                  "Uspiješno ste izbrisali radionicu",
                                );
                                setDeleteOrganizer(null);
                              }
                            });
                          }}
                        >
                          Izbriši
                        </Button>
                      </CredenzaFooter>
                    </CredenzaContent>
                  </Credenza>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {id === "2" && (
        <div className="flex w-full flex-col gap-4">
          {storeData.organizers.map((org) => {
            return (
              <div
                key={org.id}
                className="flex items-center justify-between border-2 rounded-md p-2 w-full gap-4 bg-white dark:bg-black/30 dark:text-white transition-all"
              >
                <div className="w-full">{org.name}</div>
                <div className="w-full">{org.description}</div>
                <div>
                  <Credenza
                    open={editOrganizer === org.id}
                    onOpenChange={(isOpen) => {
                      setEditOrganizer(isOpen ? org.id : null);
                      setToUpdateOrganizer(org);
                    }}
                  >
                    <CredenzaTrigger asChild>
                      <Button className="animate-fade-in-up transition-all">
                        Uredi
                      </Button>
                    </CredenzaTrigger>
                    <CredenzaContent className="min-w-[525px]">
                      <CredenzaHeader className="flex justify-center items-center uppercase">
                        <CredenzaTitle>{org.name}</CredenzaTitle>
                      </CredenzaHeader>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Ime i prezime</Label>
                        <Input
                          type="text"
                          id="name"
                          value={toUpdateOrganizer.name}
                          onChange={(e) =>
                            setToUpdateOrganizer({
                              ...toUpdateOrganizer,
                              name: e.target.value,
                            })
                          }
                          placeholder="Puno ime"
                          className="col-span-3"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="bio">Opis organizatora</Label>
                        <Textarea
                          id="bio"
                          placeholder="Opis organizatora"
                          value={toUpdateOrganizer.description}
                          onChange={(e) =>
                            setToUpdateOrganizer({
                              ...toUpdatePresenter,
                              description: e.target.value,
                            })
                          }
                          className="col-span-3 h-24 resize-none text-left"
                        />
                      </div>
                      <CredenzaFooter>
                        <Button
                          onClick={async () => {
                            if (!toUpdateOrganizer.name) {
                              toast.error("Molimo unesite ime");
                              return;
                            }
                            if (!toUpdateOrganizer.description) {
                              toast.error("Molimo unesite opis");
                              return;
                            }

                            const resp = await fetch(
                              `http://localhost:3000/organizers/${org.id}`,
                              {
                                method: "PATCH",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(toUpdateOrganizer),
                              },
                            );

                            if (!resp.ok) {
                              toast.error(
                                "Greška prilikom uređivanja organizatora",
                              );
                            } else {
                              await storeData.fetch();
                              toast.success(
                                "Uspiješno ste uredili organizatora",
                              );
                              setEditPresenter(null);
                            }
                          }}
                        >
                          Potvrdi promjene
                        </Button>
                      </CredenzaFooter>
                    </CredenzaContent>
                  </Credenza>
                </div>
                <div>
                  <Credenza
                    open={deleteOrganizer === org.id}
                    onOpenChange={(isOpen) => {
                      setDeleteOrganizer(isOpen ? org.id : null);
                      setToUpdateOrganizer(org);
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
                        Jeste li sigurni da želite izbrisati organizatora{" "}
                        {org.name.toUpperCase()}?
                      </p>
                      <CredenzaFooter>
                        <Button
                          onClick={() => {
                            fetch(
                              `http://localhost:3000/organizers/${org.id}`,
                              {
                                method: "DELETE",
                              },
                            ).then(async (resp) => {
                              if (!resp.ok) {
                                toast.error(
                                  "Greška prilikom brisanja organizatora",
                                );
                              } else {
                                await storeData.fetch();
                                toast.success(
                                  "Uspiješno ste izbrisali organizatora",
                                );
                                setDeleteOrganizer(null);
                              }
                            });
                          }}
                        >
                          Izbriši
                        </Button>
                      </CredenzaFooter>
                    </CredenzaContent>
                  </Credenza>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {id === "3" && (
        <div className="flex w-full flex-col gap-4">
          {storeData.presenters.map((presenter) => {
            return (
              <div
                key={presenter.id}
                className="flex items-center justify-between border-2 rounded-md p-2 w-full gap-4 bg-white dark:bg-black/30 dark:text-white transition-all"
              >
                <div className="w-full">{presenter.name}</div>
                <div className="w-full">{presenter.description}</div>
                <div>
                  <Credenza
                    open={editPresenter === presenter.id}
                    onOpenChange={(isOpen) => {
                      setEditPresenter(isOpen ? presenter.id : null);
                      setToUpdatePresenter(presenter);
                    }}
                  >
                    <CredenzaTrigger asChild>
                      <Button className="animate-fade-in-up transition-all">
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
                            <Button
                              className="w-1/2 text-left"
                              variant="outline"
                            >
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
                                      ? [
                                          ...(toUpdatePresenter.topicIds ?? []),
                                          value.id,
                                        ]
                                      : toUpdatePresenter.topicIds?.filter(
                                          (id) => id !== value.id,
                                        ),
                                  });
                                }}
                                checked={toUpdatePresenter.topicIds?.includes(
                                  value.id,
                                )}
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
                            if (!toUpdatePresenter.name) {
                              toast.error("Molimo unesite ime");
                              return;
                            }
                            if (!toUpdatePresenter.organizersId) {
                              toast.error("Molimo odaberite organizaciju");
                              return;
                            }
                            if (!toUpdatePresenter.topicIds) {
                              toast.error("Molimo odaberite temu");
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
                              toast.error(
                                "Greška prilikom uređivanja predavača",
                              );
                            } else {
                              await storeData.fetch();
                              toast.success("Uspiješno ste uredili predavača");
                              setEditPresenter(null);
                            }
                          }}
                        >
                          Potvrdi promjene
                        </Button>
                      </CredenzaFooter>
                    </CredenzaContent>
                  </Credenza>
                </div>
                <div>
                  <Credenza
                    open={deletePresenter === presenter.id}
                    onOpenChange={(isOpen) => {
                      setDeletePresenter(isOpen ? presenter.id : null);
                      setToUpdatePresenter(presenter);
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
                            fetch(
                              `http://localhost:3000/presenters/${presenter.id}`,
                              {
                                method: "DELETE",
                              },
                            ).then(async (resp) => {
                              if (!resp.ok) {
                                toast.error(
                                  "Greška prilikom brisanja predavača",
                                );
                              } else {
                                await storeData.fetch();
                                toast.success(
                                  "Uspiješno ste izbrisali predavača",
                                );
                                setDeleteOrganizer(null);
                              }
                            });
                          }}
                        >
                          Izbriši
                        </Button>
                      </CredenzaFooter>
                    </CredenzaContent>
                  </Credenza>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
