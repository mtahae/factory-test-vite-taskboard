export default function TaskRow({ task, onToggle, onRemove }) {
  return (
    <article className={`task ${task.done ? "is-done" : ""}`}>
      <input type="checkbox" checked={task.done} onChange={onToggle} />
      <div className="task-body">
        <h3>{task.title}</h3>
        <div className="task-meta">
          <span className={`priority priority-${task.priority}`}>
            {task.priority}
          </span>
          <span className="assignee">@{task.assignee}</span>
          <span className="id">{task.id}</span>
        </div>
      </div>
      <button className="link danger" onClick={onRemove} aria-label="Remove task">
        Remove
      </button>
    </article>
  );
}
