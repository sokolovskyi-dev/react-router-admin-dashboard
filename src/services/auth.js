import { clearSession, readSession, writeSession } from './storage/session';

export async function getSession() {
  return readSession();
}

export async function login({ email }) {
  if (!email || !email.includes('@')) {
    const error = new Error('Invalid email');
    error.status = 400;
    throw error;
  }
  const session = { user: { email }, createdAt: Date.now() };
  writeSession(session);
  return session;
}

export async function logout() {
  clearSession();
}
