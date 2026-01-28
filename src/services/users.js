import { nanoid } from 'nanoid';

import { addUser, readUsers, writeUsers } from './storage/users';

const existing = readUsers();
if (existing.length === 0) {
  writeUsers(
    Array.from({ length: 20 }, (_, i) => ({
      id: String(i + 1),
      name: `User${i + 1}`,
      email: `user${i + 1}@mail.com`,
      active: Math.random() > 0.3,
    }))
  );
}

export async function getUsers() {
  return readUsers();
}

export async function getUser(id) {
  const users = readUsers();
  const user = users.find(u => u.id === id);

  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  return user;
}

export async function createUser(payload) {
  const { name, email } = payload;
  const id = nanoid();

  if (!name || !email) {
    throw new Error('createUser: invalid payload');
  }

  const newUser = {
    id,
    name,
    email,
    active: false,
  };

  addUser(newUser);

  return newUser;
}

export async function updateUser(id, patch) {
  const users = await getUsers();
  const user = users.find(u => u.id === id);
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  const updatedUser = { ...user, ...patch };

  const nextUsers = users.map(user => (user.id === id ? updatedUser : user));
  writeUsers(nextUsers);

  return updatedUser;
}

export function validateUser({ name, email }) {
  return {
    name: name ? null : 'Name is required',
    email: email ? null : 'Email is required',
  };
}
