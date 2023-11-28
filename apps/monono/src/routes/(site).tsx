import { Outlet } from "solid-start";
import { Header } from "~/components/Header";

export default function SiteLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
