import React, { Component } from 'react';

import {
  Form,
  Input,
  Alert,
  Button,
  message
} from 'antd';
import { electoralEventService } from '../../@services/electoralEvent.service';

class ElectorEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      electoralEventPublickey: this.props.match.params.electoralEventPublickey,
      electorId: this.props.match.params.id,
      elector: {},
      loadingUpdate: false
    }
  }

  componentDidMount = () => {
    this.getElector()
  }

  getElector = () => {
    electoralEventService.getElector(this.state.electoralEventPublickey, this.state.electorId)
      .then(response => {
        this.setState({ elector: response.elector });
      })
  }

  update = () => {
    // DEBES ENVIAR AL SERVIDOR EL NUEVO CORREO, ACTUALIZARLO EN LA TABLA PERSONA, ELIMINAR LOS CODIGOS EN LA TABLA REGISTER ELECTORAL
    // GENERAR UN NUEVO TOKEN DE AUTH Y ENVIARLO POR CORREO

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ loadingUpdate: true });
        
        let data = {
          email: values.email,
        }

        electoralEventService.updateElector(this.state.electoralEventPublickey, this.state.electorId, data)
          .then(response => {
            message.success('Elector actualizado');
            message.success(`Se ha enviado el correo de autenticaión al correo ${values.email}`);
            this.setState({ loadingUpdate: false });
          })
          .catch(error => {
            this.setState({ loadingUpdate: false });
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
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 8 },
    }

    return (
      <div>
        <Form layout='horizontal'>
          {/* CI */}
          <Form.Item
            {...formItemLayout}
            label={(
              <span>C.I</span>
            )}>
            {getFieldDecorator('ci', {
              initialValue: this.state.elector.ci
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* CI */}
          {/* NAME1 */}
          <Form.Item
            {...formItemLayout}
            label={(
              <span>Nombre</span>
            )}>
            {getFieldDecorator('nombre1', {
              initialValue: this.state.elector.nombre1
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* NAME1 */}
          {/* NAME2 */}
          <Form.Item
            {...formItemLayout}
            label={(
              <span>Segundo Nombre</span>
            )}>
            {getFieldDecorator('nombre2', {
              initialValue: this.state.elector.nombre2
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* NAME2 */}
          {/* APELLIDO1 */}
          <Form.Item
            {...formItemLayout}
            label={(
              <span>Apellido</span>
            )}>
            {getFieldDecorator('apellido1', {
              initialValue: this.state.elector.apellido1
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* APELLIDO1 */}
          {/* APELLIDO2 */}
          <Form.Item
            {...formItemLayout}
            label={(
              <span>Segundo Apellido</span>
            )}>
            {getFieldDecorator('apellido2', {
              initialValue: this.state.elector.apellido2
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* APELLIDO2 */}
          {/* EMAIL */}
          <Form.Item
            {...formItemLayout}
            label={(
              <span>Correo</span>
            )}>
            {getFieldDecorator('email', {
              initialValue: this.state.elector.email,
              rules: [
                { required: true, message: 'Requerido' },
                { type: 'email', message: 'Debe ser un correo' }
              ]
            })(
              <Input disabled={this.state.elector.password} />
            )}
          </Form.Item>
          {/* EMAIL */}

          {this.state.elector.password && (
            <Form.Item
              {...formItemLayout}
              label={(
                <span>Aviso</span>
              )}
            >
              <span>Este elector ya generó una clave de votación</span>
            </Form.Item>
          )}

          {/* BUTTON UPDATE */}
          < Form.Item
            wrapperCol={{ span: 4, offset: 14 }}
          >
            <Button
              type='primary'
              loading={this.state.loadingActivateElectoralEvent}
              onClick={this.update}
              loading={this.state.loadingUpdate}
              disabled={this.state.elector.password}
            >
              ACTUALIZAR
            </Button>
          </Form.Item>
          {/* BUTTON UPDATE */}

        </Form>
      </div >
    );
  }
}

const ElectorEditForm = Form.create({ name: 'elector-edit-form' })(ElectorEdit);

export { ElectorEditForm };