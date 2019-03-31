import React, { Component } from 'react';

import { Layout } from "antd";

import './style.css'
class Footer extends Component {
  render() {
    return (
      <Layout.Footer>
        Copyright  2019 VOTO UCV
      </Layout.Footer>
    );
  }
}

export { Footer };