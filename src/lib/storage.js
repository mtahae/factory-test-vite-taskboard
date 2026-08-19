import { seedTasks } from "./seed.js";

const STORAGE_KEY = "sprintboard.tasks.v1";

export function loadTasks() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedTasks;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedTasks;
  } catch {
    return seedTasks;
  }
}

export function saveTasks(tasks) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch {
    // Storage can be unavailable in private browsing; the board still works
    // for the current session.
  }
}
