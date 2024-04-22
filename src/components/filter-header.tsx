export function FilterHeader({
  onFilter,
  names,
}: {
  onFilter: (filter: string) => void;
  names: Theme[];
}) {
  return (
    <div className="ml-2">
      {names &&
        names.map((name) => (
          <div key={name.name}>
            <input
              type="checkbox"
              id={name.id}
              name={name.name}
              onChange={() => onFilter(name.id)}
            />
            <label htmlFor={name.name}>{name.name}</label>
          </div>
        ))}
    </div>
  );
}
