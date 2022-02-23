import * as api from '../api';

function createTaskSucceded(task) {
  return {
    type: 'CREATE_TASK_SUCCEEDED',
    payload: {
      task,
    },
  };
}

export function createTask({ title, description, status = 'Unstarted' }) {
  return dispatch => {
    api.createTask({ title, description, status }).then(resp => {
      dispatch(createTaskSucceded(resp.data));
    });
  };
}

export function fetchTasksSucceeded(tasks) {
  return {
    type: 'FETCH_TASKS_SUCCEEDED',
    payload: {
      tasks
    }
  }
}

export function fetchTasksStarted() {
  return {
    type: 'FETCH_TASKS_STARTED',
  };
}

function fetchTasksFailed(error) {
  return {
    type: 'FETCH_TASKS_FAILED',
    payload: {
      error,
    },
  };
}

/*
export function fetchTasks() {
  return dispatch => {
    dispatch(fetchTasksStarted());

      api.fetchTasks()
      .then(resp => {
        setTimeout(() => {
          dispatch(fetchTasksSucceeded(resp.data));
        }, 2000);
      })
      .catch(err => {
        dispatch(fetchTasksFailed(err.message));
      });
    };
}
*/

function editTaskSucceeded(task) {
  return {
    type: 'EDIT_TASK_SUCCEEDED',
    payload: {
      task,
    },
  };
}

function progressTimerStart(taskId) {
  return { type: 'TIMER_STARTED', payload: { taskId } };
}

export function editTask(id, params = {}) {
  return (dispatch, getState) => {
    const task = getTaskById(getState().tasks.tasks, id);
    const updatedTask = {
      ...task,
      ...params,
    };
    api.editTask(id, updatedTask).then(resp => {
      dispatch(editTaskSucceeded(resp.data));
      if (resp.data.status === 'In Progress') {
        return dispatch(progressTimerStart(resp.data.id));
      }
      if (task.status === 'In Progress') {
        return dispatch(progressTimerStop(resp.data.id));
      }
    });
  };
}

function progressTimerStop(taskId) {
  return { type: 'TIMER_STOPPED', payload: { taskId } };
}

function getTaskById(tasks, id) {
  return tasks.find(task => task.id === id);
}

