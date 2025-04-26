import { useSortable } from '@dnd-kit/react/sortable';
import { DragHandle } from './DragHandle';

export const GroupElement = ({
  userId: userID,
  index,
  column,
  children,
}: {
  userId: string;
  index: number;
  column: string;
  children: any;
}) => {
  const { ref, isDragging } = useSortable({
    id: userID,
    index,
    type: 'user',
    accept: 'user',
    group: column,
  });

  return (
    <button
      ref={ref}
      data-dragging={isDragging}
      className="relative m-1 gap-2 rounded-sm bg-gray-100 ps-2 shadow-md"
    >
      <div className="text-bold flex cursor-pointer flex-row align-middle text-gray-800">
        <div className="flex">{children}</div>
        <DragHandle />
      </div>
    </button>
  );
};
