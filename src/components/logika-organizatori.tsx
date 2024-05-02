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
import { toast } from "sonner";
import { useState } from "react";
import { useDataStore } from "@/store.tsx";

export function DodajOrganizatora() {
  const storeData = useDataStore();
  const [addOrgDialogOpen, setAddOrgDialogOpen] = useState(false);

  const [newOrg, setNewOrg] = useState<Partial<Filter>>({
    id: crypto.randomUUID(),
    name: "",
    description: "",
  });

  return (
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
          <CredenzaDescription>Dodajte novu radionicu</CredenzaDescription>
        </CredenzaHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Naziv organizacije</Label>
          <Input
            type="text"
            id="name"
            placeholder="Puno ime"
            className="col-span-3"
            value={newOrg.name}
            onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
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

              const resp = await fetch(`http://localhost:3000/organizers`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });

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
  );
}

export function UrediOrganizatora({ org }: { org: Filter }) {
  const storeData = useDataStore();
  const [editOrganizer, setEditOrganizer] = useState<string | null>(null);

  const organizerIndex = storeData.organizers.findIndex((o) => o.id === org.id);

  const [toUpdateOrganizer, setToUpdateOrganizer] = useState<Filter>(
    storeData.organizers[organizerIndex],
  );

  return (
    <Credenza
      open={editOrganizer === org.id}
      onOpenChange={(isOpen) => {
        setEditOrganizer(isOpen ? org.id : null);
        setToUpdateOrganizer(org);
      }}
    >
      <CredenzaTrigger asChild>
        <Button className="animate-fade-in-up transition-all">Uredi</Button>
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
                toast.error("Greška prilikom uređivanja organizatora");
              } else {
                await storeData.fetch();
                toast.success("Uspiješno ste uredili organizatora");
                setEditOrganizer(null);
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

export function IzbrisiOrganizatora({ org }: { org: Filter }) {
  const storeData = useDataStore();
  const [deleteOrganizer, setDeleteOrganizer] = useState<string | null>(null);

  return (
    <Credenza
      open={deleteOrganizer === org.id}
      onOpenChange={(isOpen) => {
        setDeleteOrganizer(isOpen ? org.id : null);
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
              fetch(`http://localhost:3000/organizers/${org.id}`, {
                method: "DELETE",
              }).then(async (resp) => {
                if (!resp.ok) {
                  toast.error("Greška prilikom brisanja organizatora");
                } else {
                  await storeData.fetch();
                  toast.success("Uspiješno ste izbrisali organizatora");
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
  );
}
