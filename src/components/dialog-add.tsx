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
import { useAdminStore } from "@/store.tsx";
import { IconType } from "react-icons";

interface DialogAddProps {
  Icon: IconType;
  IconSecondary?: IconType;
  Title: string;
  Description: string;
  ButtonText: string;
}

const DialogAdd = ({
  Icon,
  IconSecondary,
  Title,
  Description,
  ButtonText,
}: DialogAddProps) => {
  const store = useAdminStore();

  return (
    <div
      data-active={store.isAdmin}
      className="flex w-full items-center justify-end py-4 h-fit opacity-0 pointer-events-none  data-[active=true]:pointer-events-auto data-[active=true]:opacity-100 transition-all"
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button className="animate-fade-in-up flex gap-2 items-center transition-all px-24">
            <Icon className="size-5" />
            {IconSecondary && <IconSecondary className="size-2.5 -ml-2" />}
            {ButtonText}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>{Title}</DialogTitle>
            <DialogDescription>{Description}</DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Puno ime:
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Puno ime"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Razlog za prijavu
              </Label>
              <Input
                type="text"
                id="rzp"
                placeholder="Razlog za prijavu"
                className="col-span-3 h-24 resize-none text-left"
              />
            </div>
          </form>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogAdd;
