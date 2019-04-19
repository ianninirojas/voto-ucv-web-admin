import React, { Component } from 'react';

import { enquireScreen, unenquireScreen } from 'enquire-js';

import { Drawer, Layout } from "antd";

import { MenuComponent } from "../../@components";

const { Sider } = Layout;

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMobile: false,
      collapsed: false,
      drawerVisible: false,
      moveTriggerMenuButton: "0px"
    };

    this.toggleMenuResponsive = this.toggleMenuResponsive.bind(this);
    this.closeMenuResponsive = this.closeMenuResponsive.bind(this);
    this.triggerMenuButton = this.triggerMenuButton.bind(this);
    this.MenuResponsive = this.MenuResponsive.bind(this);
    this.RenderMenu = this.RenderMenu.bind(this);
  }

  componentDidMount = () => {
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        });
      }
    });
  }

  componentWillUnmount = () => {
    unenquireScreen(this.enquireHandler);
  }

  toggleMenuResponsive = () => {
    const moveTriggerMenuButton = !this.state.drawerVisible ? "200px" : "0px";
    this.setState({ drawerVisible: !this.state.drawerVisible, moveTriggerMenuButton })
  }

  closeMenuResponsive = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible, moveTriggerMenuButton: "0px" })
  }

  triggerMenuButton = () => {
    return (
      <span
        onClick={this.toggleMenuResponsive}
        style={{ left: this.state.moveTriggerMenuButton, width: '30px' }}
        className="ant-layout-sider-zero-width-trigger">
        <i className="anticon anticon-bars">
          <svg viewBox="0 0 1024 1024" data-icon="bars" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0zm0 284a56 56 0 1 0 112 0 56 56 0 1 0-112 0z"></path>
          </svg>
        </i>
      </span>
    )
  }

  MenuResponsive = () => {
    return (
      <div>
        {this.triggerMenuButton()}
        <Drawer
          style={{ padding: '0px' }}
          width="200"
          placement='left'
          closable={false}
          onClose={this.closeMenuResponsive}
          visible={this.state.drawerVisible} >
          <MenuComponent />
        </Drawer>
      </div>
    )
  }

  RenderMenu = () => {
    const { MenuResponsive } = this;
    const { isMobile } = this.state;

    if (isMobile) {
      return <MenuResponsive />
    }
    else {
      return (
        <Sider>
          <MenuComponent />
        </Sider>
      )
    }
  }

  render() {
    const { RenderMenu } = this
    return (<RenderMenu />);
  }
}

export { Sidebar };