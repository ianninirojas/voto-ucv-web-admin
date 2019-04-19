import React, { Component } from 'react';
import { WrapperContent, UserCreateForm } from '../../../@components';

class UserCreate extends Component {
  render() {
    return (
      <WrapperContent
        title="USUARIO"
        subTitle='CREAR'
        {...this.props}
      >
        <UserCreateForm {...this.props} />
      </WrapperContent>
    );
  }
}

export { UserCreate };