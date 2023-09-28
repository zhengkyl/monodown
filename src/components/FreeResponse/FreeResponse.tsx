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
import { buttonVariants } from "../ui/Button";
import { createStore } from "solid-js/store";

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
      class={buttonVariants({ variant: "line", element: "block" })}
      classList={{ "opacity-25": sortable.isActiveDraggable }}
    >
      {props.id}
    </div>
  );
}

function Response(props) {
  const droppable = createDroppable("response");
  return (
    <div use:droppable class="bg-red min-h-20 flex flex-wrap gap-x-1 gap-y-2">
      <SortableProvider ids={props.items}>
        <For each={props.items}>{(item) => <Item id={item}></Item>}</For>
      </SortableProvider>
    </div>
  );
}

function Bank(props) {
  const droppable = createDroppable("bank");
  return (
    <div use:droppable class="bg-blue min-h-20 flex flex-wrap gap-x-1 gap-y-2">
      <SortableProvider ids={props.items}>
        <For each={props.items}>{(item) => <Item id={item}></Item>}</For>
      </SortableProvider>
    </div>
  );
}

export default function FreeResponse() {
  const [containers, setContainers] = createStore({
    response: [],
    bank: ["Are", "Nice", "Hi", "to", "How", "meet", "you"],
  });

  const onDragOver: DragEventHandler = ({ draggable, droppable }) => {
    if (!draggable || !droppable) return;
    move(draggable, droppable);
  };

  const isContainer = (id) => id === "bank" || id === "response";
  const getContainer = (id) =>
    containers["bank"].includes(id) ? "bank" : "response";

  const move = (draggable, droppable) => {
    if (draggable.id === droppable.id) return;
    const dragCon = getContainer(draggable.id);
    const dropCon = isContainer(droppable.id)
      ? droppable.id
      : getContainer(droppable.id);

    let i = containers[dropCon].indexOf(droppable.id);
    if (i === -1) i = containers[dropCon].length;

    batch(() => {
      setContainers(dragCon, (ids) => ids.filter((id) => id !== draggable.id));
      setContainers(dropCon, (ids) => [
        ...ids.slice(0, i),
        draggable.id,
        ...ids.slice(i),
      ]);
    });
  };

  const closestContainerOrItem = (draggable, droppables, context) => {
    const closestContainer = closestCenter(
      draggable,
      droppables.filter((droppable) => isContainer(droppable.id)),
      context
    );
    if (!closestContainer) return;
    const containerItemIds = containers[closestContainer.id];
    const filtered = droppables.filter((droppable) =>
      containerItemIds.includes(droppable.id)
    );
    const closestItem = closestCenter(draggable, filtered, context);
    if (!closestItem) {
      return closestContainer;
    }

    if (getContainer(draggable.id) !== closestContainer.id) {
      const isLastItem =
        containerItemIds.indexOf(closestItem.id as number) ===
        containerItemIds.length - 1;

      if (isLastItem) {
        const belowLastItem =
          draggable.transformed.center.x > closestItem.transformed.center.x;

        if (belowLastItem) {
          return closestContainer;
        }
      }
    }

    return closestItem;
  };

  function LogicWrapper() {
    const [_, { recomputeLayouts }] = useDragDropContext();
    createEffect(
      on(
        [() => containers.bank, () => containers.response],
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
        collisionDetector={closestContainerOrItem}
        onDragOver={onDragOver}
      >
        <LogicWrapper />
        <DragDropSensors />
        <Response items={containers["response"]} />
        <Bank items={containers["bank"]} />
        <DragOverlay>
          {(draggable) => (
            <div class={buttonVariants({ variant: "line", element: "block" })}>
              {draggable.id}
            </div>
          )}
        </DragOverlay>
      </DragDropProvider>
    </div>
  );
}
