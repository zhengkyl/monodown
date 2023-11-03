import { Outlet } from "solid-start";
import { Header } from "~/components/Header";
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

export default function SiteLayout() {
  return (
    <>
      <Header />

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
              <div class="flex-1 h-full overflow-y-auto">
                <article class="max-w-screen-xl m-auto p-16 pt-0 space-y-4">
                  {props.children}
                </article>
              </div>
            );
          },
          Door,
        }}
      >
        <div class="flex h-full overflow-hidden tocHack">
          <Outlet />
        </div>
      </MDXProvider>
    </>
  );
}
