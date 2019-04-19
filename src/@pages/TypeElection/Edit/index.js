import React, { Component } from 'react';
import { WrapperContent, TypeElectionEditForm } from '../../../@components';

class TypeElectionEdit extends Component {
  render() {
    return (
      <WrapperContent
        title="TIPO ELECCIÓN"
        subTitle='EDITAR'
        {...this.props}
      >
        <TypeElectionEditForm {...this.props} />
      </WrapperContent>
    );
  }
}

export { TypeElectionEdit };