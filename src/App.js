import React, { Component } from 'react';
import { connect } from 'react-redux';
import TasksPage from './components/TasksPage.js';
import { createTask, editTask, fetchTasks } from './actions';
import FlashMessage from './components/FlashMessage';

class App extends Component {
  onCreateTask = ({ title, description }) => {
    this.props.dispatch(createTask({ title, description }));
  };

  onStatusChange = (id, status) => {
    this.props.dispatch(editTask(id, { status }));
  };

  componentDidMount() {
    this.props.dispatch(fetchTasks());
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
            onStatusChange={this.onStatusChange}
            isLoding={this.props.isLoading}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { tasks, isLoading, error } = state.tasks;
  return { tasks, isLoading, error };
}

export default connect(mapStateToProps)(App);

