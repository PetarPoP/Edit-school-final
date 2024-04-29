import { Button } from "@/components/ui/button.tsx";
import { useAdminStore, useDataStore } from "@/store.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { ListItem } from "@/components/list-item.tsx";
import { useState } from "react";
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
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Select } from "@radix-ui/react-select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";

export function PredavaciCard({
  presenter,
}: Readonly<{ presenter: Presenter }>) {
  const store = useAdminStore();
  const storeData = useDataStore();
  const [viewPresenter, setViewPresenter] = useState(false);
  const [editPresenter, setEditPresenter] = useState(false);

  const presenterIndex = storeData.presenters.findIndex(
    (pres) => pres.id === presenter.id,
  );

  const [toUpdatePresenter, setToUpdatePresenter] = useState(
    storeData.presenters[presenterIndex],
  );

  return (
    <div className="flex border rounded-md overflow-hidden bg-white dark:bg-black/30 dark:text-white transition-all w-full">
      <div>
        <img
          src={presenter.image}
          alt="Presenter"
          className="border-r bg-white"
        />
      </div>
      <div className="flex p-4 gap-2 flex-col justify-between items-start">
        <div className="flex gap-2 flex-col justify-start items-start">
          <h1 className="text-2xl font-semibold">{presenter.name}</h1>
          <p>{presenter.description}</p>
          <ListItem title="ORGANIZACIJE">
            {storeData.organizers
              .filter((organizer: Filter) =>
                presenter.organizersId.includes(organizer.id),
              )
              .map((organizer: Filter) => (
                <Badge key={organizer.id}>{organizer.name}</Badge>
              ))}
          </ListItem>
          <ListItem title={"Teme"}>
            {storeData.topics
              .filter((topic: Filter) => presenter.topicIds.includes(topic.id))
              .map((topic: Filter) => (
                <Badge key={topic.id}>{topic.name}</Badge>
              ))}
          </ListItem>
        </div>
        <div className="flex gap-2">
          <Credenza open={viewPresenter} onOpenChange={setViewPresenter}>
            <CredenzaTrigger asChild>
              <Button className="animate-fade-in-up transition-all">
                Pregledaj predavača
              </Button>
            </CredenzaTrigger>
            <CredenzaContent className="min-w-[550px]">
              <CredenzaHeader className="flex justify-center items-center uppercase">
                <CredenzaTitle>{presenter.name}</CredenzaTitle>
              </CredenzaHeader>
              <div className="flex flex-row gap-4">
                <img
                  src={presenter.image}
                  alt="Presenter"
                  className="border-r bg-white flex rounded w-[170px] h-[170px] object-cover"
                />
                <div className="flex flex-col justify-center gap-3">
                  <div className="h-[50%] w-full whitespace-nowrap overflow-hidden text-wrap">
                    {presenter.description}
                  </div>
                  <div className="flex flex-col gap-3">
                    <ListItem title={"ORGANIZACIJA"}>
                      {storeData.organizers
                        .filter((organizer: Filter) =>
                          presenter.organizersId.includes(organizer.id),
                        )
                        .map((organizer: Filter) => (
                          <Badge key={organizer.id}>{organizer.name}</Badge>
                        ))}
                    </ListItem>
                    <ListItem title={"Teme"}>
                      {storeData.topics
                        .filter((topic: Filter) =>
                          presenter.topicIds.includes(topic.id),
                        )
                        .map((topic: Filter) => (
                          <Badge key={topic.id}>{topic.name}</Badge>
                        ))}
                    </ListItem>
                  </div>
                </div>
              </div>
              <CredenzaFooter>
                <Button
                  onClick={() => {
                    setViewPresenter(false);
                  }}
                >
                  Zatvori
                </Button>
              </CredenzaFooter>
            </CredenzaContent>
          </Credenza>
          {store.isAdmin && (
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
                        toast.success(
                          "Uspiješno ste se prijavili na radionicu",
                        );
                        setViewPresenter(false);
                      }
                    }}
                  >
                    Potvrdi promjene
                  </Button>
                </CredenzaFooter>
              </CredenzaContent>
            </Credenza>
          )}
        </div>
      </div>
    </div>
  );
}
