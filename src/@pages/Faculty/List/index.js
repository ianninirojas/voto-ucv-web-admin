import React, { Component } from 'react';
import { FacultyList, WrapperContent } from '../../../@components';

class Faculties extends Component {
  render() {
    return (
      <WrapperContent
        title='FACULTAD'
        subTitle='LISTA'
        {...this.props}
      >
        <FacultyList />
      </WrapperContent>
    );
  }
}

export { Faculties };