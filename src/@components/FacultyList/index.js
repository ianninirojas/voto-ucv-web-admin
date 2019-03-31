import React, { Component } from 'react';

import {
  Table
  , Icon
} from 'antd';

import { Link } from "react-router-dom";

import { pathRoutes } from "../../@constans";
import { facultyService } from '../../@services';

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
    render: (text, faculty) => (
      <span>
        <Link to={{ pathname: pathRoutes.FACULTIESEDIT.replace(':id', faculty.id), state: { faculty } }}>
          <Icon type="eye" />
        </Link>
      </span>
    ),
  },
  {
    title: 'Escuelas',
    key: 'schools',
    align: 'center',
    render: (text, faculty) => (
      <span>
        <Link to={{ pathname: pathRoutes.SCHOOLS.replace(':facultyId', faculty.id), state: { faculty } }}>
          <Icon type="eye" />
        </Link>
      </span>
    ),
  }];

class FacultyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      faculties: []
    }
  }

  componentDidMount = () => {
    this.getFaculties();
  }

  getFaculties = () => {
    this.setState({ loading: true });
    facultyService.getAll()
      .then(response => {
        let faculties = [];
        for (const faculty of response) {
          faculty['key'] = faculty.id
          faculties.push(faculty);
        }
        this.setState({ faculties, loading: false });
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
          dataSource={this.state.faculties}
          bordered={true}
          size='default'
        />
      </div>
    );
  }
}

export { FacultyList };