import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useDataStore } from "@/store.tsx";
import { Checkbox } from "@/components/ui/checkbox.tsx";

export function DrawerAdd({ dataType }: Readonly<{ dataType: string }>) {
  const storeData = useDataStore();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Odaberite {dataType}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Odabir</DrawerTitle>
            <DrawerDescription>Odaberite {dataType}</DrawerDescription>
          </DrawerHeader>
          <div className="p-10 pb-0">
            <div className="gap-4">
              <div className="flex flex-col flex-wrap max-h-36 text-center">
                {dataType === "temu" &&
                  storeData.topics.map((topic) => (
                    <div className="flex items-center text-lg space-x-2 ml-6">
                      <Checkbox id={topic.id} />
                      <label
                        htmlFor={topic.id}
                        className="cursor-pointer hover:font-bold"
                      >
                        {topic.name}
                      </label>
                    </div>
                  ))}
                {dataType === "predavača" &&
                  storeData.presenters.map((presenter) => (
                    <div className="flex items-center text-lg space-x-2 ml-6">
                      <Checkbox id={presenter.id} />
                      <label
                        htmlFor={presenter.id}
                        className="cursor-pointer hover:font-bold"
                      >
                        {presenter.name}
                      </label>
                    </div>
                  ))}
                {dataType === "težinu" &&
                  storeData.difficulties.map((diff) => (
                    <div className="flex items-center text-lg space-x-2 ml-6">
                      <Checkbox id={diff.id} />
                      <label
                        htmlFor={diff.id}
                        className="cursor-pointer hover:font-bold"
                      >
                        {diff.name}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
