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

  console.log('Groups', groups);

  return (
    <div className="flex flex-col text-black">
      <div className="">
        <div className="p-1">
          {groups ? (
            <GroupList groups={groups} activityID={activityID} />
          ) : (
            <div>Loading Groups</div>
          )}
        </div>
      </div>
    </div>
  );
};
