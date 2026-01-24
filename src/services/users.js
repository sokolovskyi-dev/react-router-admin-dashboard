const USERS = Array.from({ length: 20 }, (_, i) => ({
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
