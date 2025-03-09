import { useMutation, useQuery } from '@tanstack/react-query';
import { getAppSession } from '../Navbar';
import {
  createGroups,
  createGroupsType,
  getActivityUsers,
  getGroupInfo,
} from '../../util/databaseFunctions';
import { useEffect, useRef, useState } from 'react';
import { Users } from '@prisma/client';
import { GroupList } from './GroupList';
import { randomGroups } from './randomGroups';

export const EditGroups = ({ activityID }: { activityID: string }) => {
  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => getAppSession(),
  }).data;

  const users = useQuery({
    queryKey: ['activity', activityID, 'userList'],
    queryFn: () => getActivityUsers(activityID),
  });

  const groupInfo = useQuery({
    queryKey: ['activity', activityID, 'groups'],
    queryFn: () => getGroupInfo(activityID),
  });

  console.log('GROUP DATA', groupInfo.data);

  const userList = users.data;
  console.log('User list', userList);
  const [groups, setGroups] = useState(groupInfo.data);
  const [groupSize, setGroupSize] = useState(2);

  useEffect(() => {
    setGroups(groupInfo.data);
  }, [groupInfo.data]);

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

  console.log('Groups', groups);

  return (
    <div className="text-black">
      <div>
        <div>Group size: {groupSize}</div>
        <button
          className="cursor-pointer bg-gray-300 hover:bg-gray-200"
          onClick={() => randomGroups(userList, groupSize, groups, setGroups)}
        >
          Random Groups
        </button>
        <button
          className="cursor-pointer bg-gray-300 hover:bg-gray-200"
          onClick={() => saveGroups()}
        >
          Save groups
        </button>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-1 p-1">
          Users
          {users.data?.map((u) => (
            <div key={u.email} className="my-0.5 rounded-md bg-gray-100 px-1">
              {u.email}
            </div>
          ))}
        </div>
        <div className="col-span-2 p-1">
          {groups ? (
            <GroupList groups={groups} activityID={activityID} />
          ) : (
            <div>Loading Groups</div>
          )}
          {groups?.map((v) => (
            <div key={v.id} className="my-1 rounded-sm bg-gray-100 p-0.5">
              <div className="text-lg">{v.title}</div>
              <div>
                {v.participants.map((p) => (
                  <div
                    key={p.email}
                    className="m-0.5 rounded-md bg-gray-200 px-1"
                  >
                    {p.email}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
