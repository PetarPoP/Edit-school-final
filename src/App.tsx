import { Nav } from "./components/nav.tsx";
import { Outlet, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { useDataStore } from "@/store.tsx";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button.tsx";

export default function App() {
  const data = useDataStore();
  const location = useLocation();

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
          <div className="w-full flex flex-col gap-8 animate-fade-in-up">
            {location.pathname === "/" ? (
              <div className="w-full flex flex-col items-center justify-center p-24 gap-3 text-xl">
                <p className="text-center">
                  If you like the sites I make please visit my main site, <br />{" "}
                  this site was made as a final project of Junior DEV React
                  curse for Edit school.
                </p>
                <a
                  href="https://petarpopovic.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    className="p-1 bg-transparent text-black dark:text-white border-black dark:border-white hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-all duration-100 ease-in-out rounded border-b-2
                     hover:border-b-4 hover:border-t-2 hover:border-black dark:hover:border-white hover:border-l-2 hover:border-r-2
                     active:transform active:border-b-0 active:translate-y-0 mt-2 md:text-xl text-md font-bold"
                  >
                    Main site
                  </Button>
                </a>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
