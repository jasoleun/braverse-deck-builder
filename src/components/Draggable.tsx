import { useDraggable } from "@dnd-kit/core";
import { Image } from "@mantine/core";

export function Draggable(props: any) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
    data: {
      image: props.image,
      lookupId: props.lookupId,
      from: props.from,
      onclick: props.onclick
    },
  });

  return (
    <Image
      src={props.image}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={props.onclick}
    />
  );
}
