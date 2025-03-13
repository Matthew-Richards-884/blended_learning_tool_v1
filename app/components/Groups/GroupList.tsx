import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';
import { GroupContainer } from './GroupContainer';
import { UserGroups, Users } from '@prisma/client';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { triggerPostMoveFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash';
import { randomGroups } from './randomGroups';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createGroups,
  createGroupsType,
  getActivityUsers,
  getGroupInfo,
} from '../../util/databaseFunctions';

const UNGROUPED = 'UNGROUPED';

export const GroupList = ({ groups, activityID }) => {
  const [tempGroups, setTempGroups] = useState<
    (UserGroups & { participants: Users[] })[] | undefined
  >(groups);
  const [ungrouped, setUngrouped] = useState<
    (UserGroups & { participants: Users[] }) | undefined
  >({ id: UNGROUPED, title: 'Ungrouped students', participants: [] });

  const createGroupsMutation = useMutation({
    mutationFn: (groups: createGroupsType) => createGroups(groups),
  });

  const saveGroups = async () => {
    if (!groups) {
      return;
    }
    await createGroupsMutation.mutateAsync(
      groups.map((v) => ({
        ...v,
        participants: {
          connect: v.participants.map((u) => ({ email: u.email })),
        },
      }))
    );
  };

  useEffect(() => {
    if (
      users.data &&
      tempGroups &&
      ungrouped &&
      ungrouped.participants.length <= 1
    ) {
      setUngrouped({
        id: UNGROUPED,
        title: 'Ungrouped students',
        participants: users.data.filter(
          (u) =>
            tempGroups
              .flatMap((v) => v.participants.map((i) => i.email))
              .includes(u.email) === false && u.type === 'Student'
        ),
      });
    }
  }, [tempGroups]);

  const users = useQuery({
    queryKey: ['activity', activityID, 'userList'],
    queryFn: () => getActivityUsers(activityID),
  });

  const userList = users.data;
  console.log('User list', userList);
  const [groupSize, setGroupSize] = useState(2);

  console.log('Groups', groups);

  const removeUngrouped = (
    groupList: (UserGroups & { participants: Users[] })[]
  ) => {
    setUngrouped(groupList.find((g) => g.id === UNGROUPED));
    return groupList.filter((g) => g.id !== UNGROUPED);
  };

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

        if (!tempGroups || !users.data) {
          return;
        }

        /**
         * Both the ungrouped users and the groups
         */
        const combinedTempGroups = [
          ungrouped
            ? ungrouped
            : {
                id: UNGROUPED,
                title: 'Ungrouped students',
                participants: [],
              },
          ...tempGroups,
        ];
        // if (!isTaskData(sourceData) || !isTaskData(targetData)) {
        //   return;
        // }
        if (source.data.title !== undefined) {
          const indexOfSource = combinedTempGroups.findIndex(
            (group) => group.id === sourceData.id
          );
          const indexOfTarget = combinedTempGroups.findIndex(
            (group) => group.id === targetData.id
          );

          if (indexOfTarget < 0 || indexOfSource < 0) {
            return;
          }

          const closestEdgeOfTarget = extractClosestEdge(targetData);

          // Using `flushSync` so we can query the DOM straight after this line
          flushSync(() => {
            setTempGroups(
              removeUngrouped(
                reorderWithEdge({
                  list: combinedTempGroups,
                  startIndex: indexOfSource,
                  indexOfTarget,
                  closestEdgeOfTarget,
                  axis: 'vertical',
                })
              )
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
          const sourceColumnIndex = combinedTempGroups.findIndex(
            (group) =>
              group.participants
                .map((u) => u.email)
                .findIndex(
                  (email) => email === (source.data.email as string)
                ) !== -1
          );

          const sourceColumn = combinedTempGroups[sourceColumnIndex].id;
          console.log(
            'Groups data',
            source.data.email,
            combinedTempGroups.map((group) =>
              group.participants.map((u) => u.email)
            )
          );

          // Check if target is a group or another element
          if (target.data.id !== undefined) {
            const targetColumnIndex = combinedTempGroups.findIndex(
              (group) => group.id === target.data.id
            );
            if (sourceColumnIndex < 0 || targetColumnIndex < 0) {
              return;
            }

            const indexOfSource = combinedTempGroups[
              sourceColumnIndex
            ].participants.findIndex((user) => user.email === sourceData.email);
            const tempUser = combinedTempGroups[
              sourceColumnIndex
            ].participants.splice(indexOfSource, 1)[0];

            let newTempGroups = combinedTempGroups.map((v) => ({
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
            setTempGroups(removeUngrouped(newTempGroups));
          } else {
            const targetColumnIndex = combinedTempGroups.findIndex(
              (group) =>
                group.participants
                  .map((u) => u.email)
                  .findIndex(
                    (email) => email === (target.data.email as string)
                  ) !== -1
            );
            const targetColumn = combinedTempGroups[targetColumnIndex].id;
            console.log('data', sourceColumnIndex, targetColumnIndex);
            if (sourceColumnIndex < 0 || targetColumnIndex < 0) {
              return;
            }

            const indexOfSource = combinedTempGroups[
              sourceColumnIndex
            ].participants.findIndex((user) => user.email === sourceData.email);
            const indexOfTarget = combinedTempGroups[
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

            const tempUser = combinedTempGroups[
              sourceColumnIndex
            ].participants.splice(indexOfSource, 1)[0];
            console.log('temp groups', combinedTempGroups);
            const moveColumn = () => {
              let newTempGroups = combinedTempGroups.map((v) => ({
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
                            ? indexOfTarget
                            : indexOfTarget,
                        closestEdgeOfTarget: closestEdgeOfTarget,
                        axis: 'vertical',
                      })
                    : v.participants,
              }));
              return newTempGroups;
            };

            flushSync(() => {
              setTempGroups(removeUngrouped(moveColumn()));
            });
            console.log('AFTER', combinedTempGroups);
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
  console.log(
    'Mapped',
    tempGroups?.flatMap((v) => v.participants.map((i) => i.email))
  );
  console.log(
    UNGROUPED,
    users.data?.filter(
      (u) =>
        tempGroups
          ?.flatMap((v) => v.participants.map((i) => i.email))
          .includes(u.email) === false
    )
  );
  return (
    <div>
      <div className="p-1">
        Unassigned Users
        <div className="grid">
          {users.data && tempGroups && ungrouped ? (
            <GroupContainer groupInfo={ungrouped} />
          ) : (
            <div>Loading users</div>
          )}
        </div>
      </div>
      <div className="mx-auto my-0 pt-6">
        <div className='flex flex-row mb-2'>
          <div>
            <label>Group Size</label>
            <input
              type="number"
              onChange={(v) => setGroupSize(v.currentTarget.valueAsNumber)}
              value={groupSize}
              className="mx-0.5 rounded-sm bg-gray-100 px-1 shadow-md w-16"
            />
          </div>
          <button
            className="mx-0.5 cursor-pointer rounded-sm bg-gray-100 px-1 shadow-md hover:bg-gray-200"
            onClick={() => saveGroups()}
          >
            Save groups
          </button>
          <button
            className="mx-0.5 cursor-pointer rounded-sm bg-gray-100 px-1 shadow-md hover:bg-gray-200"
            onClick={() =>
              randomGroups(
                userList,
                groupSize,
                tempGroups,
                setTempGroups,
                setUngrouped
              )
            }
          >
            Random Groups
          </button>
        </div>
        <div className="flex flex-col gap-2 rounded border border-solid p-2">
          {tempGroups?.map((groupInfo) => (
            <GroupContainer key={groupInfo.id} groupInfo={groupInfo} />
          ))}
        </div>
      </div>
    </div>
  );
};
