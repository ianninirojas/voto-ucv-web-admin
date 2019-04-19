import React, { Component } from 'react';

import { Layout } from "antd";

import { PrivatesRoutes } from "../../@config";

class Content extends Component {

  render() {
    return (
      <Layout.Content>
        <PrivatesRoutes />
      </Layout.Content>
    );
  }
}

export { Content };