import { nanoid } from 'nanoid';

import { readUsers, writeUsers } from './storage/users';

const USERS =
  readUsers() ||
  Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
    name: `User${i + 1}`,
    email: `user${i + 1}@mail.com`,
    active: Math.random() > 0.3,
  }));

export async function getUsers() {
  return USERS;
}

export async function getUser(id) {
  const user = USERS.find(u => u.id === id);

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

  USERS.push(newUser);
  writeUsers(USERS);

  return newUser;
}
