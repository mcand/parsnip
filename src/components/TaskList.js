import React from 'react';
import Task from './Task.js';

const TaskList = props => {
  return (
    <div className="task-list">
      <div className="task-list title">
        <strong>{props.status}</strong>
      </div>
        {props.taskIds.map(id => {
          return (
            <Task
              key={id}
              taskId={id}
              onStatusChange={props.onStatusChange}
            />
          );
        })}
    </div>
  );
}

export default TaskList;
