import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { GroupContainer } from './GroupContainer';
import { UserGroups, Users } from '@prisma/client';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { triggerPostMoveFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash';
import { randomGroups } from './randomGroups';
import { useQuery } from '@tanstack/react-query';
import { getActivityUsers, getGroupInfo } from '../../util/databaseFunctions';

export const GroupList = ({ groups, activityID }) => {
  const [tempGroups, setTempGroups] = useState<
    (UserGroups & { participants: Users[] })[] | undefined
  >(groups);

  const users = useQuery({
    queryKey: ['activity', activityID, 'userList'],
    queryFn: () => getActivityUsers(activityID),
  });

  const userList = users.data;
  console.log('User list', userList);
  const [groupSize, setGroupSize] = useState(2);

  console.log('Groups', groups);

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        // return isTaskData(source.data);
        return true;
      },
      onDrop({ location, source }) {
        console.log('LOCATION', location);
        console.log('SOURCE', source);
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;
        console.log('Source', source);
        console.log('Target', target);

        if (!tempGroups) {
          return;
        }
        // if (!isTaskData(sourceData) || !isTaskData(targetData)) {
        //   return;
        // }
        if (source.data.title !== undefined) {
          const indexOfSource = tempGroups.findIndex(
            (group) => group.id === sourceData.id
          );
          const indexOfTarget = tempGroups.findIndex(
            (group) => group.id === targetData.id
          );

          if (indexOfTarget < 0 || indexOfSource < 0) {
            return;
          }

          const closestEdgeOfTarget = extractClosestEdge(targetData);

          // Using `flushSync` so we can query the DOM straight after this line
          flushSync(() => {
            setTempGroups(
              reorderWithEdge({
                list: tempGroups,
                startIndex: indexOfSource,
                indexOfTarget,
                closestEdgeOfTarget,
                axis: 'vertical',
              })
            );
          });
          // Being simple and just querying for the task after the drop.
          // We could use react context to register the element in a lookup,
          // and then we could retrieve that element after the drop and use
          // `triggerPostMoveFlash`. But this gets the job done.
          const element = document.querySelector(
            `[data-task-id="${sourceData.id}"]`
          );
          if (element instanceof HTMLElement) {
            triggerPostMoveFlash(element);
          }
        } else if (source.data.email !== undefined) {
          const sourceColumnIndex = tempGroups.findIndex(
            (group) =>
              group.participants
                .map((u) => u.email)
                .findIndex(
                  (email) => email === (source.data.email as string)
                ) !== -1
          );
          const sourceColumn = tempGroups[sourceColumnIndex].id;
          console.log(
            'Groups data',
            source.data.email,
            tempGroups.map((group) => group.participants.map((u) => u.email))
          );

          // Check if target is a group or another element
          if (target.data.id !== undefined) {
            const targetColumnIndex = tempGroups.findIndex(
              (group) => group.id === target.data.id
            );
            if (sourceColumnIndex < 0 || targetColumnIndex < 0) {
              return;
            }

            const indexOfSource = tempGroups[
              sourceColumnIndex
            ].participants.findIndex((user) => user.email === sourceData.email);
            const tempUser = tempGroups[sourceColumnIndex].participants.splice(
              indexOfSource,
              1
            )[0];

            let newTempGroups = tempGroups.map((v) => ({
              id: v.id,
              title: v.title,
              participants:
                v.id === sourceColumn
                  ? v.participants.filter((u) => u.email !== source.data.email)
                  : v.participants,
            }));
            newTempGroups = newTempGroups.map((v) => ({
              id: v.id,
              title: v.title,
              participants:
                v.id === target.data.id
                  ? [...v.participants, tempUser]
                  : v.participants,
            }));
            setTempGroups(newTempGroups);
          } else {
            const targetColumnIndex = tempGroups.findIndex(
              (group) =>
                group.participants
                  .map((u) => u.email)
                  .findIndex(
                    (email) => email === (target.data.email as string)
                  ) !== -1
            );
            const targetColumn = tempGroups[targetColumnIndex].id;
            console.log('data', sourceColumnIndex, targetColumnIndex);
            if (sourceColumnIndex < 0 || targetColumnIndex < 0) {
              return;
            }

            const indexOfSource = tempGroups[
              sourceColumnIndex
            ].participants.findIndex((user) => user.email === sourceData.email);
            const indexOfTarget = tempGroups[
              targetColumnIndex
            ].participants.findIndex((user) => user.email === targetData.email);

            console.log(
              'data',
              indexOfSource,
              indexOfTarget,
              sourceColumnIndex,
              targetColumnIndex
            );
            if (indexOfTarget < 0 || indexOfSource < 0) {
              return;
            }

            const closestEdgeOfTarget = extractClosestEdge(targetData);

            const tempUser = tempGroups[sourceColumnIndex].participants.splice(
              indexOfSource,
              1
            )[0];
            console.log('temp groups', tempGroups);
            const moveColumn = () => {
              let newTempGroups = tempGroups.map((v) => ({
                id: v.id,
                title: v.title,
                participants:
                  v.id === sourceColumn
                    ? v.participants.filter(
                        (u) => u.email !== source.data.email
                      )
                    : v.participants,
              }));
              newTempGroups = newTempGroups.map((v) => ({
                id: v.id,
                title: v.title,
                participants:
                  v.id === targetColumn
                    ? reorderWithEdge({
                        list: [...v.participants, tempUser],
                        startIndex: v.participants.length,
                        indexOfTarget:
                          sourceColumn === targetColumn &&
                          indexOfSource < indexOfTarget
                            ? indexOfTarget - 1
                            : indexOfTarget,
                        closestEdgeOfTarget: closestEdgeOfTarget,
                        axis: 'vertical',
                      })
                    : v.participants,
              }));
              return newTempGroups;
            };

            console.log('STUFF');
            console.log(moveColumn());
            console.log('S, T:', sourceColumn, targetColumn);
            console.log(moveColumn()[targetColumnIndex]);

            flushSync(() => {
              setTempGroups(moveColumn());
            });
            console.log('AFTER', tempGroups);
            // Being simple and just querying for the task after the drop.
            // We could use react context to register the element in a lookup,
            // and then we could retrieve that element after the drop and use
            // `triggerPostMoveFlash`. But this gets the job done.
            const element = document.querySelector(
              `[data-task-id="${sourceData.id}"]`
            );
            if (element instanceof HTMLElement) {
              triggerPostMoveFlash(element);
            }
          }
        }
      },
    });
  }, [tempGroups]);

  console.log('Temp groups', tempGroups);
  return (
    <div className="mx-auto my-0 w-[420px] pt-6">
      <button
        className="cursor-pointer bg-gray-300 hover:bg-gray-200"
        onClick={() =>
          randomGroups(userList, groupSize, tempGroups, setTempGroups)
        }
      >
        Random Groups
      </button>
      <div className="flex flex-col gap-2 rounded border border-solid p-2">
        {tempGroups?.map((groupInfo) => (
          <GroupContainer key={groupInfo.id} groupInfo={groupInfo} />
        ))}
      </div>
    </div>
  );
};
