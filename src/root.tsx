// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";

import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import "./root.css";
import { signIn, signOut } from "@auth/solid-start/client";
import { Button } from "./components/ui/Button";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Monodown</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href={
            process.env.NODE_ENV === "production"
              ? "/icon.svg"
              : "/icon-dev.svg"
          }
          type="image/svg+xml"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <Body class="flex flex-col">
        <Suspense>
          <ErrorBoundary>
            <A href="/">Index</A>
            <div>
              <Button
                size="md"
                class="btn-fill-cyan"
                onClick={[signIn, "github"]}
              >
                Sign In
              </Button>
              <Button size="md" class="btn-fill-purple" onClick={signOut}>
                Sign Out
              </Button>
            </div>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
