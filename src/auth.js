// src/auth.js

export const users = {
  admin: {
    username: 'admin',
    password: 'admin',
    role: 'admin',
  },
  student: {
    username: 'student',
    password: 'student',
    role: 'student',
  },
};

export function authenticate(username, password) {
  const user = users[username];
  if (user && user.password === password) {
    return user;
  }
  return null;
}
