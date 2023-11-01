import { Outlet } from "solid-start";
import { Header } from "~/components/Header";
import { MDXProvider } from "solid-marked";
import { Dynamic } from "solid-js/web";

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
              <Dynamic component={`h${props.depth}`}>{props.children}</Dynamic>
            );
          },
          Paragraph(props) {
            return <p>{props.children}</p>;
          },
        }}
      >
        {/* <MDXProvider
        components={{
          h1: (props: HProps) => <h1 class="text-5xl font-bold" {...props} />,
          h2: (props: HProps) => <h2 class="text-4xl font-bold" {...props} />,
          h3: (props: HProps) => <h3 class="text-3xl font-bold" {...props} />,
          h4: (props: HProps) => <h4 class="text-2xl font-bold" {...props} />,
          h5: (props: HProps) => <h5 class="text-xl font-bold" {...props} />,
          h6: (props: HProps) => <h6 class="text-lg font-bold" {...props} />,
        }}
      > */}
        <Outlet />
      </MDXProvider>
    </>
  );
}
