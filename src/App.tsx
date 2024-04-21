import { Nav } from "./components/nav.tsx";
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="flex flex-col items-center min-h-screen h-full max-h-screen w-full">
      <div className="sticky top-0 w-full bg-background z-50">
        <div className="flex-row flex h-16 items-center px-4 w-full justify-between border-b">
          <Nav />
        </div>
      </div>
      <div className="w-full flex p-8 justify-center">
        <div className="w-full max-w-[1200px] flex flex-col gap-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
