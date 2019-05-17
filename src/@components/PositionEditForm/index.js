import React, { Component } from 'react';
import {
  Form,
  Alert,
  Input,
  Button,
  message,
} from 'antd';

import { positionService } from "../../@services";

import { pathRoutes } from '../../@constans';

class PositionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: this.props.location.state.position,
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
          id: this.state.position.id,
          name: values.name,
        }
        positionService.edit(data)
          .then(response => {
            message.success('Cargo editado');
            this.props.history.push(pathRoutes.POSITIONS)
          })
          .catch(error => {
            this.setState({ loading: false });
            message.error('Ocurrió un error');
            this.handleError(error);
          })
      }
    });
  }

  deletePosition = () => {
    this.setState({ loading: true });
    positionService.erase(this.state.position)
      .then(response => {
        message.error('Cargo eliminado');
        this.props.history.push(pathRoutes.POSITIONS)
      })
      .catch(error => {
        this.setState({ loadingDelete: false });
        message.error('Ocurrió un error');
        this.handleError(error);
      })
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

  render() {
    const { ErrorApi } = this;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {/* NAME */}
          <Form.Item
            label={(
              <span>Nombre</span>
            )}
          >
            {getFieldDecorator('name', {
              initialValue: this.state.position.name,
              rules: [
                { required: true, message: 'Requerido' }
              ],
            })(
              <Input placeholder="Nombre" />
            )}
          </Form.Item>
          {/* NAME */}

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
              EDITAR
            </Button>
          </Form.Item>

          <Form.Item className='float-right' style={{ marginRight: '10px' }}>
            <Button
              type='danger'
              loading={this.state.loadingDelete}
              onClick={this.deletePosition}
            >
              ELIMINAR
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const PositionEditForm = Form.create({ name: 'position-edit-form' })(PositionEdit);

export { PositionEditForm };