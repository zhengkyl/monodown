import Intro from "~/mdx/intro.mdx";

export default function Index() {
  return (
    <main class="flex-1">
      <article class="max-w-screen-xl mx-auto px-6 md:(px-8) lg:(px-16)">
        <Intro />
      </article>
    </main>
  );
}
