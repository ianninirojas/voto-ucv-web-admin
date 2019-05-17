import React, { Component } from 'react';
import {
  Form,
  Alert,
  Input,
  Button,
  message
} from 'antd';

import { facultyService } from '../../@services';

import { pathRoutes } from '../../@constans';

class FacultyCreate extends Component {

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
          name: values.name,
          code: values.code
        }
        facultyService.create(data)
          .then(response => {
            message.success('Facultad creada');
            this.props.history.push(pathRoutes.FACULTIES)
          })
          .catch(error => {
            this.setState({ loading: false });
            message.error('Ocurrió un error');
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

  isNumber = (rule, value, callback) => {
    if (!isNaN(value)) {
      callback();
      return;
    }
    callback('Debe ser un número');
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
              rules: [
                { required: true, message: 'Requerido' }
              ],
            })(
              <Input placeholder="Nombre" />
            )}
          </Form.Item>
          {/* NAME */}

          {/* CODE */}
          <Form.Item
            label={(
              <span>Código</span>
            )}
          >
            {getFieldDecorator('code', {
              rules: [
                { required: true, message: 'Requerido' },
                { validator: this.isNumber }
              ],
            })(
              <Input placeholder="Código" />
            )}
          </Form.Item>
          {/* CODE */}

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

const FacultyCreateForm = Form.create({ name: 'faculty-create-form' })(FacultyCreate);

export { FacultyCreateForm };