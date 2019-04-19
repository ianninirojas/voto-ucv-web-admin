import React, { Component } from 'react';
import { WrapperContent, TypeElectionCreateForm } from '../../../@components';

class TypeElectionCreate extends Component {
  render() {
    return (
      <WrapperContent
        title="TIPO ELECCIÓN"
        subTitle='CREAR'
        {...this.props}
      >
        <TypeElectionCreateForm {...this.props} />
      </WrapperContent>
    );
  }
}

export { TypeElectionCreate };