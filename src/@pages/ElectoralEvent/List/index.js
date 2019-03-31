import React, { Component } from 'react';
import { ElectoralEventList, WrapperContent } from '../../../@components';

class ElectoralEvents extends Component {
  render() {
    return (     
      <WrapperContent
        title='EVENTO ELECTORAL'
        subTitle='LISTA'
        {...this.props}
      >
        <ElectoralEventList />
      </WrapperContent>
    );
  }
}

export { ElectoralEvents };