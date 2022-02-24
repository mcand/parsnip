import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentProjectId } from '../actions';
import { getProjects } from '../reducers'; 

class Header extends Component {
  onCurrentProjectChange = e => {
    this.props.setCurrentProjectId(e.target.value);
  }

  render() {
    console.log('rendering Header')
    const projectOptions = this.props.projects.map(project =>
      <option key={project.id} value={project.id}>
        {project.name}
      </option>,
    );

    return (
      <div className="project-item">
        Project:
        <select
          onChange={this.onCurrentProjectChange}
          className="project-menu"
        >
          {projectOptions}
        </select>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: getProjects(state),
  };
}

export default connect(mapStateToProps, { setCurrentProjectId })(Header);
