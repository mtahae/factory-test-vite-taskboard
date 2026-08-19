import { useState } from "react";

export default function NewTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState("medium");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Give the task a title.");
      return;
    }

    onAdd({
      id: `t-${Date.now()}`,
      title: title.trim(),
      assignee: assignee.trim() || "unassigned",
      priority,
      done: false,
    });

    setTitle("");
    setAssignee("");
    setPriority("medium");
    setError("");
  }

  return (
    <form className="composer" onSubmit={submit}>
      <input
        type="text"
        placeholder="What needs doing?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="text"
        placeholder="Assignee"
        value={assignee}
        onChange={(event) => setAssignee(event.target.value)}
      />
      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
      </select>
      <button className="primary" type="submit">
        Add
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
