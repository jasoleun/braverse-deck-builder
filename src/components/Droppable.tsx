import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mantine/core";

export function Droppable(props: any) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <Box
      ref={setNodeRef}
      flex={1}
    >
      {props.children}
    </Box>
  );
}
