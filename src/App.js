import React, { Component } from 'react';
import { connect } from 'react-redux';
import TasksPage from './components/TasksPage.js';
import { createTask, editTask, fetchTasks, filterTasks, fetchTasksStarted } from './actions';
import FlashMessage from './components/FlashMessage';
import { getFilteredTasks } from './reducers';

class App extends Component {
  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  };

  onSearch = searchTerm => {
    this.props.dispatch(filterTasks(searchTerm));
  };

  onStatusChange = (id, status) => {
    this.props.dispatch(editTask(id, { status }));
  };

  componentDidMount() {
//this.props.dispatch(fetchTasks());
    this.props.dispatch(fetchTasksStarted());
  }

  render() {
    console.log('props from App:', this.props);
      return (
      <div className="container">
        {this.props.error && <FlashMessage message={this.props.error} />}
        <div className="main-content">
          <TasksPage
            tasks={this.props.tasks}
            onCreateTask={this.onCreateTask}
            onSearch={this.onSearch}
            onStatusChange={this.onStatusChange}
            isLoding={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoading, error } = state.tasks;

  return { tasks: getFilteredTasks(state), isLoading, error};
}

export default connect(mapStateToProps)(App);

