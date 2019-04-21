import React, { Component } from 'react';

import { Link } from "react-router-dom";

import { Menu, Layout, Icon } from "antd";

import logo from "../../@assets/logo.png";

import { pathRoutes } from "../../@constans";

import './style.css'
import { authenticationService } from '../../@services';

const { Sider } = Layout;

class MenuComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  checkRole = (menu) => {
    const role = authenticationService.getRole();
    for (let i = 0; i < menu.length; i++) {
      const element = menu[i];
      if (element.roles.indexOf(role) === -1) {
        menu.splice(i, 1);
      }
      else {
        if (element.items.length > 0) {
          for (let j = 0; j < element.items.length; j++) {
            const item = element.items[j];
            if (item.roles.indexOf(role) === -1) {
              element.item.splice(j, 1);
            }
          }
        }
      }
    }
    return menu;
  }

  RenderMenu = () => {
    let menu = [
      {
        title: 'EVENTO ELECTORAL',
        roles: ['ADMIN'],
        icon: 'folder',
        items: [
          {
            title: 'CREAR',
            roles: ['ADMIN'],
            icon: 'form',
            path: pathRoutes.ELECTORALEVENTSCREATE
          },
          {
            title: 'EDITAR',
            roles: ['ADMIN'],
            icon: 'edit',
            path: pathRoutes.ELECTORALEVENTS
          }
        ]
      },
      {
        title: 'FACULTAD',
        roles: ['ADMIN'],
        icon: 'folder',
        items: [
          {
            title: 'CREAR',
            roles: ['ADMIN'],
            icon: 'form',
            path: pathRoutes.FACULTIESCREATE
          },
          {
            title: 'EDITAR',
            roles: ['ADMIN'],
            icon: 'edit',
            path: pathRoutes.FACULTIES
          }
        ]
      },
      {
        title: 'CARGO',
        roles: ['ADMIN'],
        icon: 'folder',
        items: [
          {
            title: 'CREAR',
            roles: ['ADMIN'],
            icon: 'form',
            path: pathRoutes.POSITIONSCREATE
          },
          {
            title: 'EDITAR',
            roles: ['ADMIN'],
            icon: 'edit',
            path: pathRoutes.POSITIONS
          }
        ]
      },
      {
        title: 'TIPO ELECCIÓN',
        roles: ['ADMIN'],
        icon: 'folder',
        items: [
          {
            title: 'CREAR',
            roles: ['ADMIN'],
            icon: 'form',
            path: pathRoutes.TYPESELECTIONCREATE
          },
          {
            title: 'EDITAR',
            roles: ['ADMIN'],
            icon: 'edit',
            path: pathRoutes.TYPESELECTION
          }
        ]
      },
      {
        title: 'USUARIOS',
        roles: ['ADMIN'],
        icon: 'folder',
        items: [
          {
            title: 'CREAR',
            roles: ['ADMIN'],
            icon: 'form',
            path: pathRoutes.USERSCREATE
          },
          {
            title: 'EDITAR',
            roles: ['ADMIN'],
            icon: 'edit',
            path: pathRoutes.USERS
          }
        ]
      },
    ]

    menu = this.checkRole(menu);

    return (
      <Menu mode='inline' theme='dark'>
        {menu.map((submenu, index) => {
          return (
            <Menu.SubMenu
              key={index}
              title={
                < span >
                  <Icon type={submenu.icon} />
                  <span>{submenu.title}</span>
                </span >
              }>
              {submenu.items.map((item, index2) => {
                return (
                  <Menu.Item key={`${index}.${index2}`}>
                    <Link to={item.path}>
                      <Icon type={item.icon} />
                      <span>{item.title}</span>
                    </Link>
                  </Menu.Item>
                )
              })}
            </Menu.SubMenu>
          )
        })}
      </Menu>
    )
  }

  render() {
    const { RenderMenu } = this;
    return (
      <Sider
        style={{
          overflow: 'auto', height: '100vh', position: 'fixed', left: 0,
        }}
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" >
          <Link to={pathRoutes.ELECTORALEVENTS}>
            <img src={logo} alt={"Logo"} />
          </Link>
        </div>
        <RenderMenu />
      </Sider>
    );
  }
}

export { MenuComponent };