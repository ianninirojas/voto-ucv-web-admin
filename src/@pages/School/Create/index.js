import React, { Component } from 'react';
import { WrapperContent, SchoolCreateForm } from '../../../@components';

class SchoolCreate extends Component {
  render() {
    return (
      <WrapperContent
        title='ESCUELA'
        subTitle='CREATE'
        {...this.props}
      >
        <SchoolCreateForm {...this.props} />
      </WrapperContent>
    );
  }
}

export { SchoolCreate };