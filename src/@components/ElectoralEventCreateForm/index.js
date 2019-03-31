import React, { Component } from 'react';

import {
  Form,
  Alert,
  Input,
  Button,
  message,
  DatePicker,
} from "antd";

import locale from 'antd/lib/date-picker/locale/es_ES';

import moment from 'moment';
import 'moment/locale/es';

import { electoralEventService } from '../../@services';

import { pathRoutes } from '../../@constans';

const { RangePicker } = DatePicker;

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
        const dateFormat = "DD/MM/YYYY HH:mm";
        let data = {
          name: values.name,
          startDate: moment(values.date[0], dateFormat).format(dateFormat),
          endDate: moment(values.date[1], dateFormat).format(dateFormat)
        }
        electoralEventService.create(data)
          .then(response => {
            message.success('Evento electoral creado');
            this.props.history.push(pathRoutes.ELECTORALEVENTS)
          })
          .catch(error => {
            this.setState({ loading: false });
            message.error('Ocurrio un error');
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
        <Form
          onSubmit={this.handleSubmit}
        >
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

          {/* START-END DATE */}
          <Form.Item
            label={(
              <span><>Fecha</></span>
            )}
          >
            {getFieldDecorator('date', {
              rules: [
                { required: true, type: 'array', message: 'Requerido' },
              ],
            })(
              <RangePicker
                locale={locale}
                disabledDate={this.disabledDate}
                showTime={{ format: 'HH:mm' }}
                format='DD-MM-YYYY HH:mm'
                placeholder={['Comienzo', 'Fin']}
                onOk={this.onOkDate}
              />
            )}
          </Form.Item>
          {/* START-END DATE */}

          {/* API ERROR */}
          {this.state.errorApi.length > 0 && (
            <ErrorApi />
          )}
          {/* API ERROR */}

          < Form.Item className='float-right' >
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

const ElectoralEventCreateForm = Form.create({ name: 'electoral-event-create-form' })(ElectoralEventCreate);

export { ElectoralEventCreateForm };