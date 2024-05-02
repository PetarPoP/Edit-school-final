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
import { PiPlus, PiWarehouseDuotone } from "react-icons/pi";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { toast } from "sonner";
import { useDataStore } from "@/store.tsx";
import { DodajRadionicu } from "@/components/logika-radionicu.tsx";
import { DodajPredavaca } from "@/components/logika-predavaci.tsx";

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
  const [addOrgDialogOpen, setAddOrgDialogOpen] = useState(false);

  const [newOrg, setNewOrg] = useState<Partial<Filter>>({
    id: crypto.randomUUID(),
    name: "",
    description: "",
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
        {activeTab === "1" && <DodajRadionicu />}
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
        {activeTab === "3" && <DodajPredavaca />}
      </nav>
      <div>
        <AdministracijaDataTable id={activeTab} />
      </div>
    </div>
  );
}
