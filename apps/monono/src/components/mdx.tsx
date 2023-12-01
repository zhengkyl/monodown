import { Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import { A } from "solid-start";

export function Root(props) {
  return props.children;
}

export function Heading(props) {
  return (
    <Dynamic
      component={`h${props.depth}`}
      id={props.id}
      class="font-bold"
      classList={{
        "pt-8": props.depth !== 1,
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
}

export function Paragraph(props) {
  return <p>{props.children}</p>;
}

export function List(props) {
  return (
    <Dynamic
      component={props.ordered ? "ol" : "ul"}
      start={props.start}
      class={props.class}
    >
      {props.children}
    </Dynamic>
  );
}

export function ListItem(props) {
  return (
    <li>
      <Show when={"checked" in props} fallback={props.children}>
        <input type="checkbox" checked={props.checked ?? undefined} />
        {props.children}
      </Show>
    </li>
  );
}

export function Link(props) {
  // right sidebar link used by TableOfContents
  if (props.url.startsWith("#")) {
    return (
      <A
        href={props.url}
        title={props.title ?? undefined}
        class="block font-semibold py-0.5 text-sm text-muted-foreground hover:text-foreground"
      >
        {props.children}
      </A>
    );
  }

  return (
    <a
      href={props.url}
      title={props.title ?? undefined}
      class="hover:underline"
    >
      {props.children}
    </a>
  );
}

export function Image(props) {
  return <img src={props.url} alt={props.alt ?? props.title} />;
}

export function Strong(props) {
  return <span class="font-bold">{props.children}</span>;
}

export function Emphasis(props) {
  return <span class="font-italic">{props.children}</span>;
}

export function Table(props) {
  return <table {...props} />;
}

export function TableRow(props) {
  return <tr {...props} />;
}

export function TableCell(props) {
  return <td {...props} />;
}
