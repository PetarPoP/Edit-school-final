import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils.ts";
import { Switch } from "@/components/ui/switch.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useAdminStore } from "@/store.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { useEffect } from "react";

const links = [
  {
    name: "Radionice",
    href: "/radionice",
  },
  {
    name: "Predavaci",
    href: "/predavaci",
  },
  {
    name: "Administracija",
    href: "/administracija",
    adminOnly: true,
  },
];

export function Nav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const location = useLocation();
  const store = useAdminStore();

  useEffect(() => {
    if (!store.isAdmin && location.pathname === "/administracija") {
      window.location.href = "/radionice";
    }
  }, [store.isAdmin, location.pathname]);

  return (
    <nav
      className={cn(
        "flex animate-fade-in transition-all w-full items-center justify-between",
        className,
      )}
      {...props}
    >
      <div className="flex gap-4 transition-all w-fit border-b-2 md:border-b-0 items-center justify-center overflow-x-auto overflow-y-hidden">
        {links
          .filter(
            ({ adminOnly }) => !adminOnly || (adminOnly && store.isVisible),
          )
          .map(({ href, name }) => (
            <Link
              key={`${href}-${name}`}
              to={href}
              className={cn(
                "animate-fade-in-up text-lg font-monospace font-medium duration-100 text-center rounded-md opacity-80 transition-all py-4 hover:opacity-90",
                {
                  "font-bold opacity-100": location.pathname === href,
                  "animate-fade-out-up":
                    !store.isAdmin && name === "Administracija",
                },
              )}
            >
              {name}
            </Link>
          ))}
      </div>

      <div className="flex w-fit items-center space-x-2">
        <ModeToggle />
        <Switch id="admin" onCheckedChange={store.setIsAdmin} />
        <Label htmlFor="admin">Admin</Label>
      </div>
    </nav>
  );
}
