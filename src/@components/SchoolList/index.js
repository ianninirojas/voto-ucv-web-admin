import React, { Component } from 'react';

import {
  Table,
  Icon,
  Button,
  Form
} from 'antd';

import { Link } from "react-router-dom";

import { pathRoutes } from "../../@constans";
import { schoolService } from '../../@services';

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: 'Código',
    dataIndex: 'code',
    key: 'code',
    align: 'center',
  },
  {
    title: 'Ver',
    key: 'see',
    align: 'center',
    render: (text, school) => (
      <span>
        <Link to={{ pathname: pathRoutes.SCHOOLSEDIT.replace(':facultyId', school.faculty.id).replace(':id', school.id), state: { school } }}>
          <Icon type="eye" />
        </Link>
      </span>
    ),
  },
];

class SchoolList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      faculty: props.location.state.faculty,
      schools: []
    }
  }

  componentDidMount = () => {
    this.getSchools();
  }

  getSchools = () => {
    this.setState({ loading: true });
    schoolService.getAll(this.state.faculty.id)
      .then(response => {
        let schools = [];
        for (const school of response) {
          school['faculty'] = this.state.faculty;
          school['key'] = school.id
          schools.push(school);
        }
        this.setState({ schools, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      })
  }

  createSchools = () => {
    this.props.history.push({
      pathname: pathRoutes.SCHOOLSCREATE.replace(':facultyId', this.state.faculty.id),
      state: { faculty: this.state.faculty }
    })
  }

  render() {
    return (
      <div>
        <Form.Item className='float-left' style={{ marginBottom: '0px' }}>
          <h1 >Facultad de {this.state.faculty.name}</h1>
        </Form.Item>

        <Form.Item
          style={{ marginBottom: '0px' }}>
          <Button
            type='primary'
            onClick={this.createSchools}
            style={{ float: 'right' }}
          >
            CREAR
          </Button>
        </Form.Item>
        <Table
          loading={this.state.loading}
          scroll={{ x: true }}
          columns={columns}
          dataSource={this.state.schools}
          bordered={true}
          size='default'
        />
      </div>
    );
  }
}

export { SchoolList };