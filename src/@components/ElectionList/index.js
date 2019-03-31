import React, { Component } from 'react';

import {
  Table,
  Button,
  Form
} from 'antd';

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
    title: 'Nivel Elección',
    dataIndex: 'levelElection',
    key: 'levelElection',
    align: 'center',
  },
  {
    title: 'Tipo Candidato',
    dataIndex: 'typeCandidate',
    key: 'typeCandidate',
    align: 'center',
  },
  {
    title: 'Tipo Elector',
    dataIndex: 'typeElector',
    key: 'typeElector',
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
    title: 'Votos Permitidos',
    dataIndex: 'allowedVotes',
    key: 'allowedVotes',
    align: 'center',
  },
  {
    title: 'Periodo',
    dataIndex: 'period',
    key: 'period',
    align: 'center',
  },
  {
    title: 'Candidatos',
    dataIndex: 'candidates',
    key: 'candidates',
    align: 'center',
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
    electionService.getAll(this.state.electoralEvent.id)
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

  createElections = () => {
    this.props.history.push({
      pathname: pathRoutes.ELECTIONSCREATE.replace(':electoralEventPublickey', this.state.electoralEvent.publickey),
      state: { electoralEvent: this.state.electoralEvent }
    })
  }

  render() {
    return (
      <div>
        <Form.Item className='float-left' >
          <h1 >Evento Electoral {this.state.electoralEvent.name}</h1>
        </Form.Item>

        <Form.Item  >
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