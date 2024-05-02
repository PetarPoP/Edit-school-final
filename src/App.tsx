import { Nav } from "./components/nav.tsx";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useDataStore } from "@/store.tsx";
import { useEffect } from "react";
import { Toaster } from "sonner";

export default function App() {
  const data = useDataStore();

  useEffect(() => {
    data.fetch();
  }, []);

  return (
    <div
      vaul-drawer-wrapper=""
      className="flex flex-col items-center dvh w-full"
    >
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Toaster />
        <div className="sticky top-0 w-full px-4 pt-4 z-50">
          <div className="flex-row flex h-16 items-center rounded-md px-4 w-full justify-between border dark:bg-black/30 dark:text-white bg-white/80 backdrop-blur">
            <Nav />
          </div>
        </div>
        <div className="w-full flex p-8 pt-0 justify-center">
          <div className="w-full flex flex-col gap-8">
            <Outlet />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
