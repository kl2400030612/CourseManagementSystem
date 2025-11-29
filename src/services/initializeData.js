import { Storage } from "./storage";

export function initializeData() {
  // Create default ADMIN if not exists
  const users = Storage.get("users", []);

  if (!users.some(u => u.username === "admin")) {
    users.push({
      id: Date.now(),
      username: "admin",
      password: "admin",
      role: "admin",
      approved: true, // admin always approved
      profile: {}
    });
    Storage.set("users", users);
  }
  console.log("Default admin user ensured.", users);

  // Initialize empty collections if not present
  if (!Storage.get("courses")) Storage.set("courses", []);
  if (!Storage.get("enrollments")) Storage.set("enrollments", []);
}
