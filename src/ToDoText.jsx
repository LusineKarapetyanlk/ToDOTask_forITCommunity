import { useState } from "react";


function ToDoText({task, handleTaskDone,isRewriting, setIsRewriting, handleTaskRewrite }) {
  const [newTaskText, setNewTaskText] = useState(task.text);

  const handleRewriteSubmit = () => {
    console.log(isRewriting)
    handleTaskRewrite(task.id, newTaskText);
    setIsRewriting(false);
  };

  return (
    <div>
      {isRewriting ? (
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onBlur={handleRewriteSubmit}
          autoFocus
        />
      ) : (
        <span
          className={task.done ? 'text text-done' : 'text'}
          onClick={() => handleTaskDone(task.id)}
        >
          {task.text}
        </span>
      )}
      <button
        type="button"
        id="rewrite"
        data-action="rewrite"
        onClick={() => setIsRewriting(!isRewriting)}
      >
        <span aria-hidden="true">{`${isRewriting ? "\u2714" : "✎"}`}</span>
      </button>
    </div>
  )
}

export default ToDoText
