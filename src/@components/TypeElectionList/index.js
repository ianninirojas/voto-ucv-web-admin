import React, { Component } from 'react';

import {
  Table
  , Icon
} from 'antd';

import { Link } from "react-router-dom";

import { pathRoutes } from "../../@constans";
import { typeElectionService } from '../../@services';

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: 'Nivel Elección',
    dataIndex: 'levelElection',
    key: 'levelElection',
    align: 'center',
  },
  {
    title: 'Ver',
    key: 'see',
    align: 'center',
    render: (text, typeElection) => (
      <span>
        <Link to={{ pathname: pathRoutes.TYPESELECTIONEDIT.replace(':id', typeElection.id), state: { typeElection } }}>
          <Icon type="eye" />
        </Link>
      </span>
    ),
  }
];

class TypeElectionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      typeElections: []
    }
  }

  componentDidMount = () => {
    this.getTypeElections();
  }

  getTypeElections = () => {
    this.setState({ loading: true });
    typeElectionService.getAll()
      .then(response => {
        let typeElections = [];
        for (const typeElection of response) {
          typeElection['key'] = typeElection.id
          typeElections.push(typeElection);
        }
        this.setState({ typeElections, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      })
  }

  render() {
    return (
      <div>
        <Table
          loading={this.state.loading}
          scroll={{ x: true }}
          columns={columns}
          dataSource={this.state.typeElections}
          bordered={true}
          size='default'
        />
      </div>
    );
  }
}

export { TypeElectionList };