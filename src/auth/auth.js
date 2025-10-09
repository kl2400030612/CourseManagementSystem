// src/auth/auth.js

export const users = {
  admin: { username: 'admin', password: 'admin', role: 'admin' },
  student: { username: 'student', password: 'student', role: 'student' },
};

export function authenticate(username, password) {
  const user = users[username];
  return user && user.password === password ? user : null;
}
