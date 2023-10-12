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
import { Button } from "./components/ui/Button";
import { As } from "@kobalte/core";

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
      <Body class="flex flex-col bg-black overflow-hidden">
        <Suspense>
          <ErrorBoundary>
            {/* <div>
              <Button asChild>
                <As component={A} href="/">
                  Home
                </As>
              </Button>
              <Button asChild>
                <As component={A} href="/test">
                  Test
                </As>
              </Button>
              <Button asChild>
                <As component={A} href="/learn">
                  Learn
                </As>
              </Button>
              <Button asChild>
                <As component={A} href="/components">
                  Components
                </As>
              </Button>
            </div> */}
            <div>
              <Routes>
                <FileRoutes />
              </Routes>
            </div>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
