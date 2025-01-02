export const storage = {
  get: async <T>(key: string): Promise<T | null> => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      return new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
          resolve(result[key] || null);
        });
      });
    } else {
      // Fallback to localStorage for development
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  },
  set: async <T>(key: string, value: T): Promise<void> => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: value }, resolve);
      });
    } else {
      // Fallback to localStorage for development
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
};
