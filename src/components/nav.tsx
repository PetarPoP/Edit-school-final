import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils.ts";

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
        "flex animate-fade-in transition-all items-center justify-evenly md:justify-start ",
        className,
      )}
      {...props}
    >
      <div className="flex gap-4 transition-all w-full border-b-2 md:border-b-0 items-center justify-center overflow-x-auto">
        {links.map(({ href, name }) => (
          <Link
            key={`${href}-${name}`}
            to={href}
            className={cn(
              "text-sm font-monospace font-medium duration-100 text-center rounded-md opacity-80 transition-all py-4 hover:opacity-90",
              {
                "font-bold opacity-100": location.pathname === href,
              },
            )}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
