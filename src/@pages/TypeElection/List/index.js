import React, { Component } from 'react';
import { TypeElectionList, WrapperContent } from '../../../@components';

class TypeElections extends Component {
  render() {
    return (
      <WrapperContent
        title='TIPO ELECCIÓN'
        subTitle='LISTA'
        {...this.props}
      >
        <TypeElectionList />
      </WrapperContent>
    );
  }
}

export { TypeElections };