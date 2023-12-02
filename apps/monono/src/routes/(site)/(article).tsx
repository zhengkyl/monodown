import { A, Outlet, useLocation, useMatch } from "solid-start";
import { MDXProvider } from "solid-marked";
import { JSX, createEffect, createSignal, on } from "solid-js";
import {
  Root,
  Heading,
  Link,
  List,
  ListItem,
  Paragraph,
  Image,
  Strong,
  Emphasis,
  Table,
  TableCell,
  TableRow,
} from "~/components/mdx";
import { Door } from "~/components/Door";
import { Separator } from "@kobalte/core";
import { FlatButton } from "~/components/ui/FlatButton";

import Icon from "~/assets/svg/icon.svg";

export default function ArticleLayout() {
  const location = useLocation();

  createEffect(
    on(
      () => {
        location.pathname;
        location.hash;
      },
      () => setSidebar(null),
      { defer: true }
    )
  );

  const [sidebar, setSidebar] = createSignal<"left" | "right" | null>(null);

  const toggleLeft = () => setSidebar("left");
  const toggleRight = () => setSidebar("right");
  const toggleOff = () => setSidebar(null);

  return (
    <>
      <MDXProvider
        builtins={{
          Root,
          Heading,
          Paragraph,
          List,
          ListItem,
          Link,
          Image,
          Strong,
          Emphasis,
          Table,
          TableRow,
          TableCell,
        }}
        components={{
          Content(props: { children: JSX.Element }) {
            return (
              <article class="p-6 lg:p-8 space-y-4">{props.children}</article>
            );
          },
          Door,
          Initial(props: { children: JSX.Element }) {
            return (
              <span class="text-4xl font-bold mr-1">{props.children}</span>
            );
          },
        }}
      >
        <div
          class="z-1 fixed bg-black/50 lg:(w-0)"
          classList={{
            "h-full w-full": !!sidebar(),
          }}
          onClick={toggleOff}
        ></div>
        <div
          id="sidebarHack"
          class="flex-1 relative lg:(flex)"
          data-sidebar={sidebar()}
        >
          <div class="flex justify-between border-b px-2 lg:hidden sticky top-0 bg-background">
            <FlatButton
              variant="text"
              class="text-secondary-foreground hover:text-foreground py-3 px-4"
              onClick={toggleLeft}
            >
              <div class="i-mdi:menu-close h-6 w-6"></div>
              <span class="ml-1 mt-[-1px]">Menu</span>
            </FlatButton>
            <FlatButton
              variant="text"
              class="text-secondary-foreground hover:text-foreground py-3 px-4"
              onClick={toggleRight}
            >
              <span class="mt-[-1px]">On this page</span>
              <div class="i-mdi:menu-left h-6 w-6 mr-[-8px]"></div>
            </FlatButton>
          </div>
          <aside class="bg-secondary text-secondary-foreground fixed top-0 w-[250px] left-[-250px] h-full transition-left lg:(left-0) z-10 overflow-y-auto">
            <div class="lg:(sticky top-0 bg-secondary h-12 w-[250px])"></div>
            <div class="lg:pt-0 p-6 lg:px-8">
              <Separator.Root class="mb-2" />
              <List ordered={false}>
                <ListItem>
                  <LeftLink url="/">What is Monono?</LeftLink>
                </ListItem>
              </List>
              <Separator.Root class="my-2" />
              <div class="font-bold py-1 text-foreground">Notes</div>
              <List ordered={false}>
                <ListItem>
                  <LeftLink>Writing System</LeftLink>
                  <List ordered={false}>
                    <ListItem>
                      <LeftLink>Hiragana</LeftLink>
                    </ListItem>
                    <ListItem>
                      <LeftLink>Katakana</LeftLink>
                    </ListItem>
                  </List>
                </ListItem>
              </List>
            </div>
          </aside>
          <main class="w-full lg:pl-[250px]">
            <div id="tocParent" class="flex mx-auto max-w-screen-xl">
              <Outlet />
            </div>
          </main>
        </div>
      </MDXProvider>
    </>
  );
}

const relativeUrl = (s: string) => `${s.toLowerCase().replaceAll(" ", "-")}`;

function LeftLink(props) {
  const url = props.url ?? relativeUrl(props.children);
  const match = useMatch(() => url);

  return (
    <A
      href={url}
      title={props.title ?? undefined}
      class="block font-semibold py-1 hover:text-amber-600"
      classList={{
        "text-amber-600": !!match(),
      }}
    >
      {props.children}
    </A>
  );
}
