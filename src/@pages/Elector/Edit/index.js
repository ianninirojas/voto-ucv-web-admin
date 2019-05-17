import React, { Component } from 'react';
import { ElectorEditForm, WrapperContent } from '../../../@components';

class ElectorEdit extends Component {
  render() {
    return (
      <WrapperContent
        title='ELECTOR'
        {...this.props}
      >
        <ElectorEditForm {...this.props}/>
      </WrapperContent>
    );
  }
}

export { ElectorEdit };