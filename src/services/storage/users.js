const KEY = 'users';

export function readUsers() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function writeUsers(users) {
  localStorage.setItem(KEY, JSON.stringify(users));
  return users;
}

export function addUser(newUser) {
  const existingUsers = readUsers();
  const nextUsers = [...existingUsers, newUser];
  return writeUsers(nextUsers);
}
