import React, { Component } from 'react';

import {
  Form,
  Alert,
  Input,
  Button,
  message,
  Popconfirm,
  DatePicker,
} from "antd";

import locale from 'antd/lib/date-picker/locale/es_ES';

import moment from 'moment';

import 'moment/locale/es';

import { electoralEventService } from '../../@services';

import { pathRoutes } from '../../@constans';

const { RangePicker } = DatePicker;

// startDateCreateElection
// endDateCreateElection
// startDateCreateElectoralRegister
// endDateCreateElectoralRegister
// startDateRegisterCandidate
// endDateRegisterCandidate
// startDateActiveElectoralEvent
// endDateActiveElectoralEvent
class ElectoralEventCreate extends Component {

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
        const dateFormat = "DD-MM-YYYY H:mm";
        let data = {
          name: values.name,
          startDateCreateElection: moment(values.dateCreateElection[0]).format(dateFormat),
          endDateCreateElection: moment(values.dateCreateElection[1]).format(dateFormat),
          startDateCreateElectoralRegister: moment(values.dateCreateElectoralRegister[0]).format(dateFormat),
          endDateCreateElectoralRegister: moment(values.dateCreateElectoralRegister[1]).format(dateFormat),
          startDateRegisterCandidate: moment(values.dateRegisterCandidate[0]).format(dateFormat),
          endDateRegisterCandidate: moment(values.dateRegisterCandidate[1]).format(dateFormat),
          startDateActiveElectoralEvent: moment(values.dateActiveElectoralEvent[0]).format(dateFormat),
          endDateActiveElectoralEvent: moment(values.dateActiveElectoralEvent[1]).format(dateFormat),
        }
        electoralEventService.create(data)
          .then(response => {
            message.success('Evento electoral creado');
            this.props.history.push(pathRoutes.ELECTORALEVENTS)
          })
          .catch(error => {
            console.log('error :', error);
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
      errorApi.push(error.message);
    }
    this.setState({ errorApi: errorApi });
  }

  disabledDate = (current) => {
    return current < moment().endOf('day').subtract(1, 'day');
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

          {/* START-END DATE CREATEELECTION */}
          <Form.Item
            label={(
              <span>Crear Elecciones</span>
            )}
          >
            {getFieldDecorator('dateCreateElection', {
              rules: [
                { required: true, type: 'array', message: 'Requerido' },
              ],
            })(
              <RangePicker
                locale={locale}
                disabledDate={this.disabledDate}
                showTime={{ format: 'HH:mm' }}
                format='DD-MM-YYYY H:mm'
                placeholder={['Comienzo', 'Fin']}
                onOk={this.onOkDate}
              />
            )}
          </Form.Item>
          {/* START-END DATE CREATEELECTION */}

          {/* START-END DATE CREATEELECTORALREGISTER */}
          <Form.Item
            label={(
              <span>Crear Registro Electoral</span>
            )}
          >
            {getFieldDecorator('dateCreateElectoralRegister', {
              rules: [
                { required: true, type: 'array', message: 'Requerido' },
              ],
            })(
              <RangePicker
                locale={locale}
                disabledDate={this.disabledDate}
                showTime={{ format: 'HH:mm' }}
                format='DD-MM-YYYY H:mm'
                placeholder={['Comienzo', 'Fin']}
                onOk={this.onOkDate}
              />
            )}
          </Form.Item>
          {/* START-END DATE CREATEELECTORALREGISTER */}

          {/* START-END DATE REGISTERCANDIDATE */}
          <Form.Item
            label={(
              <span>Registrar Candidatos</span>
            )}
          >
            {getFieldDecorator('dateRegisterCandidate', {
              rules: [
                { required: true, type: 'array', message: 'Requerido' },
              ],
            })(
              <RangePicker
                locale={locale}
                disabledDate={this.disabledDate}
                showTime={{ format: 'HH:mm' }}
                format='DD-MM-YYYY H:mm'
                placeholder={['Comienzo', 'Fin']}
                onOk={this.onOkDate}
              />
            )}
          </Form.Item>
          {/* START-END DATE REGISTERCANDIDATE */}

          {/* START-END DATE ACTIVEELECTORALEVENT */}
          <Form.Item
            label={(
              <span>Activar Evento Electoral</span>
            )}
          >
            {getFieldDecorator('dateActiveElectoralEvent', {
              rules: [
                { required: true, type: 'array', message: 'Requerido' },
              ],
            })(
              <RangePicker
                locale={locale}
                disabledDate={this.disabledDate}
                showTime={{ format: 'HH:mm' }}
                format='DD-MM-YYYY H:mm'
                placeholder={['Comienzo', 'Fin']}
                onOk={this.onOkDate}
              />
            )}
          </Form.Item>
          {/* START-END DATE ACTIVEELECTORALEVENT */}

          {/* API ERROR */}
          {this.state.errorApi.length > 0 && (
            <ErrorApi />
          )}
          {/* API ERROR */}

          < Form.Item className='float-right' >
            <Popconfirm title="Esta información no puede ser modificada" onConfirm={this.handleSubmit}>
              <Button
                type='primary'
                loading={this.state.loading}
              >
                CREAR
            </Button>
            </Popconfirm>
          </Form.Item>

        </Form>
      </div>
    );
  }
}

const ElectoralEventCreateForm = Form.create({ name: 'electoral-event-create-form' })(ElectoralEventCreate);

export { ElectoralEventCreateForm };