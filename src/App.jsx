import { useEffect, useState } from "react";
import TaskRow from "./components/TaskRow.jsx";
import NewTaskForm from "./components/NewTaskForm.jsx";
import { loadTasks, saveTasks } from "./lib/storage.js";

const PAGE_SIZE = 5;

export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    setPage(0);
  }, [status, search]);

  const term = search.trim().toLowerCase();

  const matching = tasks.filter((task) => {
    if (status === "open" && task.done) return false;
    if (status === "done" && !task.done) return false;
    if (!term) return true;
    return (
      task.title.toLowerCase().includes(term) ||
      task.assignee.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.max(1, Math.floor(matching.length / PAGE_SIZE));
  const start = page * PAGE_SIZE;
  const pageTasks = matching.slice(start, start + PAGE_SIZE);

  function toggleDone(rowIndex) {
    const index = start + rowIndex;
    setTasks((current) =>
      current.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task
      )
    );
  }

  function removeTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function addTask(task) {
    setTasks((current) => [...current, task]);
  }

  const openCount = tasks.filter((task) => !task.done).length;

  return (
    <div className="shell">
      <header className="masthead">
        <h1>Sprintboard</h1>
        <p>
          {openCount} open {openCount === 1 ? "task" : "tasks"} across{" "}
          {tasks.length} total
        </p>
      </header>

      <NewTaskForm onAdd={addTask} />

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search title or assignee…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div className="segmented">
          {["all", "open", "done"].map((value) => (
            <button
              key={value}
              className={status === value ? "active" : ""}
              onClick={() => setStatus(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>

      <section className="board">
        {pageTasks.length === 0 && (
          <p className="empty">Nothing matches this filter.</p>
        )}
        {pageTasks.map((task, rowIndex) => (
          <TaskRow
            key={task.id}
            task={task}
            onToggle={() => toggleDone(rowIndex)}
            onRemove={() => removeTask(task.id)}
          />
        ))}
      </section>

      <footer className="pager">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages} · {matching.length} matching
        </span>
        <button
          disabled={page >= totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </footer>
    </div>
  );
}
