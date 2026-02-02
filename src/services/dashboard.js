import { getUsers } from './users';

export async function getStats() {
  const users = await getUsers();
  const totalUsers = users.length;
  const totalActiveUsers = [...users].filter(u => u.active).length;
  return { usersTotal: totalUsers, activeUsers: totalActiveUsers, lastSyncAt: Date.now() };
}
