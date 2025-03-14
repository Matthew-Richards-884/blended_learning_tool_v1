import { useState, useEffect, useRef } from 'react';
import { GroupContainer } from './GroupContainer';
import { UserGroups, Users } from '@prisma/client';
import { randomGroups } from './randomGroups';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createGroups,
  createGroupsType,
  getActivityUsers,
} from '../../util/databaseFunctions';
import { DragDropProvider } from '@dnd-kit/react';
import { GroupElement } from './GroupElement';
import { move } from '@dnd-kit/helpers';

const UNGROUPED = 'UNGROUPED';

export const GroupList = ({
  groups,
  activityID,
}: {
  groups: (UserGroups & { participants: Users[] })[];
  activityID: string;
}) => {
  const [tempGroups, setTempGroups] =
    useState<(UserGroups & { participants: Users[] })[]>(groups);
  const [ungrouped, setUngrouped] = useState<
    UserGroups & { participants: Users[] }
  >({ id: UNGROUPED, title: 'Ungrouped students', participants: [] });

  const users = useQuery({
    queryKey: ['activity', activityID, 'userList'],
    queryFn: () => getActivityUsers(activityID),
  });

  const queryClient = useQueryClient();
  const createGroupsMutation = useMutation({
    mutationFn: (groups: createGroupsType) => createGroups(groups),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['activity', activityID, 'groups'],
      });
    },
  });

  const saveGroups = async () => {
    if (!groups) {
      return;
    }
    await createGroupsMutation.mutateAsync({
      activity: activityID,
      groups: Object.entries(groupStrings)
        .filter((g) => g[0] !== UNGROUPED)
        .map((v) => ({
          ...{ id: v[0], title: groupInfo[v[0]] },
          participants: {
            connect: v[1].map((u) => {
              return {
                email: u,
              };
            }),
          },
        })),
    });
  };

  const addGroup = () => {
    const newID = crypto.randomUUID();
    const newGroupString = { ...groupStrings, [newID]: [] };
    setGroupStrings(newGroupString);
    setGroupOrder(Object.keys(newGroupString));
    setGroupInfo({ ...groupInfo, [newID]: 'Untitled Group' });
  };

  useEffect(() => {
    if (
      users.data &&
      tempGroups &&
      ungrouped &&
      ungrouped.participants.length <= 1
    ) {
      setTempGroups([
        ...tempGroups,
        {
          id: UNGROUPED,
          title: 'Ungrouped students',
          participants: users.data.filter(
            (u) =>
              Object.values(tempGroups)
                .flatMap((v) => v.participants.map((i) => i.email))
                .includes(u.email) === false && u.type === 'Student'
          ),
        },
      ]);
    }
  }, [users.isSuccess]);

  const userList = users.data;
  console.log('User list', userList);
  const [groupSize, setGroupSize] = useState(2);

  console.log('Groups', groups);

  const [groupStrings, setGroupStrings] = useState<{ [x: string]: string[] }>(
    {}
  );
  const [groupInfo, setGroupInfo] = useState(
    Object.fromEntries(groups.map((g) => [g.id, g.title]))
  );
  const previousGroups = useRef(groupStrings);
  const [groupOrder, setGroupOrder] = useState(() => Object.keys(groupStrings));

  useEffect(() => {
    setGroupStrings(
      Object.fromEntries(
        tempGroups.map((g) => [g.id, g.participants.map((p) => p.email)])
      )
    );
    setGroupInfo(Object.fromEntries(tempGroups.map((g) => [g.id, g.title])));
  }, [tempGroups]);

  console.log('GROUPS', groupStrings, groupInfo);

  return (
    <div>
      <DragDropProvider
        onDragStart={() => {
          previousGroups.current = groupStrings;
        }}
        onDragOver={(e) => {
          const { source } = e.operation;

          if (source?.type === 'user') {
            setGroupStrings((g) => move(g, e));
          }
          if (source?.type === 'group') {
            setGroupOrder((g) => move(g, e));
          }
        }}
        onDragEnd={(e) => {
          const { source } = e.operation;

          if (e.canceled) {
            if (source?.type === 'user') {
              setGroupStrings(previousGroups.current);
            }

            return;
          }

          if (source?.type === 'group') {
            setGroupOrder((g) => move(g, e));
          }
        }}
      >
        <div className="mx-auto my-0 pt-5.5">
          <div className="mb-2">
            {groupStrings[UNGROUPED] ? (
              <GroupContainer key={UNGROUPED} id={UNGROUPED} index={0}>
                <div className="bg-gray-100 px-1">{groupInfo[UNGROUPED]}</div>
                <div className="bg-gray-200">
                  {groupStrings[UNGROUPED].map((p, i) => (
                    <GroupElement
                      key={p}
                      userId={p}
                      index={i}
                      column={UNGROUPED}
                    >
                      <div className="">
                        {userList?.find((u) => u.email === p)?.username}
                      </div>
                    </GroupElement>
                  ))}
                </div>
              </GroupContainer>
            ) : (
              <div>Loading ungrouped users...</div>
            )}
          </div>
          <div className="mb-2 flex flex-row">
            <div>
              <label>Group Size</label>
              <input
                type="number"
                onChange={(v) => setGroupSize(v.currentTarget.valueAsNumber)}
                value={groupSize}
                className="mx-0.5 w-16 rounded-sm bg-gray-100 px-1 shadow-md"
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
                randomGroups(userList, groupSize, tempGroups, setTempGroups)
              }
            >
              Random Groups
            </button>
            <button
              className="mx-0.5 cursor-pointer rounded-sm bg-gray-100 px-1 shadow-md hover:bg-gray-200"
              onClick={() => addGroup()}
            >
              Add Group
            </button>
          </div>
          <div className="relative flex flex-col gap-1 bg-gray-300 p-2">
            {Object.entries(groupStrings).map(([groupId, userIds], index) => (
              <div key={index}>
                {groupId !== UNGROUPED ? (
                  <GroupContainer key={groupId} id={groupId} index={index}>
                    <div className="bg-gray-100 px-1">
                      <input
                        type="text"
                        value={groupInfo[groupId]}
                        onChange={(v) =>
                          setGroupInfo({
                            ...groupInfo,
                            [groupId]: v.target.value,
                          })
                        }
                      ></input>
                    </div>
                    <div className="bg-gray-200">
                      {userIds.map((p, i) => (
                        <GroupElement
                          key={p}
                          userId={p}
                          index={i}
                          column={groupId}
                        >
                          <div className="">
                            {userList?.find((u) => u.email === p)?.username}
                          </div>
                        </GroupElement>
                      ))}
                    </div>
                  </GroupContainer>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </div>
      </DragDropProvider>
    </div>
  );
};
