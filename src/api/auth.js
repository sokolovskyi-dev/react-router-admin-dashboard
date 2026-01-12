const KEY = 'demo-session';

export function getSession() {
  const raw = localStorage.getItem(KEY);

  return raw ? JSON.parse(raw) : null;
}

export function createSession(session) {
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(KEY);
}
