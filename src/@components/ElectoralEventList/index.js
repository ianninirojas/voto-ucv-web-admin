import React, { Component } from 'react';

import {
  Icon,
  Table,
} from 'antd';

import { Link } from "react-router-dom";

import { electoralEventService, nemAccountService } from '../../@services';
import { pathRoutes } from '../../@constans';

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: 'Fecha Inicio',
    dataIndex: 'startDate',
    key: 'startDate',
    align: 'center',
  },
  {
    title: 'Fecha Fin',
    dataIndex: 'endDate',
    key: 'endDate',
    align: 'center',
  },
  {
    title: 'Ver',
    key: 'see',
    align: 'center',
    render: (text, electoralEvent) => (
      <span>
        <Link to={{ pathname: pathRoutes.ELECTORALEVENTSEDIT.replace(':id', electoralEvent.publickey), state: { electoralEvent } }}>
          <Icon type="eye" />
        </Link>
      </span>
    ),
  },
  {
    title: 'Elecciones',
    key: 'elecciones',
    align: 'center',
    render: (text, electoralEvent) => (
      <span>
        <Link to={{ pathname: pathRoutes.ELECTIONS.replace(':electoralEventPublickey', electoralEvent.publickey), state: { electoralEvent } }}>
          <Icon type="eye" />
        </Link>
      </span>
    ),
  }];

class ElectoralEventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      electoralEvents: []
    }
  }

  componentDidMount = () => {
    this.getElectoralEvents();
  }

  getElectoralEvents = () => {
    this.setState({ loading: true });
    electoralEventService.getAll()
      .then(response => {
        let electoralEvents = [];
        for (const electoralEvent of response) {
          const publickey = nemAccountService.generatePublicKey(electoralEvent.data.name);
          electoralEvent.data['publickey'] = publickey;
          electoralEvent.data['key'] = publickey;
          electoralEvents.push(electoralEvent.data)
        }
        this.setState({ electoralEvents, loading: false });
      })
  }

  render() {
    return (
      <div>
        <Table
          loading={this.state.loading}
          scroll={{ x: true }}
          columns={columns}
          dataSource={this.state.electoralEvents}
          bordered={true}
          size='default'
        />
      </div>
    );
  }
}

export { ElectoralEventList };