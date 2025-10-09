// Example from your auth.js
export function authenticate(username, password) {
  const users = [
    { username: 'admin', password: 'admin', role: 'admin' },
    { username: 'student', password: 'student', role: 'student' },
  ];

  const user = users.find(u => u.username === username && u.password === password);
  return user || null;
}
