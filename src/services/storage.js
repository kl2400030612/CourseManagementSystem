// services/storage.js - Safe wrapper for localStorage

export const Storage = {
  get(key, defaultValue = null) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return defaultValue;
      return JSON.parse(raw);
    } catch (err) {
      console.error(`Storage GET failed for key "${key}":`, err);
      localStorage.removeItem(key);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`Storage SET failed for key "${key}":`, err);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`Storage REMOVE failed for key "${key}":`, err);
    }
  }
};
