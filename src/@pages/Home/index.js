import React, { Component } from 'react';

import { WrapperContent } from "../../@components";

class Home extends Component {
  render() {
    return (
      <WrapperContent
        title='Home'
        {...this.props}
      >
        <h3>Bienvenido al Sistema administrativo de Voto UCV</h3>
      </WrapperContent>
    );
  }
}

export { Home };