import { Storage } from "./storage";

export const authService = {
  login(username, password) {
    const users = Storage.get("users", []);

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return { success: false, message: "Invalid username or password" };
    }

    if (!user.approved) {
      return { success: false, message: "Your account is awaiting admin approval" };
    }

    return { success: true, user };
  },

  register({ username, password, role }) {
    const users = Storage.get("users", []);

    if (users.some((u) => u.username === username)) {
      return { success: false, message: "Username already exists" };
    }

    const newUser = {
      id: Date.now(),
      username,
      password,
      role,
      approved: false, // MUST be approved by admin
      profile: {},
    };

    users.push(newUser);
    Storage.set("users", users);

    return { success: true, message: "Registration submitted. Awaiting admin approval." };
  }
};
