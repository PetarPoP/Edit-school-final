import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils.ts";
import { Switch } from "@/components/ui/switch.tsx";
import { Label } from "@/components/ui/label.tsx";

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
  return (
    <nav
      className={cn(
        "flex animate-fade-in transition-all w-full items-center justify-between",
        className,
      )}
      {...props}
    >
      <div className="flex gap-4 transition-all w-fit border-b-2 md:border-b-0 items-center justify-center overflow-x-auto">
        {links.map(({ href, name }) => (
          <Link
            key={`${href}-${name}`}
            to={href}
            className={cn(
              "text-lg font-monospace font-medium duration-100 text-center rounded-md opacity-80 transition-all py-4 hover:opacity-90",
              {
                "font-bold opacity-100": location.pathname === href,
              },
            )}
          >
            {name}
          </Link>
        ))}
      </div>
      <div className="flex w-fit items-center space-x-2">
        <Switch id="admin" />
        <Label htmlFor="admin">Admin</Label>
      </div>
    </nav>
  );
}
