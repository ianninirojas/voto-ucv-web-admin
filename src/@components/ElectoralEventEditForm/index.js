import React, { Component } from 'react';

import {
  Form,
  Input,
  Button,
} from 'antd';

class ElectoralEventEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      electoralEventPublickey: this.props.electoralEventPublickey,
      electoralEvent: this.props.electoralEvent
    }
  }

  render() {
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

          < Form.Item className='float-right' >
            <Button
              type='primary'
              loading={this.state.loading}
              htmlType='submit'
            >
              ACTIVAR
            </Button>
          </Form.Item>

          < Form.Item className='float-right' >
            <Button
              type='primary'
              loading={this.state.loading}
              htmlType='submit'
            >
              TERMINAR
            </Button>
          </Form.Item>

          < Form.Item className='float-right' >
            <Button
              type='primary'
              loading={this.state.loading}
              htmlType='submit'
            >
              CREAR ELECCIÓN
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const ElectoralEventEditForm = Form.create({ name: 'electoral-event-edit-form' })(ElectoralEventEdit);

export { ElectoralEventEditForm };