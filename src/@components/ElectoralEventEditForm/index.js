import React, { Component } from 'react';

import {
  Form,
  Input,
  Alert,
  Button,
  message
} from 'antd';
import { electoralEventService } from '../../@services/electoralEvent.service';

class ElectoralEventEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      electoralEventPublickey: this.props.electoralEventPublickey,
      electoralEvent: this.props.electoralEvent,
      errorApi: false,
      loadingActivateElectoralEvent: false,
      loadingFinishedElectoralEvent: false,
      loadingRegisterElectoralRegister: false
    }
  }

  activate = () => {
    this.setState({ loadingActivateElectoralEvent: true })
    electoralEventService.activate(this.state.electoralEventPublickey)
      .then(response => {
        message.success('Evento Electoral activado');
        this.setState({ loadingActivateElectoralEvent: false })
      })
      .catch(error => {
        this.handleError(error);
        this.setState({ loadingActivateElectoralEvent: false })
      })
  }

  finish = () => {
    this.setState({ loadingFinishedElectoralEvent: true })
    electoralEventService.finish(this.state.electoralEventPublickey)
      .then(response => {
        message.success('Evento Electoral finalizado');
        this.setState({ loadingFinishedElectoralEvent: false })
      })
      .catch(error => {
        this.handleError(error);
        this.setState({ loadingFinishedElectoralEvent: false })
      })
  }

  createElectoralRegister = () => {
    this.setState({ loadingRegisterElectoralRegister: true })
    electoralEventService.createElectoralRegister(this.state.electoralEventPublickey)
      .then(response => {
        message.success('Registro electoral creado');
        this.setState({ loadingRegisterElectoralRegister: false })
      })
      .catch(error => {
        this.handleError(error);
        this.setState({ loadingRegisterElectoralRegister: false })
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
      errorApi.push(error.message);
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
        <Form>
          {/* NAME */}
          <Form.Item
            label={(
              <span>Nombre</span>
            )}>
            {getFieldDecorator('name', {
              initialValue: this.state.electoralEvent.name
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* NAME */}

          {/* FECHA */}
          <Form.Item
            label={(
              <span>Fecha</span>
            )}>
            {getFieldDecorator('fecha', {
              initialValue: `Inicio: ${this.state.electoralEvent.startDate} - Fin: ${this.state.electoralEvent.endDate}`
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* FECHA */}

          {/* API ERROR */}
          {this.state.errorApi.length > 0 && (
            <ErrorApi />
          )}
          {/* API ERROR */}

          < Form.Item className='float-right' style={{ marginLeft: '10px' }}>
            <Button
              type='primary'
              loading={this.state.loadingActivateElectoralEvent}
              onClick={this.activate}
            >
              ACTIVAR
            </Button>
          </Form.Item>

          < Form.Item className='float-right' style={{ marginLeft: '10px' }}>
            <Button
              type='danger'
              loading={this.state.loadingFinishedElectoralEvent}
              onClick={this.finish}
            >
              TERMINAR
            </Button>
          </Form.Item>

          < Form.Item className='float-right' style={{}}>
            <Button
              type='default'
              loading={this.state.loadingRegisterElectoralRegister}
              onClick={this.createElectoralRegister}
            >
              REGISTRO ELECTORAL
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const ElectoralEventEditForm = Form.create({ name: 'electoral-event-edit-form' })(ElectoralEventEdit);

export { ElectoralEventEditForm };