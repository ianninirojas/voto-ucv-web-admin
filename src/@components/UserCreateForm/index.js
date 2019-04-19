import React, { Component } from 'react';
import {
  Form,
  Alert,
  Input,
  Button,
  Select,
  message,
} from 'antd';

import { userService } from "../../@services";

import { pathRoutes } from '../../@constans';
import { Role } from '../../@helpers';

class UserCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorApi: []
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        let data = {
          username: values.username,
          password: values.password,
          role: values.role,
        }
        userService.create(data)
          .then(response => {
            message.success('Usuario creado');
            this.props.history.push(pathRoutes.USERS)
          })
          .catch(error => {
            this.setState({ loading: false });
            message.error('Ocurrio un error');
            this.handleError(error);
          })
      }
    });
  }

  handleError = (error) => {
    let errorApi = [];
    if (typeof error === 'object' && error.constructor === Array) {
      error.forEach(err => {
        for (const key in err) {
          if (err.hasOwnProperty(key)) {
            const element = err[key];
            errorApi.push(element);
          }
        }
      });
    }
    else {
      errorApi.push(error);
    }
    this.setState({ errorApi: errorApi });
  }

  ErrorApi = () => {
    return (
      <Form.Item>
        {this.state.errorApi.map((error, index) => <Alert message={error} type='error' key={index} />)}
      </Form.Item>
    )
  }

  roleOptions = () => {
    let roles = [];
    for (const keyRole in Role) {
      if (Role.hasOwnProperty(keyRole)) {
        const role = Role[keyRole];
        roles.push(role);
      }
    }
    return (roles.map(role => <Select.Option key={role}>{role}</Select.Option>));
  }

  render() {
    const { ErrorApi } = this;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {/* USERNAME */}
          <Form.Item
            label={(
              <span>Usuario</span>
            )}
          >
            {getFieldDecorator('username', {
              rules: [
                { required: true, message: 'Requerido' },
                { min: 4, message: 'El usuario debe ser mayor a 4 caracteres' }
              ],
            })(
              <Input placeholder="Usuario" />
            )}
          </Form.Item>
          {/* USERNAME */}

          {/* PASSWORD */}
          <Form.Item
            label={(
              <span>Contraseña</span>
            )}
          >
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Requerido' },
                { min: 4, message: 'La contraseña debe ser mayor a 4 caracteres' }
              ],
            })(
              <Input.Password placeholder="Contraseña" autoComplete="new-password" />
            )}
          </Form.Item>
          {/* PASSWORD */}

          {/* ROLE */}
          <Form.Item
            label={(
              <span>Rol</span>
            )}
          >
            {getFieldDecorator('role', {
              rules: [
                { required: true, message: 'Requerido' }
              ],
            })(
              <Select placeholder='Rol'>
                {this.roleOptions()}
              </Select>
            )}
          </Form.Item>
          {/* ROLE */}

          {/* API ERROR */}
          {this.state.errorApi.length > 0 && (
            <ErrorApi />
          )}
          {/* API ERROR */}

          <Form.Item className='float-right' >
            <Button
              type='primary'
              loading={this.state.loading}
              htmlType='submit'
            >
              CREAR
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const UserCreateForm = Form.create({ name: 'user-create-form' })(UserCreate);

export { UserCreateForm };