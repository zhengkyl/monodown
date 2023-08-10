import { Title } from "solid-start";
import { Button } from "~/components/ui/Button";

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Button>Test</Button>
      <Button size="lg">Test</Button>
      <Button size="lg" variant="outline">
        Test
      </Button>
      <Button size="icon">
        <div class="i-uil:volume"></div>
      </Button>
      <Button size="icon-lg">
        <div class="i-uil:volume"></div>
      </Button>
      <Button size="icon-lg" class="rounded-full">
        <div class="i-uil:volume"></div>
      </Button>
      <Button size="icon-lg" class="rounded-full">
        2
      </Button>
      <Button size="icon" class="rounded-full">
        2
      </Button>

      <Button variant="outline">Test</Button>
      <p>
        Unicons by <a href="https://iconscout.com/">IconScout</a>
      </p>
    </main>
  );
}
