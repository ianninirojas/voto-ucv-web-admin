import React, { Component } from 'react';

import { Card, Row, Col } from "antd";

import { LoginForm } from '../../@components';

import logo from "../../@assets/logo.png";
import textureBackgroudLogin from "../../@assets/texture-backgroud-login.jpg";

import './style.css'
class Login extends Component {

  render() {
    return (
      <div style={{ height: '100%' }}>
        <Row style={{ height: '100%' }} type='flex' align='middle'>
          <Col
            xs={24}
            sm={24}
            md={11}
            lg={11}
            xl={11}
            style={{ height: '100%' }}
          >
            <div className="tint">
              <img src={textureBackgroudLogin} alt="" width="100%" height="100%" />
              <img className='logo-login' src={logo} alt="" />
            </div>
          </Col>

          <Col
            xs={24}
            sm={24}
            md={13}
            lg={13}
            xl={13}
            style={{ height: '100%' }}>
            <div className='login-box'>
              <Card title="Iniciar Sesión" className='login-form' bordered={false} >
                <LoginForm history={this.props.history} location={this.props.location} />
              </Card>
            </div>
          </Col>
        </Row>
      </div >
    );
  }
}

export { Login };