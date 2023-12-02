import { Outlet } from "solid-start";
import { Header } from "~/components/Header";

export default function SiteLayout() {
  return (
    <>
      <div class="flex flex-col min-h-full">
        <Header />
        <Outlet />
      </div>
    </>
  );
}
