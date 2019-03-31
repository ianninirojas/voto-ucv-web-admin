import React, { Component } from 'react';
import { ElectionList, WrapperContent } from '../../../@components';

class Elections extends Component {
  render() {
    return (
      <WrapperContent
        title='ELECCIÓN'
        subTitle='LISTA'
        {...this.props}
      >
        <ElectionList {...this.props}/>
      </WrapperContent>
    );
  }
}

export { Elections };