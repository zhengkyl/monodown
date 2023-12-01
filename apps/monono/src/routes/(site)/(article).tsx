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
            return <article class="p-8 space-y-4">{props.children}</article>;
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
          id="sidebarHack"
          class="flex flex-col h-full overflow-hidden lg:flex-row relative"
          data-sidebar={sidebar()}
        >
          <div id="sidebarShadow" class="z-1" onClick={toggleOff}></div>
          <div class="flex justify-between border-b p-2 lg:hidden">
            <FlatButton
              variant="text"
              class="text-secondary-foreground hover:text-foreground py-1 px-4"
              onClick={toggleLeft}
            >
              <div class="i-mdi:menu-close h-6 w-6"></div>
              <span class="ml-1 mt-[-1px]">Menu</span>
            </FlatButton>
            <FlatButton
              variant="text"
              class="text-secondary-foreground hover:text-foreground py-1 px-4"
              onClick={toggleRight}
            >
              <span class="mt-[-1px]">On this page</span>
              <div class="i-mdi:menu-left h-6 w-6 mr-[-8px]"></div>
            </FlatButton>
          </div>
          <aside class="bg-secondary text-secondary-foreground absolute left-[-250px] w-[250px] p-8 h-full transition-left overflow-y-auto lg:(relative left-0) z-10">
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
          </aside>
          <main class="overflow-y-scroll overflow-x-hidden w-full">
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
