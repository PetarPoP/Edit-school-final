import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
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

export function RadionicaCard({
  radionica,
}: Readonly<{ radionica: Workshop }>) {
  const store = useAdminStore();
  const storeData = useDataStore();
  const [signUp, setSignUp] = useState(false);
  const [thanks, setThanks] = useState(false);

  return (
    <div className="flex border rounded-md overflow-hidden bg-white dark:bg-black/30 dark:text-white transition-all w-full">
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
                <Link
                  to={`/predavaci/${presenter.id}`}
                  key={`${presenter.id}-${radionica.id}`}
                  className="hover:font-bold hover:uppercase transition-all"
                >
                  <Badge>{presenter.name}</Badge>
                </Link>
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
            <Badge>{radionica.num_of_participants}</Badge>
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
              <CredenzaFooter>
                <Button
                  onClick={() => {
                    setSignUp(false);
                    setThanks(true);
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
            <Button
              className="animate-fade-in-up transition-all"
              variant="secondary"
            >
              Uredi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
