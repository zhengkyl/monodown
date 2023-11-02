// @refresh reload
import { Suspense } from "solid-js";
import {
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

const immediateThemeScript = `let theme = localStorage.getItem('theme');
if (!theme) {
  theme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}
if (theme === 'dark') {
  document.body.classList.add('dark');
  localStorage.setItem('theme', 'dark');
}`;

export default function Root() {
  // Sync with change made by immediate theme script
  let bodyClass = "flex flex-col";
  if (
    typeof document !== "undefined" &&
    document.body.classList.contains("dark")
  ) {
    bodyClass += " dark";
  }

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
      <Body class={bodyClass}>
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <script innerHTML={immediateThemeScript}></script>
        <Scripts />
      </Body>
    </Html>
  );
}
