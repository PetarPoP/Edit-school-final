import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Select } from "@radix-ui/react-select";
import { useDataStore } from "@/store.tsx";

export function DialogAddSelect({ dataName }: { dataName: string }) {
  const storeData = useDataStore();

  return (
    <div>
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={"Odaberite " + dataName} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {dataName === "temu" &&
              storeData.topics.map((topic) => (
                <SelectItem value={topic.id}>{topic.name}</SelectItem>
              ))}
            {dataName === "organizaciju" &&
              storeData.organizers.map((org) => (
                <SelectItem value={org.id}>{org.name}</SelectItem>
              ))}
            {dataName === "težinu" &&
              storeData.difficulties.map((diff) => (
                <SelectItem value={diff.id}>{diff.name}</SelectItem>
              ))}
            {dataName === "predavača" &&
              storeData.presenters.map((presenter) => (
                <SelectItem value={presenter.id}>{presenter.name}</SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
