import { CollisionPriority } from '@dnd-kit/abstract';
import { useSortable } from '@dnd-kit/react/sortable';
import { RestrictToVerticalAxis } from '@dnd-kit/abstract/modifiers';
import { RestrictToElement } from '@dnd-kit/dom/modifiers';

export const GroupContainer = ({ children, id, index }) => {
  const { ref } = useSortable({
    id,
    index,
    type: id === 'UNSORTED' ? 'unsorted' : 'group',
    collisionPriority: CollisionPriority.Low,
    accept: id === 'UNSORTED' ? ['user'] : ['user', 'group'],
    modifiers: [RestrictToVerticalAxis, RestrictToElement],
  });
  return (
    <div ref={ref} className={`flex min-h-14 flex-col bg-gray-200 shadow-md`}>
      {children}
    </div>
  );
};
