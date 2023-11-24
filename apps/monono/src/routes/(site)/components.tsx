import { ThickButton } from "~/components/ui/ThickButton";

export default function Components() {
  return (
    <main class="flex-1">
      <ThickButton variant="fill" hue="indigo">
        Test
      </ThickButton>
      <ThickButton variant="fill">Test</ThickButton>
      <ThickButton variant="line">Test</ThickButton>
      <ThickButton>Test</ThickButton>
      <ThickButton>Test</ThickButton>
      <ThickButton>Test</ThickButton>
    </main>
  );
}
