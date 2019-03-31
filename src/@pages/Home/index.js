import React, { Component } from 'react';

import { WrapperContent } from "../../@components";

class Home extends Component {
  render() {
    return (
      <WrapperContent
        title='Home'
        {...this.props}
      >
        Home
      </WrapperContent>
    );
  }
}

export { Home };