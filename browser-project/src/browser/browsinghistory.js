// src/entities/BrowsingHistory.js
/**
 * Mock BrowsingHistory entity for managing browsing history.
 * Uses localStorage for simplicity; replace with IndexedDB or a backend in production.
 */
const BrowsingHistory = {
  /**
   * Creates a new history entry.
   * @param {Object} entry - History entry { url, title, visit_count, last_visited }
   * @returns {Promise<void>}
   */
  async create(entry) {
    try {
      const history = JSON.parse(localStorage.getItem("browsingHistory") || "[]");
      history.push({ id: Date.now(), ...entry });
      localStorage.setItem("browsingHistory", JSON.stringify(history));
    } catch (error) {
      throw new Error(`Failed to create history entry: ${error.message}`);
    }
  },

  /**
   * Filters history entries by URL.
   * @param {Object} filter - Filter object { url }
   * @returns {Promise<Array>}
   */
  async filter({ url }) {
    try {
      const history = JSON.parse(localStorage.getItem("browsingHistory") || "[]");
      return history.filter((entry) => entry.url === url);
    } catch (error) {
      throw new Error(`Failed to filter history: ${error.message}`);
    }
  },

  /**
   * Updates a history entry by ID.
   * @param {number} id - Entry ID
   * @param {Object} updates - Updates to apply
   * @returns {Promise<void>}
   */
  async update(id, updates) {
    try {
      const history = JSON.parse(localStorage.getItem("browsingHistory") || "[]");
      const index = history.findIndex((entry) => entry.id === id);
      if (index !== -1) {
        history[index] = { ...history[index], ...updates };
        localStorage.setItem("browsingHistory", JSON.stringify(history));
      }
    } catch (error) {
      throw new Error(`Failed to update history: ${error.message}`);
    }
  },

  /**
   * Clears all history entries (optional for reset functionality).
   * @returns {Promise<void>}
   */
  async clear() {
    try {
      localStorage.removeItem("browsingHistory");
    } catch (error) {
      throw new Error(`Failed to clear history: ${error.message}`);
    }
  },
};

export { BrowsingHistory };