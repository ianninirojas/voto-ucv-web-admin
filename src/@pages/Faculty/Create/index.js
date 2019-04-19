import React, { Component } from 'react';
import {
  WrapperContent,
  FacultyCreateForm
} from '../../../@components';

class FacultyCreate extends Component {
  render() {
    return (
      <WrapperContent
        title='FACULTAD'
        subTitle='CREAR'
        {...this.props}
      >
        <FacultyCreateForm {...this.props}/>
      </WrapperContent>
    );
  }
}

export { FacultyCreate };