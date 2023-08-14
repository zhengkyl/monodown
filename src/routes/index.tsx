import { clientOnly } from "solid-start/islands";
import { Button } from "~/components/ui/Button";
import { signIn, signOut } from "@auth/solid-start/client";

const MC = clientOnly(() => import("~/components/MultipleChoice"));

export default function Home() {
  return (
    <main>
      <Button class="btn-fill-cyan" onClick={[signIn, "github"]}>
        Sign In
      </Button>
      <Button class="btn-fill-purple" onClick={signOut}>
        Sign Out
      </Button>
      <MC />
    </main>
  );
}
