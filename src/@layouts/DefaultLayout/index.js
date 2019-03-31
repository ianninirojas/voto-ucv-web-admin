import React, { Component } from 'react';

import { Layout } from "antd";

import { Sidebar, Header, Content, Footer } from "../../@components";

class DefaultLayout extends Component {

  RenderLayout = () => {
    const { currentUser } = this.props;
    if (!currentUser) {
      return (
        <Content />
        // <div></div>
      )
    }

    return (
      <Layout>
        <Sidebar />
        <Layout>
          <Header {...this.props}/>
          <Content />
          <Footer />
        </Layout>
      </Layout>
    )
  }

  render() {
    const { RenderLayout } = this
    return (
      <RenderLayout />
    );
  }
}

export { DefaultLayout };