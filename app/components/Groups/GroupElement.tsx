import { useEffect, useRef, useState } from 'react';
import { GroupState } from './GroupContainer';
import {
  attachClosestEdge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { Users } from '@prisma/client';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';

const idle: GroupState = { type: 'idle' };

export const GroupElement = ({ userInfo }: { userInfo: Users }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<GroupState>(idle);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      throw new Error('Ref not set correctly');
    }

    return combine(
      draggable({
        element: element,
        getInitialData() {
          return userInfo;
        },
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: '16px',
              y: '8px',
            }),
            render({ container }) {
              setState({ type: 'preview', container });
            },
          });
        },
        onDragStart() {
          setState({ type: 'is-dragging' });
        },
        onDrop() {
          setState(idle);
        },
      }),
      dropTargetForElements({
        element: element,
        canDrop({ source }) {
          if (source.element === element) {
            return false;
          }
          return source.data.email !== undefined;
        },
        getData({ input }) {
          const data = userInfo;
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ['left', 'right'],
          });
        },
        getIsSticky() {
          return true;
        },
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setState({ type: 'is-dragging-over', closestEdge });
        },
        onDrag({ self }) {
          const closestEdge = extractClosestEdge(self.data);

          // Only need to update react state if nothing has changed.
          // Prevents re-rendering.
          setState((current) => {
            if (
              current.type === 'is-dragging-over' &&
              current.closestEdge === closestEdge
            ) {
              return current;
            }
            return { type: 'is-dragging-over', closestEdge };
          });
        },
        onDragLeave() {
          setState(idle);
        },
        onDrop() {
          setState(idle);
        },
      })
    );
  }, []);

  return (
    <div
      className="relative m-1 gap-2 rounded-sm bg-gray-100 px-2 shadow-md"
      ref={ref}
    >
      <div className="text-bold text-gray-800">{userInfo.username}</div>
      {state['closestEdge'] && (
        <DropIndicator edge={state['closestEdge']} gap="0.5rem" />
      )}
    </div>
  );
};
