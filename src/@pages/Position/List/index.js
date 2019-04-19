import React, { Component } from 'react';
import { PositionList, WrapperContent } from '../../../@components';

class Positions extends Component {
  render() {
    return (
      <WrapperContent
        title='CARGO'
        subTitle='LISTA'
        {...this.props}
      >
        <PositionList />
      </WrapperContent>
    );
  }
}

export { Positions };