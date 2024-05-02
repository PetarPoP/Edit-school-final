import { useState } from "react";
import { cn } from "@/lib/utils.ts";
import { AdministracijaDataTable } from "@/components/administracija-data-table.tsx";
import { DodajRadionicu } from "@/components/logika-radionici.tsx";
import { DodajPredavaca } from "@/components/logika-predavaci.tsx";
import { DodajOrganizatora } from "@/components/logika-organizatori.tsx";

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
  const [activeTab, setActiveTab] = useState<string>("1");

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
        {activeTab === "2" && <DodajOrganizatora />}
        {activeTab === "3" && <DodajPredavaca />}
      </nav>
      <div>
        <AdministracijaDataTable id={activeTab} />
      </div>
    </div>
  );
}
