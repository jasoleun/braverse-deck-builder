import { useDraggable } from "@dnd-kit/core";
import { Image } from "@mantine/core";

export function Draggable(props: any) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
    data: {
      image: props.image,
      lookupId: props.lookupId,
      index: props.index,
    },
  });

  return (
    <Image
      src={"/braverse-deck-builder/cards/" + props.image}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    />
  );
}
