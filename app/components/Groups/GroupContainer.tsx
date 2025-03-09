import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { type HTMLAttributes, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  attachClosestEdge,
  type Edge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { UserGroups, Users } from '@prisma/client';
import { GroupElement } from './GroupElement';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';

export type GroupState =
  | {
      type: 'idle';
    }
  | {
      type: 'preview';
      container: HTMLElement;
    }
  | {
      type: 'is-dragging';
    }
  | {
      type: 'is-dragging-over';
      closestEdge: Edge | null;
    }
  | {
      type: 'is-card-over';
    };

const idle: GroupState = { type: 'idle' };

const newGroup = (id: string): UserGroups => {
  return { id: id, title: 'New Group' };
};

export const GroupContainer = ({
  groupInfo,
}: {
  groupInfo: (UserGroups & { participants: Users[] }) | undefined;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<GroupState>(idle);

  useEffect(() => {
    const element = ref.current;
    const innerElement = innerRef.current;

    if (!element || !innerElement) {
      throw new Error('Ref not set correctly');
    }
    if (!groupInfo) {
      throw new Error('Group not defined');
    }

    return combine(
      draggable({
        element,
        getInitialData() {
          return newGroup(groupInfo.id);
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
        element: innerElement,
        getData: () => ({ id: groupInfo.id }),
        canDrop: ({ source }) => {
          return source.data.email !== undefined;
        },
        getIsSticky: () => true,
        onDragEnter: () => setState({ type: 'is-card-over' }),
        onDragLeave: () => setState(idle),
        onDragStart: () => setState({ type: 'is-card-over' }),
        onDrop: () => setState(idle),
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          // not allowing dropping on yourself
          if (source.element === element) {
            return false;
          }
          return source.data.title !== undefined;
        },
        getData({ input }) {
          const data = newGroup(groupInfo.id);
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ['top', 'bottom'],
          });
        },
        getIsSticky: () => true,
        onDragEnter({ self }) {
          const closestEdge = extractClosestEdge(self.data);
          setState({ type: 'is-dragging-over', closestEdge });
          console.log({ type: 'is-dragging-over', closestEdge });
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
        onDragLeave: () => setState(idle),
        onDrop: () => setState(idle),
      })
    );
  }, []);

  console.log(state['closestEdge']);

  return (
    <div
      className={`rounded-sm ${state.type === 'is-dragging-over' ? 'bg-gray-400' : 'bg-gray-200'} relative ${state.type === 'is-dragging' ? 'bg-gray-300' : 'bg-gray-200'}`}
      ref={ref}
    >
      {groupInfo ? (
        <>
          Drop {groupInfo?.title}
          <div className="min-h-16 rounded-sm bg-gray-300 p-1" ref={innerRef}>
            {groupInfo?.participants.map((e) => (
              <GroupElement key={e.email} userInfo={e} />
            ))}
          </div>
          {state['closestEdge'] && (
            <DropIndicator edge={state['closestEdge']} gap="0.5rem" />
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
