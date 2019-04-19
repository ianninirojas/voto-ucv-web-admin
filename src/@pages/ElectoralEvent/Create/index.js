import React, { Component } from 'react';
import {
  WrapperContent,
  ElectoralEventCreateForm
} from '../../../@components';

class ElectoralEventCreate extends Component {
  render() {
    return (
      <WrapperContent
        title='EVENTO ELECTORAL'
        subTitle='CREAR'
        {...this.props}
      >
        <ElectoralEventCreateForm {...this.props} />
      </WrapperContent>
    );
  }
}

export { ElectoralEventCreate };