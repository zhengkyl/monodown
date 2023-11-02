import { Outlet } from "solid-start";
import { Header } from "~/components/Header";
import { MDXProvider } from "solid-marked";
import { Dynamic, Show } from "solid-js/web";
import { JSX } from "solid-js";

export default function SiteLayout() {
  return (
    <>
      <Header />

      <MDXProvider
        builtins={{
          Root(props) {
            return props.children;
          },
          Heading(props) {
            return (
              <Dynamic
                component={`h${props.depth}`}
                class="font-bold"
                classList={{
                  "text-5xl": props.depth === 1,
                  "text-4xl": props.depth === 2,
                  "text-3xl": props.depth === 3,
                  "text-2xl": props.depth === 4,
                  "text-xl": props.depth === 5,
                  "text-lg": props.depth === 6,
                }}
              >
                {props.children}
              </Dynamic>
            );
          },
          Paragraph(props) {
            return <p>{props.children}</p>;
          },
          Image(props) {
            return <img src={props.url} alt={props.alt ?? props.title} />;
          },
          Strong(props) {
            return <span class="font-bold">{props.children}</span>;
          },
          Emphasis(props) {
            return <span class="font-italic">{props.children}</span>;
          },
          List(props) {
            return (
              <Dynamic component={props.ordered ? 'ol' : 'ul'} start={props.start ?? undefined}>
                {props.children}
              </Dynamic>
            );
          },
          ListItem(props) {
            return (
              <li>
                <Show when={'checked' in props} fallback={props.children}>
                  <input type="checkbox" checked={props.checked ?? undefined} />
                  {props.children}
                </Show>
              </li>
            );
          },
          Link(props) {
            return (
              <a href={props.url} title={props.title ?? undefined}>{props.children}</a>
            );
          },
        }}
        components={{
          Example() {
            return <div>example worked</div>;
          },
          Content(props: {children: JSX.Element}) {
            return <div>{props.children}</div>
          }
        }}
      >
        <div class="flex">
        <div>navigation</div>
          <Outlet />
        </div>
      </MDXProvider>
    </>
  );
}
