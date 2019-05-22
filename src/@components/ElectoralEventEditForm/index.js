import React, { Component } from 'react';

import {
  Form,
  Input,
  Alert,
  Button,
  message
} from 'antd';
import { electoralEventService } from '../../@services/electoralEvent.service';
import { pathRoutes } from '../../@constans';

class ElectoralEventEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      electoralEventPublickey: this.props.electoralEventPublickey,
      electoralEvent: this.props.electoralEvent,
      errorApi: false,
      loadingActivateElectoralEvent: false,
      loadingFinishedElectoralEvent: false,
      loadingTotalizeElectoralEvent: false,
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

  totalize = () => {
    this.setState({ loadingTotalizeElectoralEvent: true })
    electoralEventService.totalize(this.state.electoralEventPublickey)
      .then(response => {
        message.success('Evento Electoral Totalizado');
        this.setState({ loadingTotalizeElectoralEvent: false })
      })
      .catch(error => {
        this.handleError(error);
        this.setState({ loadingTotalizeElectoralEvent: false })
      })
  }

  handleError = (error) => {
    console.log('error :', error);
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

  // startDateCreateElection
  // endDateCreateElection
  // startDateCreateElectoralRegister
  // endDateCreateElectoralRegister
  // startDateRegisterCandidate
  // endDateRegisterCandidate
  // startDateActiveElectoralEvent
  // endDateActiveElectoralEvent

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
              <span>Crear Elecciones</span>
            )}>
            {getFieldDecorator('dateCreateElection', {
              initialValue: `Inicio: ${this.state.electoralEvent.startDateCreateElection} - Fin: ${this.state.electoralEvent.endDateCreateElection}`
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* FECHA */}

          {/* FECHA */}
          <Form.Item
            label={(
              <span>Crear Registro Electoral</span>
            )}>
            {getFieldDecorator('dateCreateElectoralRegister', {
              initialValue: `Inicio: ${this.state.electoralEvent.startDateCreateElectoralRegister} - Fin: ${this.state.electoralEvent.endDateCreateElectoralRegister}`
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* FECHA */}

          {/* FECHA */}
          <Form.Item
            label={(
              <span>Registrar Candidatos</span>
            )}>
            {getFieldDecorator('dateRegisterCandidate', {
              initialValue: `Inicio: ${this.state.electoralEvent.startDateRegisterCandidate} - Fin: ${this.state.electoralEvent.endDateRegisterCandidate}`
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* FECHA */}

          {/* FECHA */}
          <Form.Item
            label={(
              <span>Activar Evento Electoral</span>
            )}>
            {getFieldDecorator('dateActiveElectoralEvent', {
              initialValue: `Inicio: ${this.state.electoralEvent.startDateActiveElectoralEvent} - Fin: ${this.state.electoralEvent.endDateActiveElectoralEvent}`
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
              type='default'
              loading={this.state.loadingRegisterElectoralRegister}
              onClick={this.createElectoralRegister}
            >
              REGISTRO ELECTORAL
            </Button>
          </Form.Item>

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

          < Form.Item className='float-right' style={{ marginLeft: '10px' }}>
            <Button
              type='danger'
              loading={this.state.loadingTotalizeElectoralEvent}
              onClick={this.totalize}
            >
              TOTALIZAR
            </Button>
          </Form.Item>

        </Form>
      </div >
    );
  }
}

const ElectoralEventEditForm = Form.create({ name: 'electoral-event-edit-form' })(ElectoralEventEdit);

export { ElectoralEventEditForm };