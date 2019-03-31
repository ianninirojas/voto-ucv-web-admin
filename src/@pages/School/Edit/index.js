import React, { Component } from 'react';
import { WrapperContent, SchoolEditForm } from '../../../@components';

class SchoolEdit extends Component {
  render() {
    return (
      <WrapperContent
        title='ESCUELA'
        subTitle='EDITAR'
        {...this.props}
      >
        <SchoolEditForm {...this.props} />
      </WrapperContent>
    );
  }
}

export { SchoolEdit };