import React, { Component } from 'react';

import {
  Table
  , Icon
} from 'antd';

import { Link } from "react-router-dom";

import { pathRoutes } from "../../@constans";
import { positionService } from '../../@services';

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: 'Ver',
    key: 'see',
    align: 'center',
    render: (text, position) => (
      <span>
        <Link to={{ pathname: pathRoutes.POSITIONSEDIT.replace(':id', position.id), state: { position } }}>
          <Icon type="eye" />
        </Link>
      </span>
    ),
  }
];

class PositionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      positions: []
    }
  }

  componentDidMount = () => {
    this.getPositions();
  }

  getPositions = () => {
    this.setState({ loading: true });
    positionService.getAll()
      .then(response => {
        let positions = [];
        for (const position of response) {
          position['key'] = position.id
          positions.push(position);
        }
        this.setState({ positions, loading: false });
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
          dataSource={this.state.positions}
          bordered={true}
          size='default'
        />
      </div>
    );
  }
}

export { PositionList };