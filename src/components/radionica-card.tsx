import { Button } from "@/components/ui/button.tsx";
import { useAdminStore, useDataStore } from "@/store.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { ListItem } from "@/components/list-item.tsx";
import {
  Credenza,
  CredenzaContent,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza.tsx";
import { useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { toast } from "sonner";
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

export function RadionicaCard({
  radionica,
}: Readonly<{ radionica: Workshop }>) {
  const store = useAdminStore();
  const storeData = useDataStore();
  const [signUp, setSignUp] = useState(false);
  const [thanks, setThanks] = useState(false);
  const [edit, setEdit] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPresenter, setSelectedPresenter] = useState<Presenter | null>(
    null,
  );

  const workshopIndex = storeData.workshops.findIndex(
    (workshop) => workshop.id === radionica.id,
  );

  const [toUpdateWorkshop, setToUpdateWorkshop] = useState(
    storeData.workshops[workshopIndex],
  );

  return (
    <div className="flex border rounded-md overflow-hidden bg-white dark:bg-black/30 dark:text-white transition-all w-full">
      <Credenza open={dialogOpen} onOpenChange={setDialogOpen}>
        <CredenzaContent className="min-w-[550px]">
          <CredenzaHeader className="flex justify-center items-center uppercase">
            <CredenzaTitle>{selectedPresenter?.name}</CredenzaTitle>
          </CredenzaHeader>
          <div className="flex flex-row gap-4">
            <img
              src={selectedPresenter?.image}
              alt="Presenter"
              className="border-r bg-white flex rounded w-[170px] h-[170px] object-cover"
            />
            <div className="flex flex-col justify-center gap-3">
              <div className="h-[50%] w-full whitespace-nowrap overflow-hidden text-wrap">
                {selectedPresenter?.description}
              </div>
              <div className="flex flex-col gap-3">
                <ListItem title={"ORGANIZACIJA"}>
                  {storeData.organizers
                    .filter((organizer: Filter) =>
                      selectedPresenter?.organizersId.includes(organizer.id),
                    )
                    .map((organizer: Filter) => (
                      <Badge key={organizer.id}>{organizer.name}</Badge>
                    ))}
                </ListItem>
                <ListItem title={"Teme"}>
                  {storeData.topics
                    .filter((topic: Filter) =>
                      selectedPresenter?.topicIds.includes(topic.id),
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
                setDialogOpen(false);
              }}
            >
              Zatvori
            </Button>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
      <div className="min-h-72 h-full flex justify-center items-center">
        <img
          src={radionica.image}
          alt="what"
          className="border-r h-full aspect-square object-cover bg-white"
        />
      </div>
      <div className="flex p-4 gap-2 flex-col justify-between items-start">
        <div className="flex gap-2 flex-col justify-start items-start">
          <h1 className="text-2xl font-semibold">{radionica.title}</h1>
          <p>{radionica.description}</p>
          <ListItem title={"Datum"}>
            {storeData.workshops
              .filter((workshop) => workshop.id === radionica.id)
              .map((workshop) => (
                <Badge>{workshop.date}</Badge>
              ))}
          </ListItem>
          <ListItem title={"Predavač(i)"}>
            {storeData.presenters
              .filter((presenter: Presenter) =>
                radionica.presenterIds.includes(presenter.id),
              )
              .map((presenter: Presenter) => (
                <span
                  key={`${presenter.id}-${radionica.id}`}
                  className="transition-all dark:hover:bg-white/10 hover:bg-black/10 rounded"
                  onClick={() => {
                    setSelectedPresenter(presenter);
                    setDialogOpen(true);
                  }}
                >
                  <Badge>{presenter.name}</Badge>
                </span>
              ))}
          </ListItem>
          <ListItem title={"Organizacija"}>
            {storeData.organizers
              .filter((organizer) => radionica.organizersId === organizer.id)
              .map((organizer) => (
                <Badge key={organizer.id}>{organizer.name}</Badge>
              ))}
          </ListItem>
          <ListItem title={"Teme"}>
            {storeData.topics
              .filter((topic) => radionica.topicIds.includes(topic.id))
              .map((topic) => (
                <Badge key={topic.id}>{topic.name}</Badge>
              ))}
          </ListItem>
          <ListItem title={"Težina"}>
            {storeData.difficulties
              .filter((diff) => radionica.difficultyId === diff.id)
              .map((diff) => (
                <Badge key={diff.id}>{diff.name}</Badge>
              ))}
          </ListItem>
          <ListItem title={"Broj prijava"}>
            <Badge>{radionica.num_of_participants.length}</Badge>
          </ListItem>
        </div>
        <div className="flex gap-2">
          <Credenza open={signUp} onOpenChange={setSignUp}>
            <CredenzaTrigger asChild>
              <Button className="animate-fade-in-up transition-all">
                Prijavi se
              </Button>
            </CredenzaTrigger>
            <CredenzaContent className="min-w-[525px]">
              <CredenzaHeader className="flex justify-center items-center uppercase">
                <CredenzaTitle>{radionica.title}</CredenzaTitle>
              </CredenzaHeader>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Ime i prezime</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Puno ime"
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="col-span-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="bio">Razlog prijave</Label>
                <Textarea
                  id="bio"
                  placeholder="Razlog prijave"
                  className="col-span-3 h-24 resize-none text-left"
                />
              </div>
              <div>
                {store.isAdmin && (
                  <>
                    <h1 className="text-lg font-bold flex justify-center items-center">
                      Prijavljeni
                    </h1>
                    <div className="flex flex-wrap">
                      {radionica.num_of_participants.map(
                        (participant, index) => (
                          <p className="pr-4" key={index}>
                            {participant}
                          </p>
                        ),
                      )}
                    </div>
                  </>
                )}
                {!store.isAdmin && (
                  <p className="text-center">
                    {radionica.num_of_participants.length > 0 ? (
                      <span>
                        Prijavilo se {radionica.num_of_participants.length}{" "}
                        korisnika
                      </span>
                    ) : (
                      <span>Još se nitko nije prijavio</span>
                    )}
                  </p>
                )}
              </div>
              <CredenzaFooter>
                <Button
                  onClick={async () => {
                    const nameInput = document.getElementById(
                      "name",
                    ) as HTMLInputElement;
                    const emailInput = document.getElementById(
                      "email",
                    ) as HTMLInputElement;

                    const name = nameInput.value;
                    const email = emailInput.value;

                    if (!name || !email) {
                      toast.error("Molimo unesite ime i email");
                      return;
                    }

                    const workshopIndex = storeData.workshops.findIndex(
                      (workshop) => workshop.id === radionica.id,
                    );
                    const updatedWorkshop = storeData.workshops[workshopIndex];

                    updatedWorkshop.num_of_participants.push(name);

                    const resp = await fetch(
                      `http://localhost:3000/workshops/${radionica.id}`,
                      {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedWorkshop),
                      },
                    );

                    if (!resp.ok) {
                      toast.error("Greška prilikom prijave na radionicu");
                    } else {
                      await storeData.fetch();
                      toast.success("Uspiješno ste se prijavili na radionicu");
                      setSignUp(false);
                      setThanks(true);
                    }
                  }}
                >
                  Prijavi se
                </Button>
              </CredenzaFooter>
            </CredenzaContent>
          </Credenza>
          <div className="flex gap-2">
            <Credenza open={thanks} onOpenChange={setThanks}>
              <CredenzaContent className="min-w-[225px] min-h-[200px] flex flex-col justify-center items-center gap-3">
                <div className="flex flex-col gap-2 font-bold">
                  <h1 className="text-3xl col-span-3">Hvala na prijavi</h1>
                </div>
                <div className="flex flex-col gap-2">
                  {radionica.description}
                </div>
                <CredenzaFooter>
                  <Button
                    onClick={() => {
                      setThanks(false);
                    }}
                  >
                    Natrag na radionice
                  </Button>
                </CredenzaFooter>
              </CredenzaContent>
            </Credenza>
          </div>
          {store.isAdmin && (
            <Credenza open={edit} onOpenChange={setEdit}>
              <CredenzaTrigger asChild>
                <Button
                  className="animate-fade-in-up transition-all"
                  variant={"secondary"}
                >
                  Uredi
                </Button>
              </CredenzaTrigger>
              <CredenzaContent className="min-w-[525px]">
                <CredenzaHeader className="flex justify-center items-center uppercase">
                  <CredenzaTitle>{radionica.title}</CredenzaTitle>
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
                                    ...(toUpdateWorkshop.presenterIds ?? []),
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
                        toast.error("Morate odabrati barem jednog predavača");
                        return;
                      }

                      const resp = await fetch(
                        `http://localhost:3000/workshops/${radionica.id}`,
                        {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(toUpdateWorkshop),
                        },
                      );

                      if (!resp.ok) {
                        toast.error("Greška prilikom prijave na radionicu");
                      } else {
                        await storeData.fetch();
                        toast.success(
                          "Uspiješno ste se prijavili na radionicu",
                        );
                        setSignUp(false);
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
