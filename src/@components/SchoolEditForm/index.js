import React, { Component } from 'react';
import {
  Form,
  Alert,
  Input,
  Button,
  message
} from 'antd';

import { schoolService } from '../../@services';

import { pathRoutes } from '../../@constans';

class SchoolEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      school: this.props.location.state.school,
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
          id: this.state.school.id,
          facultyId: this.state.school.facultyId,
          name: values.name,
          code: values.code
        }
        schoolService.edit(data)
          .then(response => {
            message.success('Escuela editada');
            this.props.history.push({
              pathname: pathRoutes.SCHOOLS.replace(':facultyId', this.state.school.faculty.id),
              state: { faculty: this.state.school.faculty }
            })
          })
          .catch(error => {
            this.setState({ loading: false });
            message.error('Ocurrio un error');
            this.handleError(error);
          })
      }
    });
  }

  deleteSchool = () => {
    this.setState({ loading: true });
    schoolService.erase(this.state.school)
      .then(response => {
        message.error('Escuela eliminada');
        this.props.history.push({
          pathname: pathRoutes.SCHOOLS.replace(':facultyId', this.state.school.faculty.id),
          state: { faculty: this.state.school.faculty }
        })
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
        <h1>Facultad de {this.state.school.faculty.name}</h1>
        <Form onSubmit={this.handleSubmit}>
          {/* NAME */}
          <Form.Item
            label={(
              <span>Nombre</span>
            )}
          >
            {getFieldDecorator('name', {
              initialValue: this.state.school.name,
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
              initialValue: this.state.school.code,
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
              onClick={this.deleteSchool}
            >
              ELIMINAR
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const SchoolEditForm = Form.create({ name: 'school-edit-form' })(SchoolEdit);

export { SchoolEditForm };