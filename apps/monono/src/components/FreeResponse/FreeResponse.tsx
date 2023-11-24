import {
  DragDropProvider,
  DragDropSensors,
  DragEventHandler,
  DragOverlay,
  SortableProvider,
  closestCenter,
  createDroppable,
  createSortable,
  useDragDropContext,
} from "@thisbeyond/solid-dnd";
import { For, batch, createEffect, on } from "solid-js";
import { buttonVariants } from "../ui/ThickButton";
import { createStore } from "solid-js/store";
import { createAutoAnimateDirective } from "@formkit/auto-animate/solid";

declare module "solid-js" {
  namespace JSX {
    interface DirectiveFunctions {
      sortable;
      droppable;
    }
  }
}

function Item(props) {
  const sortable = createSortable(props.id);
  return (
    <div
      use:sortable
      class={buttonVariants({ variant: "line", element: "block", size: "sm" })}
      classList={{
        invisible: sortable.isActiveDraggable,
      }}
    >
      {props.id}
    </div>
  );
}

function Response(props) {
  const droppable = createDroppable("response");
  const autoAnimate = createAutoAnimateDirective();
  return (
    <div
      use:autoAnimate
      use:droppable
      class="border p-6 rounded-lg bg-stone-100 min-h-20 flex flex-wrap gap-x-1 gap-y-2"
    >
      <SortableProvider ids={props.items}>
        <For each={props.items}>{(item) => <Item id={item}></Item>}</For>
      </SortableProvider>
    </div>
  );
}

function WordBank(props) {
  const droppable = createDroppable("wordBank");
  const autoAnimate = createAutoAnimateDirective();
  return (
    <div
      use:autoAnimate
      use:droppable
      class="border p-6 rounded-lg min-h-20 flex flex-wrap gap-x-1 gap-y-2"
    >
      <SortableProvider ids={props.items}>
        <For each={props.items}>{(item) => <Item id={item}></Item>}</For>
      </SortableProvider>
    </div>
  );
}

export default function FreeResponse() {
  const [boxes, setBoxes] = createStore({
    response: [],
    wordBank: ["Are", "Nice", "Hi", "to", "How", "meet", "you"],
  });

  const onDragOver: DragEventHandler = ({ draggable, droppable }) => {
    if (!draggable || !droppable) return;
    move(draggable, droppable);
  };

  const isBox = (id) => id === "wordBank" || id === "response";
  const getBox = (id) =>
    boxes["wordBank"].includes(id) ? "wordBank" : "response";

  const move = (draggable, droppable) => {
    if (draggable.id === droppable.id) return;
    const dragBoxId = getBox(draggable.id);
    const dropBoxId = isBox(droppable.id) ? droppable.id : getBox(droppable.id);

    let i = boxes[dropBoxId].indexOf(droppable.id);
    if (i === -1) i = boxes[dropBoxId].length;

    batch(() => {
      setBoxes(dragBoxId, (ids) => ids.filter((id) => id !== draggable.id));
      setBoxes(dropBoxId, (ids) => [
        ...ids.slice(0, i),
        draggable.id,
        ...ids.slice(i),
      ]);
    });
  };

  const targetBoxOrItem = (draggable, droppables, context) => {
    const responseBox = droppables.find(
      (droppable) => droppable.id === "response"
    );
    const wordBankBox = droppables.find(
      (droppable) => droppable.id === "wordBank"
    );

    // Idea: b/c can't animate end position or click, maybe reduce drag distance
    // this moves box once as soon as outside box
    //
    // let targetBox;
    // // need drag origin, otherwise flicker back and forth
    // if (getBox(draggable.id) === "wordBank") {
    //   // transform's top and bottom are distance from top
    //   if (draggable.transformed.bottom < wordBankBox.layout.top) {
    //     targetBox = responseBox;
    //   } else {
    //     targetBox = wordBankBox;
    //   }
    // } else {
    //   if (draggable.transformed.top > responseBox.layout.bottom) {
    //     targetBox = wordBankBox;
    //   } else {
    //     targetBox = responseBox;
    //   }
    // }

    const targetBox = closestCenter(
      draggable,
      [wordBankBox, responseBox],
      context
    );

    const boxItemIds = boxes[targetBox.id];
    const targetBoxItemIds = droppables.filter((droppable) =>
      boxItemIds.includes(droppable.id)
    );
    const closestItem = closestCenter(draggable, targetBoxItemIds, context);
    if (!closestItem) {
      return targetBox;
    }

    if (getBox(draggable.id) !== targetBox.id) {
      const isLastItem =
        boxItemIds.indexOf(closestItem.id as number) === boxItemIds.length - 1;

      if (isLastItem) {
        const belowLastItem =
          draggable.transformed.center.x > closestItem.transformed.center.x;

        if (belowLastItem) {
          return targetBox;
        }
      }
    }

    return closestItem;
  };

  function LogicWrapper() {
    const [_, { recomputeLayouts }] = useDragDropContext();
    createEffect(
      on(
        [() => boxes.wordBank, () => boxes.response],
        () => {
          recomputeLayouts();
        },
        { defer: true }
      )
    );
    return null;
  }

  return (
    <div class="max-w-screen-sm m-auto p-4 h-full flex flex-col justify-between">
      <div class="text-2xl font-semibold m-y-8">What is a cantaloupe?</div>
      <DragDropProvider
        collisionDetector={targetBoxOrItem}
        onDragOver={onDragOver}
      >
        <LogicWrapper />
        <DragDropSensors />
        <Response items={boxes["response"]} />
        <WordBank items={boxes["wordBank"]} />
        <DragOverlay>
          {(draggable) => (
            <div
              class={buttonVariants({
                variant: "line",
                element: "block",
                size: "sm",
              })}
            >
              {draggable.id}
            </div>
          )}
        </DragOverlay>
      </DragDropProvider>
    </div>
  );
}
