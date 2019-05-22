import React, { Component } from 'react';

import {
  Table,
  Icon,
  Button,
  Form
} from 'antd';

import { Link } from "react-router-dom";

import { pathRoutes } from "../../@constans";
import { electionService, facultyService, schoolService } from '../../@services';


class ElectionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      electoralEvent: props.location.state.electoralEvent,
      elections: [],
      faculties: []
    }

    this.columns = [
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
            <Link to={{
              pathname: pathRoutes.ELECTIONSEDIT.replace(':electoralEventPublickey', election.electoralEvent.publickey).replace(':id', election.id),
              state: { election, electoralEvent: this.state.electoralEvent }
            }}>
              <Icon type="eye" />
            </Link>
          </span>
        ),
      },
    ];
  }

  componentDidMount = async () => {
    await this.getFaculties();
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
          if (parseInt(election.facultyId) === parseInt('00')) {
            election['facultyId'] = 'Toda'
          }
          else {
            const faculty = this.state.faculties.find(faculty => parseInt(faculty.id) === parseInt(election.facultyId));
            election['facultyId'] = faculty.name
            election['schoolId'] = (faculty.schools.find(school => parseInt(school.id) === parseInt(election.schoolId))).name
          }
          if (parseInt(election.schoolId) === parseInt('00')) {
            election['schoolId'] = 'Toda'
          }

          elections.push(election);
        }
        this.setState({ elections, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      })
  }

  getFaculties = () => {
    this.setState({ loading: true });
    return new Promise((resolve, reject) => {
      facultyService.getAll()
        .then(async response => {
          let faculties = [];
          for (const faculty of response) {
            faculty['key'] = faculty.id
            faculty['schools'] = await schoolService.getAll(faculty.id);
            faculty['schools'] = faculty['schools'].map(school => { school['key'] = `${faculty['key']}.${school.id}`; return school; })
            faculties.push(faculty);
          }
          resolve(this.setState({ faculties, loading: false }))
        })
        .catch(error => {
          console.log('error', error)
        })
    })
  }

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
          columns={this.columns}
          dataSource={this.state.elections}
          bordered={true}
          size='default'
        />
      </div>
    );
  }
}

export { ElectionList };