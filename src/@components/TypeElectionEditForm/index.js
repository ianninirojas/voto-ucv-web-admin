import React, { Component } from 'react';
import {
  Form,
  Alert,
  Input,
  Button,
  message,
  Select,
} from 'antd';

import { typeElectionService } from "../../@services";

import { pathRoutes, LevelElection } from '../../@constans';

class TypeElectionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeElection: this.props.location.state.typeElection,
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
          id: this.state.typeElection.id,
          name: values.name,
        }
        typeElectionService.edit(data)
          .then(response => {
            message.success('Tipo elección editado');
            this.props.history.push(pathRoutes.TYPESELECTION)
          })
          .catch(error => {
            this.setState({ loading: false });
            message.error('Ocurrio un error');
            this.handleError(error);
          })
      }
    });
  }

  deleteTypeElection = () => {
    this.setState({ loading: true });
    typeElectionService.erase(this.state.typeElection)
      .then(response => {
        message.error('Tipo elección eliminado');
        this.props.history.push(pathRoutes.TYPESELECTION)
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

  levelElectionOptions = () => {
    let levelsElection = [];
    for (const keyLevelElection in LevelElection) {
      if (LevelElection.hasOwnProperty(keyLevelElection)) {
        const levelElection = LevelElection[keyLevelElection];
        levelsElection.push(levelElection);
      }
    }
    return (levelsElection.map(levelElection => <Select.Option key={levelElection}>{levelElection}</Select.Option>));
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
              initialValue: this.state.typeElection.name,
              rules: [
                { required: true, message: 'Requerido' }
              ],
            })(
              <Input placeholder="Nombre" />
            )}
          </Form.Item>
          {/* NAME */}

          {/* LEVEL ELECTION */}
          <Form.Item
            label={(
              <span>Nivel Elección</span>
            )}
          >
            {getFieldDecorator('levelElection', {
              initialValue: this.state.typeElection.levelElection,
              rules: [
                { required: true, message: 'Requerido' }
              ],
            })(
              <Select showSearch optionFilterProp="children" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="Nivel Elección" >
                {this.levelElectionOptions()}
              </Select>
            )}
          </Form.Item>
          {/* LEVEL ELECTION */}

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
              onClick={this.deleteTypeElection}
            >
              ELIMINAR
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const TypeElectionEditForm = Form.create({ name: 'typeElection-edit-form' })(TypeElectionEdit);

export { TypeElectionEditForm };