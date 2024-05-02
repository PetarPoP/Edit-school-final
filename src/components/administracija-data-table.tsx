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
import { toast } from "sonner";
import { useState } from "react";
import {
  IzbrisiRadionicu,
  UrediRadionicu,
} from "@/components/logika-radionicu.tsx";
import {
  IzbrisiPredavaca,
  UrediPredavaca,
} from "@/components/logika-predavaci.tsx";

export function AdministracijaDataTable({ id }: { id: string }) {
  const storeData = useDataStore();
  const [editOrganizer, setEditOrganizer] = useState<string | null>(null);

  const [deleteOrganizer, setDeleteOrganizer] = useState<string | null>(null);

  const [toUpdateOrganizer, setToUpdateOrganizer] = useState<Filter>({
    id: "",
    name: "",
    description: "",
  });

  return (
    <div>
      {id === "1" && (
        <div className="flex w-full flex-col gap-4 transition-all animate-fade-in-up">
          {storeData.workshops.map((workshop) => {
            return (
              <div
                key={workshop.id}
                className="flex items-center justify-between border-2 rounded-md p-2 w-full gap-4 bg-white dark:bg-black/30 dark:text-white transition-all"
              >
                <div className="w-full">{workshop.title}</div>
                <div className="w-full">{workshop.description}</div>
                <div className="w-full">{workshop.date}</div>
                <div className="w-full">
                  Broj prijava: {workshop.num_of_participants.length}
                </div>
                <div>
                  <UrediRadionicu workshop={workshop} />
                </div>
                <div>
                  <IzbrisiRadionicu workshop={workshop} />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {id === "2" && (
        <div className="flex w-full flex-col gap-4 transition-all animate-fade-in-up">
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
                              ...toUpdateOrganizer,
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
                              setEditOrganizer(null);
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
        <div className="flex w-full flex-col gap-4 transition-all animate-fade-in-up">
          {storeData.presenters.map((presenter) => {
            return (
              <div
                key={presenter.id}
                className="flex items-center justify-between border-2 rounded-md p-2 w-full gap-4 bg-white dark:bg-black/30 dark:text-white transition-all"
              >
                <div className="w-full">{presenter.name}</div>
                <div className="w-full">{presenter.description}</div>
                <div>
                  <UrediPredavaca presenter={presenter} />
                </div>
                <div>
                  <IzbrisiPredavaca presenter={presenter} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
