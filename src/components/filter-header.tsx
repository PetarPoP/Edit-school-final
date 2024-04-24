import { Checkbox } from "@/components/ui/checkbox";

export function FilterHeader({
  onFilter,
  names,
}: Readonly<{
  onFilter: (id: string) => void;
  names: Filter[];
}>) {
  return (
    <div className="ml-2">
      {names?.map((name) => {
        return (
          <div key={name.name} className="flex items-center space-x-2">
            <Checkbox
              id={`${name.id}-${name.name}`}
              onCheckedChange={() => onFilter(name.id)}
            />
            <label htmlFor={`${name.id}-${name.name}`}>{name.name}</label>
          </div>
        );
      })}
    </div>
  );
}
