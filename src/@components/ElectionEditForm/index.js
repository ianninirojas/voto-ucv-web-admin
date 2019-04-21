import React, { Component } from 'react';

import {
  Form,
  Input,
  Table
} from "antd";

import {
  facultyService,
  schoolService
} from '../../@services';

import { TypeCandidate } from '../../@constans';


class ElectionEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      election: this.props.location.state.election,
    }
    this.CandidatesFormComponentRef = React.createRef();
  }

  componentDidMount = () => {
    this.getFaculties();
  }

  // GETS
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

  getSchools = (facultyId) => {
    this.setState({ loading: true });
    schoolService.getAll(facultyId)
      .then(response => {
        let schools = [];
        for (const school of response) {
          schools.push(school);
        }
        this.setState({ schools, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      })
  }
  // GETS

  // RENDER

  CandidatesUninominal = () => {
    const candidates = this.state.election.candidates;
    const position = candidates[0].position;
    const columns = [
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: 'CI',
        dataIndex: 'identityDocument',
        key: 'identityDocument',
        align: 'center',
      }
    ];
    return (
      <div>
        <Form.Item
          label={(
            <span>Cargo</span>
          )}
        >
          <Input value={position} disabled={true} />
        </Form.Item>
        <Form.Item
          label={(
            <span>Candidatos</span>
          )}
        >
          <Table
            dataSource={candidates}
            columns={columns}
            pagination={false}
            bodyStyle={{ backgroundColor: 'none' }}
          />
        </Form.Item>
      </div>
    );
  }

  CandidatesList = () => {
    let candidates = [...this.state.election.candidates];
    let listNames = [];

    for (const candidate of candidates) {
      candidate.key = candidate.identityDocument;
      if (!listNames.includes(candidate.listName))
        listNames.push(candidate.listName);
    }

    let lists = [];

    for (const listName of listNames) {
      let list = {
        listName: listName,
        candidates: []
      }
      for (let i = 0; i < candidates.length; i++) {
        const candidate = candidates[i];
        if (candidate.listName === listName) {
          list.candidates.push(candidate);
        }
      }
      lists.push(list);
    }

    const columns = [
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: 'CI',
        dataIndex: 'identityDocument',
        key: 'identityDocument',
        align: 'center',
      },
      {
        title: 'Cargo',
        dataIndex: 'position',
        key: 'position',
        align: 'center',
      }
    ];

    lists = lists.map(list => {
      return (
        < Table
          key={list.listName}
          dataSource={list.candidates}
          columns={columns}
          pagination={false}
          title={() => <h4>{list.listName}</h4>}
          bodyStyle={{ backgroundColor: 'none' }
          }
        />
      )
    })

    return (
      <Form.Item
        label={(
          <span>Planchas</span>
        )}
      >
        {lists}
      </Form.Item>
    );
  }

  Candidates = () => {
    const typeCandidate = this.state.election.typeCandidate;
    const { CandidatesUninominal, CandidatesList } = this;
    let render;
    if (typeCandidate === TypeCandidate.uninominal) {
      render = <CandidatesUninominal />
    }
    else if (typeCandidate === TypeCandidate.list) {
      render = <CandidatesList />;
    }
    return render;
  }
  // RENDER

  render() {
    const { getFieldDecorator } = this.props.form;
    const { Candidates } = this;
    return (
      <div>
        <h1 >Evento Electoral: <span style={{ fontWeight: 400 }} >{this.state.election.electoralEvent.name}</span></h1>
        <Form>
          {/* NAME */}
          <Form.Item
            label={(
              <span>Nombre</span>
            )}
          >
            {getFieldDecorator('name', {
              initialValue: this.state.election.name,
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* NAME */}

          {/* LEVEL ELECTION */}
          <Form.Item
            label={(
              <span>Nivel Elección</span>
            )}
          >
            {getFieldDecorator('levelElection', {
              initialValue: this.state.election.levelElection,
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* LEVEL ELECTION */}

          {/* TYPE */}
          <Form.Item
            label={(
              <span>Tipo Elección</span>
            )}
          >
            {getFieldDecorator('type', {
              initialValue: this.state.election.type,
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* TYPE */}

          {/* TYPE ELECTOR */}
          <Form.Item
            label={(
              <span>Tipo Elector</span>
            )}
          >
            {getFieldDecorator('typeElector', {
              initialValue: this.state.election.typeElector,
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* TYPE ELECTOR */}

          {/* FACULTY */}
          <Form.Item
            label={(
              <span>Facultad</span>
            )}
          >
            {getFieldDecorator('facultyId', {
              initialValue: this.state.election.facultyId,
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* FACULTY */}

          {/* SCHOOL */}
          <Form.Item
            label={(
              <span>Escuela</span>
            )}
          >
            {getFieldDecorator('schoolId', {
              initialValue: this.state.election.schoolId,
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* SCHOOL */}

          {/* ALLOWED VOTES */}
          <Form.Item
            label={(
              <span>Número Votos</span>
            )}
          >
            {getFieldDecorator('allowedVotes', {
              initialValue: this.state.election.allowedVotes,
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* ALLOWED VOTES */}

          {/* PERIOD */}
          <Form.Item
            label={(
              <span>Periodo</span>
            )}
          >
            {getFieldDecorator('period', {
              initialValue: this.state.election.period,
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* PERIOD */}

          {/* TYPE CANDIDATE */}
          <Form.Item
            label={(
              <span>Tipo Candidato</span>
            )}
          >
            {getFieldDecorator('typeCandidate', {
              initialValue: this.state.election.typeCandidate,
            })(
              <Input disabled={true} />
            )}
          </Form.Item>
          {/* TYPE CANDIDATE */}

          {/* CANDIDATES */}
          <Candidates />
          {/* CANDIDATES */}
        </Form>
      </div >
    );
  }
}

const ElectionEditForm = Form.create({ name: 'election-edit-form' })(ElectionEdit);

export { ElectionEditForm };