import React, { Component } from 'react';

import {
  Table
  , Icon
} from 'antd';

import { Link } from "react-router-dom";

import { pathRoutes } from "../../@constans";
import { userService } from '../../@services';

const columns = [
  {
    title: 'Usuario',
    dataIndex: 'username',
    key: 'username',
    align: 'center',
  },
  {
    title: 'Rol',
    dataIndex: 'role',
    key: 'role',
    align: 'center',
  },
  {
    title: 'Ver',
    key: 'see',
    align: 'center',
    render: (text, user) => (
      <span>
        <Link to={{ pathname: pathRoutes.USERSEDIT.replace(':id', user.id), state: { user } }}>
          <Icon type="eye" />
        </Link>
      </span>
    ),
  }
];

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      users: []
    }
  }

  componentDidMount = () => {
    this.getUsers();
  }

  getUsers = () => {
    this.setState({ loading: true });
    userService.getAll()
      .then(response => {
        let users = [];
        for (const user of response) {
          user['key'] = user.id
          users.push(user);
        }
        this.setState({ users, loading: false });
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
          dataSource={this.state.users}
          bordered={true}
          size='default'
        />
      </div>
    );
  }
}

export { UserList };