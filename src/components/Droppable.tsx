import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mantine/core";

export function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: {
      accepts: props.accepts,
    },
  });

  return (
    <Box
      flex={1}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      ref={setNodeRef}
      bg={isOver ? "green" : "transparent"}
    >
      {props.children}
    </Box>
  );
}
