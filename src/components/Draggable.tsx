import {useDraggable} from '@dnd-kit/core';

export function Draggable(props: any) {
  const {attributes, listeners, setNodeRef} = useDraggable({
    id: props.id,
    data: {
      lookupId: props.lookupId,
      from: props.from,
    },

  });
  
  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
}