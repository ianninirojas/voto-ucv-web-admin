import React, { Component } from 'react';
import { WrapperContent, PositionEditForm } from '../../../@components';

class PositionEdit extends Component {
  render() {
    return (
      <WrapperContent
        title="CARGO"
        subTitle='EDITAR'
        {...this.props}
      >
        <PositionEditForm {...this.props} />
      </WrapperContent>
    );
  }
}

export { PositionEdit };