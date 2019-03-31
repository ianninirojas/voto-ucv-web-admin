import React, { Component } from 'react';

import { Layout, Menu, Icon } from "antd";

import './style.css'
import { authenticationService } from '../../@services';

class Header extends Component {
  
  logout = () => {
    authenticationService.logout();
  }

  updateProfile = () => {
    authenticationService.updateProfile(this.props.history);
  }

  render() {
    const username = authenticationService.getUsername();
    return (
      <Layout.Header>
        <div className='float-right'>
          <Menu mode='horizontal'>
            <Menu.SubMenu title={<span>Bienvenido, {username}</span>}>
              <Menu.Item key="setting:2" onClick={this.updateProfile}><Icon type="setting" />Perfil</Menu.Item>
              <Menu.Item key="setting:1" onClick={this.logout}><Icon type="logout" />Cerrar sesión</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </Layout.Header>
    );
  }
}

export { Header };