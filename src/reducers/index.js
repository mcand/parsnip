import { createSelector } from 'reselect';
import { TASK_STATUSES } from '../constants';

const initialTasksState = {
  items: {},
  isLoading: false,
  error: null,
};

export function tasks(state = initialTasksState, action) {
  switch (action.type) {
    case 'RECEIVE_ENTITIES': {
      const { entities } = action.payload;
      if (entities && entities.tasks) {
        return {
          ...state,
          isLoading: false,
          items: entities.tasks,
        };
      }

      return state;
    }
    case 'CREATE_TASK_SUCCEEDED':
    case 'EDIT_TASK_SUCCEEDED': {
      const { task } = action.payload;

      const nextTasks = {
        ...state.items,
        [task.id]: task,
      };

      return {
        ...state,
        items: nextTasks,
      };
    }
    case 'TIMER_INCREMENT': {
      const task = state.items[action.payload.taskId]
      if (task) {
        task.timer += 1;
      }

      return {
        ...state,
        tasks: task
      }
      // const nextTasks = Object.keys(state.items).map(taskId => {
      //   const task = state.items[taskId];

      //   if (task.id === action.payload.taskId) {
      //     return { ...task, timer: task.timer + 1 };
      //   }

      //   return task;
      // });
      // return {
      //   ...state,
      //   tasks: nextTasks,
      // };
    }
    default: {
      return state;
    }
  }
}

const initialProjectsState = {
  items: {},
  isLoading: false,
  error: null,
};

export function projects(state = initialProjectsState, action) {
  switch (action.type) {
    case 'RECEIVE_ENTITIES': {
      const { entities } = action.payload;
      if (entities && entities.projects) {
        return {
          ...state,
          isLoading: false,
          items: entities.projects,
        };
      }

      return state;
    }
    case 'FETCH_PROJECTS_STARTED': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'FETCH_PROJECTS_SUCCEEDED': {
      return {
        ...state,
        isLoading: false,
        items: action.payload.projects,
      };
    }
    case 'CREATE_TASK_SUCCEEDED': {
      const { task } = action.payload;

      const project = state.items[task.projectId];

      return {
        ...state,
        items: {
          ...state.items,
          [task.projectId]: {
            ...project,
            tasks: project.tasks.concat(task.id),
          },
        },
      };
    }
    default: {
      return state;
    }
  }
}

const getSearchTerm = state => state.page.searchTerm;

const getTasksByProjectId = state => {
  const { currentProjectId } = state.page;

  if (!currentProjectId || !state.projects.items[currentProjectId]) {
    return [];
  }

  const taskIds = state.projects.items[currentProjectId].tasks;

  return taskIds.map(id => state.tasks.items[id]);
};

export const getFilteredTasks = createSelector(
  [getTasksByProjectId, getSearchTerm],
  (tasks, searchTerm) => {
    return tasks.filter(task => task?.title.match(new RegExp(searchTerm, 'i')));
  }
);

export const getGroupedAndFilteredTasks = createSelector(
  [getFilteredTasks],
  tasks => {
    const grouped = {};

    TASK_STATUSES.forEach(status => {
      grouped[status] = tasks.filter(task => task.status === status);
    });

    return grouped;
  }
);

export const getGroupedAndFilteredTasksIds = createSelector(
  [getFilteredTasks],
  tasks => {
    const grouped = {};

    TASK_STATUSES.forEach(status => {
      grouped[status] = tasks
        .filter(task => task.status === status)
        .map(task => task.id);
    });

    return grouped;
  }
);

export const getProjects = createSelector(
    [state => state.projects],
    projects => {
        return Object.keys(projects.items).map(id => {
          return projects.items[id];
      });
    },
);

const initialPageState = {
  currentProjectId: null,
  searchTerm: '',
};

export function page(state = initialPageState, action) {
  switch (action.type) {
    case 'SET_CURRENT_PROJECT_ID': {
      return {
        ...state,
        currentProjectId: action.payload.id,
      };
    }
    case 'FILTER_TASKS': {
      return { ...state, searchTerm: action.payload.searchTerm };
    }
    default: {
      return state;
    }
  }
}
