import { Users } from '@prisma/client';

export const randomGroups = (userList, groupSize, groups, setGroups) => {
  const tempGroups = groups.filter((g) => g.id !== 'UNGROUPED');
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
  const newGroupData: typeof tempGroups.data = [];

  // If there are no defined groups, create all new groups
  if (!tempGroups) {
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
    console.log(tempGroups.length, i, newGroups.length);
    if (tempGroups.length > i) {
      newGroupData.push({
        id: tempGroups[i].id,
        title: `Group ${i}`,
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
  setGroups([
    {
      id: 'UNGROUPED',
      title: 'Ungrouped students',
      participants: [],
    },
    ...newGroupData,
  ]);
  return;
};
