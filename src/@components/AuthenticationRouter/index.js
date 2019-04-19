import React, { Component } from 'react';

import { Router, Route } from "react-router-dom";

import { DefaultLayout } from '../../@layouts'

import { Login } from "../../@pages";

import { authenticationService } from "../../@services";

import { history } from "../../@helpers";

class AuthenticationRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
    }));
  }

  render() {
    const { currentUser } = this.state
    return (
      <Router history={history}>
        <Route path="/login" component={Login} />
        <DefaultLayout currentUser={currentUser} history={history} />
      </Router>
    );
  }
}
export { AuthenticationRouter };