import React, { Component } from 'react';
import { ElectorList, WrapperContent } from '../../../@components';

class Electors extends Component {
  render() {
    return (
      <WrapperContent
        title='ELECTORES'
        {...this.props}
      >
        <ElectorList {...this.props}/>
      </WrapperContent>
    );
  }
}

export { Electors };