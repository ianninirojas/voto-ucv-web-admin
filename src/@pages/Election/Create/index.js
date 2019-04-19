import React, { Component } from 'react';
import {
  WrapperContent,
  ElectionCreateForm
} from '../../../@components';

class ElectionCreate extends Component {
  render() {
    return (
      <WrapperContent
        title='ELECCIÓN'
        subTitle='CREAR'
        {...this.props}
      >
        <ElectionCreateForm {...this.props} />
      </WrapperContent>
    );
  }
}

export { ElectionCreate };