import { getUsers } from './users';

export async function getStats() {
  const users = await getUsers();
  const totalUsers = users.length;
  const totalActiveUsers = [...users].filter(u => u.active).length;
  return { usersTotal: totalUsers, activeUsers: totalActiveUsers, lastSyncAt: Date.now() };
}

export async function getRecentEvents() {
  await new Promise(r => setTimeout(r, 800));
  const now = Date.now();
  return Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
    text: [
      'User created',
      'User updated',
      'User deactivated',
      'User activated',
      'Profile edited',
      'Password changed',
      'Login successful',
      'Login failed',
      'Role updated',
      'User deleted',
    ][i % 10],
    at: now - i * 1000 * 60 * 5,
  }));
}
