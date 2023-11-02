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
} from "~/components/mdx";

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
        }}
        components={{
          Content(props: { children: JSX.Element }) {
            return (
              <article class="flex-1 max-w-screen-lg m-auto p-16 pt-0 space-y-4 h-full overflow-y-auto">
                {props.children}
              </article>
            );
          },
        }}
      >
        <Outlet />
      </MDXProvider>
    </>
  );
}
