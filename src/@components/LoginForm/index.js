import React, { Component } from 'react';

import {
  Form,
  Icon,
  Input,
  Button,
  Alert,
} from 'antd';

import { authenticationService } from "../../@services";

const FormItem = Form.Item;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      loading: false
    }

    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        authenticationService.login(values.username, values.password)
          .then(
            user => {
              const { from } = this.props.location.state || { from: { pathname: "/" } };
              this.props.history.push(from);
            }
          )
          .catch(error => {
            this.setState({
              error,
              loading: false
            });
          })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        {/* USERNAME */}
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Requerido' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" />
          )}
        </FormItem>
        {/* USERNAME */}

        {/* PASSWORD */}
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Requerido' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" />
          )}
        </FormItem>
        {/* PASSWORD */}

        {/* API ERROR */}
        {this.state.error !== '' && (
          <FormItem>
            <Alert message={this.state.error} type='error' />
          </FormItem>
        )}
        {/* API ERROR */}

        <FormItem>
          <span className='float-left'>
            {/* <a className="login-form-forgot" href={'#'}>Olvidó contraseña</a> */}
          </span>
          <span className='float-right'>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.loading}>
              Inicio sesión
            </Button>
          </span>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'login-form' })(Login);

export { LoginForm };