import React, { Component } from 'react';
import { UserList, WrapperContent } from '../../../@components';

class Users extends Component {
  render() {
    return (
      <WrapperContent
        title='USUARIO'
        subTitle='LISTA'
        {...this.props}
      >
        <UserList />
      </WrapperContent>
    );
  }
}

export { Users };