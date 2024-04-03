import React from 'react';
import './style.css'

function TaskModal({ task, setTask, onSave, onCancel }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCancel}>&times;</span>
        <h2>Edit Task</h2>
        <hr/>
        <label>
          Name
          <input
            type="text"
            name="text"
            value={task.text}
            onChange={handleChange}
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </label>
        <label>
          Deadline
          <input
            type="text"
            name="deadline"
            value={task.deadline}
            onChange={handleChange}
          />
        </label>
        <button onClick={onSave}>Save</button>
      </div>
    </div>
  );
}

export default TaskModal;
