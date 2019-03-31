import React, { Component } from 'react';
import { WrapperContent, UserEditForm } from '../../../@components';

class UserEdit extends Component {
  render() {
    return (
      <WrapperContent
        title="USUARIO"
        subTitle='EDITAR'
        {...this.props}
      >
        <UserEditForm {...this.props} />
      </WrapperContent>
    );
  }
}

export { UserEdit };