import { Users } from '@prisma/client';

export const randomGroups = (
  userList,
  groupSize,
  groups,
  setGroups
) => {
  console.log('Start random');
  if (!userList) {
    console.log('Users not found');
    return undefined;
  }
  const tempUsers = [...userList.filter((u) => u.type == 'Student')];

  const numGroups = Math.ceil(tempUsers.length / groupSize);
  const newGroups: Users[][] = [];
  for (let i = 0; i < numGroups; i++) {
    const tempGroup: Users[] = [];
    for (let j = 0; j < groupSize; j++) {
      const num = Math.floor(Math.random() * tempUsers.length);
      if (tempUsers.length > 0) {
        const tempUser = tempUsers[num];
        tempGroup.push(tempUser);
        tempUsers.splice(num, 1);
      }
    }
    newGroups.push(tempGroup);
  }
  const newGroupData: typeof groups.data = [];

  // If there are no defined groups, create all new groups
  if (!groups) {
    for (let i = 0; i < newGroups.length; i++) {
      newGroupData.push({
        id: crypto.randomUUID(),
        title: `Group ${i}`,
        participants: newGroups[i],
      });
    }
    setGroups(newGroupData);
    return;
  }

  // If there are some groups, re-use them
  for (let i = 0; i < newGroups.length; i++) {
    console.log(groups.length, i, newGroups.length);
    if (groups.length > i) {
      newGroupData.push({
        id: groups[i].id,
        title: groups[i].title,
        participants: newGroups[i],
      });
    } else {
      newGroupData.push({
        id: crypto.randomUUID(),
        title: `Group ${i}`,
        participants: newGroups[i],
      });
    }
  }
  setGroups(newGroupData);
  return;
};
