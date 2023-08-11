import { Title } from "solid-start";
import { MCGrid } from "~/components/multiple-choice";
import { Button } from "~/components/ui/Button";

export default function Home() {
  return (
    <main>
      <Title>Monodown</Title>
      <div class="max-w-screen-sm m-auto p-4">
        <MCGrid
          question={["What does ", { text: "ok", audio: "" }, " mean?"]}
          answer={{
            text: "ok",
            audio: "",
          }}
          wrongs={[
            {
              text: "red",
              audio: "",
            },
            {
              text: "blue",
              audio: "",
            },
            {
              text: "green",
              audio: "",
            },
            {
              text: "yellow",
              audio: "",
            },
          ]}
        />
        <div class="my-8">
          <Button size="sm" class="float-right px-8">
            Continue
          </Button>
        </div>
      </div>
      {/* <Button>Test</Button>
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
      <Button size="icon-lg" class="rounded-[50%]">
        <div class="i-uil:volume"></div>
      </Button>
      <Button size="icon-lg" variant="outline" class="rounded-[50%]">
        2
      </Button>
      <Button size="icon" class="rounded-[50%]">
        2
      </Button> */}

      {/* <Button variant="outline">Test</Button> */}
    </main>
  );
}
