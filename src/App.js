import React, { Component } from 'react';
import { connect } from 'react-redux';
import TasksPage from './components/TasksPage.js';

class App extends Component {
  onCreateTask = ({ title, description }) => {
    this.props.dispatch({
      type: 'CREATE_TASK',
      payload: {
        title,
        description
      }
    });
  }

  render() {
    console.log('props from App:', this.props);
    return (
      <div className="main-content">
        <TasksPage
          tasks={this.props.tasks}
          onCreateTask={this.onCreateTask}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(App);

