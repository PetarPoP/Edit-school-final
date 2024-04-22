import { Nav } from "./components/nav.tsx";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="flex flex-col items-center dvh w-full">
      <div className="sticky top-0 w-full px-4 pt-4 z-50">
        <div className="flex-row flex h-16 items-center rounded-md px-4 w-full justify-between border bg-white/80 backdrop-blur">
          <Nav />
        </div>
      </div>
      <div className="w-full flex p-8 pt-16 justify-center">
        <div className="w-full flex flex-col gap-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
