import React, { Component } from 'react';
import { WrapperContent, PositionCreateForm } from '../../../@components';

class PositionCreate extends Component {
  render() {
    return (
      <WrapperContent
        title="CARGO"
        subTitle='CREAR'
        {...this.props}
      >
        <PositionCreateForm {...this.props} />
      </WrapperContent>
    );
  }
}

export { PositionCreate };