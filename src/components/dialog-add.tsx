import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useAdminStore, useDataStore } from "@/store.tsx";
import { IconType } from "react-icons";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { DialogAddSelect } from "@/components/dialog-add-select.tsx";

interface DialogAddProps {
  type: number;
  Icon: IconType;
  IconSecondary?: IconType;
  Title: string;
  Description: string;
  ButtonText: string;
}

const DialogAdd = ({
  type,
  Icon,
  IconSecondary,
  Title,
  Description,
  ButtonText,
}: DialogAddProps) => {
  const store = useAdminStore();
  const storeData = useDataStore();

  const renderDialog = () => {
    switch (type) {
      case 1:
        return (
          <DialogContent className="min-w-[525px]">
            <DialogHeader className="gap-3">
              <DialogTitle>{Title}</DialogTitle>
              <DialogDescription>{Description}</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Ime i prezime:
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Puno ime"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Biografija
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Opis predavača"
                  className="col-span-3 h-24 resize-none text-left"
                />
              </div>
              <div className="flex justify-center items-center gap-4">
                <DialogAddSelect dataName="temu" />
              </div>
            </form>
            <DialogFooter>
              <Button type="submit">Spremi</Button>
            </DialogFooter>
          </DialogContent>
        );
      case 2:
        return (
          <DialogContent className="min-w-[525px]">
            <DialogHeader className="gap-3">
              <DialogTitle>{Title}</DialogTitle>
              <DialogDescription>{Description}</DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Naziv radionice:
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Puno ime"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Opis radionice
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Opis radionice"
                  className="col-span-3 h-24 resize-none text-left"
                />
              </div>
              <div className="flex justify-center items-center gap-4">
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Odaberite temu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Odaberite temu</SelectLabel>
                      {storeData.topics.map((topic) => (
                        <SelectItem value={topic.id}>{topic.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <DialogAddSelect dataName="organizaciju" />
              </div>
              <div className="flex justify-center items-center gap-4">
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Odaberite težinu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Odaberite težinu</SelectLabel>
                      {storeData.difficulties.map((diff) => (
                        <SelectItem value={diff.id}>{diff.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Odaberite predavača" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Odaberite predavača</SelectLabel>
                      {storeData.presenters.map((presenter) => (
                        <SelectItem value={presenter.id}>
                          {presenter.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </form>
            <DialogFooter>
              <Button type="submit">Spremi</Button>
            </DialogFooter>
          </DialogContent>
        );
      default:
        return null;
    }
  };

  return (
    <div
      data-active={store.isAdmin}
      className="flex w-full items-center justify-end py-4 h-fit opacity-0 pointer-events-none  data-[active=true]:pointer-events-auto data-[active=true]:opacity-100 transition-all"
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button className="animate-fade-in-up flex gap-2 items-center transition-all px-24">
            {Icon && <Icon className="size-5" />}
            {IconSecondary && <IconSecondary className="size-2.5 -ml-2" />}
            {ButtonText}
          </Button>
        </DialogTrigger>
        {renderDialog()}
      </Dialog>
    </div>
  );
};

export default DialogAdd;
