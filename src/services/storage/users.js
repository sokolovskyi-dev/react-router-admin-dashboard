const KEY = 'users';

export function readUsers() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeUsers(users) {
  localStorage.setItem(KEY, JSON.stringify(users));
}
