import React, { Component } from 'react';
import {
  WrapperContent,
  ElectionEditForm
} from '../../../@components';

class ElectionEdit extends Component {
  render() {
    return (
      <WrapperContent
        title='ELECCIÓN'
        subTitle='EDITAR'
        {...this.props}
      >
        <ElectionEditForm {...this.props} />
      </WrapperContent>
    );
  }
}

export { ElectionEdit };