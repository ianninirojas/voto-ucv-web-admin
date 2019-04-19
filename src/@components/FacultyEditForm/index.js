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

class FacultyEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      faculty: this.props.faculty,
      loading: false,
      loadingDelete: false,
      errorApi: []
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loading: true });
        let data = {
          id: this.state.faculty.id,
          name: values.name,
          code: values.code
        }
        facultyService.edit(data)
          .then(response => {
            message.success('Facultad editada');
            this.props.history.push(pathRoutes.FACULTIES)
          })
          .catch(error => {
            this.setState({ loading: false });
            message.error('Ocurrio un error');
            this.handleError(error);
          })
      }
    });
  }

  deleteFaculty = () => {
    this.setState({ loading: true });
    facultyService.erase(this.state.faculty.id)
      .then(response => {
        message.error('Facultad eliminada');
        this.props.history.push(pathRoutes.FACULTIES)
      })
      .catch(error => {
        this.setState({ loadingDelete: false });
        message.error('Ocurrio un error');
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
              initialValue: this.state.faculty.name,
              rules: [
                { required: true, message: 'Requerido' }
              ]
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
              initialValue: this.state.faculty.code,
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
              EDITAR
            </Button>
          </Form.Item>

          <Form.Item className='float-right' style={{ marginRight: '10px' }}>
            <Button
              type='danger'
              loading={this.state.loadingDelete}
              onClick={this.deleteFaculty}
            >
              ELIMINAR
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const FacultyEditForm = Form.create({ name: 'faculty-edit-form' })(FacultyEdit);

export { FacultyEditForm };