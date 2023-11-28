import { Outlet } from "solid-start";
import { MDXProvider } from "solid-marked";
import { JSX } from "solid-js";
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

export default function ArticleLayout() {
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
              <main class="flex-1 overflow-y-auto">
                <article class="max-w-screen-xl m-auto px-6 md:(px-8) lg:(px-16) space-y-4">
                  {props.children}
                </article>
              </main>
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
        <div class="flex h-full overflow-hidden tocHack">
          <aside class="bg-accent">
            <div class="font-bold py-1">About</div>
            <List ordered={false}>
              <ListItem>
                <Paragraph>
                  <Link url="/" leftSidebar>
                    What is this?
                  </Link>
                </Paragraph>
              </ListItem>
            </List>
            <Separator.Root class="my-2" />
            <div class="font-bold py-1">Notes</div>
            <List ordered={false}>
              <ListItem>
                <Paragraph>
                  <Link>Writing System</Link>
                </Paragraph>
                <List ordered={false}>
                  <ListItem>
                    <Paragraph>
                      <Link>Hiragana</Link>
                    </Paragraph>
                  </ListItem>
                  <ListItem>
                    <Paragraph>
                      <Link>Katakana</Link>
                    </Paragraph>
                  </ListItem>
                </List>
              </ListItem>
            </List>
          </aside>
          <Outlet />
        </div>
      </MDXProvider>
    </>
  );
}
