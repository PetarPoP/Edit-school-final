import { useState } from "react";
import { cn } from "@/lib/utils.ts";
import { AdministracijaDataTable } from "@/components/administracija-data-table.tsx";

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
          "flex animate-fade-in transition-all w-full items-center justify-center",
        )}
      >
        <div className="flex gap-4 transition-all w-fit md:border-b-0 items-center justify-center overflow-x-auto overflow-y-hidden">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={cn(
                "animate-fade-in-up text-lg font-monospace font-medium duration-100 text-center rounded-md opacity-80 transition-all py-4 hover:opacity-90",
                {
                  "font-bold opacity-100": activeTab === item.id,
                },
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
      </nav>
      <div>
        <AdministracijaDataTable id={activeTab} />
      </div>
    </div>
  );
}
