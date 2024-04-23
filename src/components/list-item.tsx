import { ReactNode } from "react";

export function ListItem({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-1">
      <h2 className="text-sm font-semibold mr-2">{title.toUpperCase()}</h2>
      {children}
    </div>
  );
}
