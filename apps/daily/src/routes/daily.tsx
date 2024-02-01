import { Title } from "@solidjs/meta";
import { Calendar } from "~/components/Calendar";
import Counter from "~/components/Counter";
import { Button } from "~/components/ui/Button";
import * as DatePicker from "~/components/ui/DatePicker";

export default function Daily() {
  return (
    <main>
      <Title>Hello World</Title>
      <Button>Hello</Button>
      <Calendar />
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </main>
  );
}
