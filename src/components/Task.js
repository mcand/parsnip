import React from 'react';
import { connect } from 'react-redux';

import { TASK_STATUSES  } from '../constants';

const Task = props => {
  return (
    <div className="task">
      <div className="task-header">
        <div>{props.task.title}</div>
        <select value={props.task.status} onChange={onStatusChange}>
          {TASK_STATUSES.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <hr />
      <div className="task-body">{props.task.description}</div>
      <div className="task-timer">{props.task.timer}s</div>
    </div>
  );

  function onStatusChange(e) {
    props.onStatusChange(props.task, e.target.value);
  }
};

function mapStateToProps(state, ownProps) {
  return {
    task: state.tasks.items[ownProps.taskId]
  };
}

export default connect(mapStateToProps)(Task);
