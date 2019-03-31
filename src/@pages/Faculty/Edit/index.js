import React, { Component } from 'react';
import {
  WrapperContent,
  FacultyEditForm
} from '../../../@components';

class FacultyEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faculty: this.props.location.state.faculty
    }
  }
  render() {
    return (
      <WrapperContent
        title='FACULTAD'
        subTitle='EDITAR'
        {...this.props}
      >
        <FacultyEditForm faculty={this.state.faculty} {...this.props} />
      </WrapperContent>
    );
  }
}

export { FacultyEdit };