import React, { Component } from 'react';

import {
  Table,
  Icon,
  Button,
  Form
} from 'antd';

import { Link } from "react-router-dom";

import { pathRoutes } from "../../@constans";
import { electionService } from '../../@services';

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
  {
    title: 'Tipo Elección',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
  },
  {
    title: 'Facultad',
    dataIndex: 'facultyId',
    key: 'facultyId',
    align: 'center',
  },
  {
    title: 'Escuela',
    dataIndex: 'schoolId',
    key: 'schoolId',
    align: 'center',
  },
  {
    title: 'Ver',
    key: 'see',
    align: 'center',
    render: (text, election) => (
      <span>
        <Link to={{ pathname: pathRoutes.ELECTIONSEDIT.replace(':electoralEventPublickey', election.electoralEvent.publickey).replace(':id', election.id), state: { election } }}>
          <Icon type="eye" />
        </Link>
      </span>
    ),
  },
];

class ElectionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      electoralEvent: props.location.state.electoralEvent,
      elections: []
    }
  }

  componentDidMount = () => {
    this.getElections();
  }

  getElections = () => {
    this.setState({ loading: true });
    electionService.getAll(this.state.electoralEvent.publickey)
      .then(response => {
        let elections = [];
        for (const election of response) {
          election['electoralEvent'] = this.state.electoralEvent;
          election['key'] = election.id
          elections.push(election);
        }
        this.setState({ elections, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      })
  }

  // getFaculties = () => {
  //   this.setState({ loading: true });
  //   facultyService.getAll()
  //     .then(response => {
  //       let faculties = [];
  //       for (const faculty of response) {
  //         faculty['key'] = faculty.id
  //         faculties.push(faculty);
  //       }
  //       this.setState({ faculties, loading: false });
  //     })
  //     .catch(error => {
  //       this.setState({ loading: false });
  //     })
  // }

  createElections = () => {
    this.props.history.push({
      pathname: pathRoutes.ELECTIONSCREATE.replace(':electoralEventPublickey', this.state.electoralEvent.publickey),
      state: { electoralEvent: this.state.electoralEvent }
    })
  }

  render() {
    return (
      <div>
        <Form.Item className='float-left' style={{ marginBottom: '0px' }}>
          <h1 >Evento Electoral: <span style={{ fontWeight: 400 }} >{this.state.electoralEvent.name}</span></h1>
        </Form.Item>

        <Form.Item style={{ marginBottom: '0px' }}>
          <Button
            type='primary'
            onClick={this.createElections}
            style={{ float: 'right' }}
          >
            CREAR
          </Button>
        </Form.Item>
        <Table
          loading={this.state.loading}
          scroll={{ x: true }}
          columns={columns}
          dataSource={this.state.elections}
          bordered={true}
          size='default'
        />
      </div>
    );
  }
}

export { ElectionList };