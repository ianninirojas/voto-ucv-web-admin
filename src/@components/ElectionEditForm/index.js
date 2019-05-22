import React, { Component } from 'react';

import {
  Form,
  Input,
  Table,
  Button,
  message,
  Alert
} from "antd";

import moment from 'moment';

import { CandidateForm } from "../../@components";

import {
  schoolService,
  facultyService,
  electionService
} from '../../@services';

import { TypeCandidate, pathRoutes } from '../../@constans';

class ElectionEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      election: this.props.location.state.election,
      electoralEvent: this.props.location.state.electoralEvent,
      loadingRegisterCandidates: false,
      bHasErrorCandidates: false,
      candidates: [],
      notValidCandidates: []
    }
    this.CandidatesFormComponentRef = React.createRef();
    console.log('this.state.election :', this.state.election);
  }

  componentDidMount = () => {
    this.getFaculties();
  }

  checkDateRegisterCandidates = () => {
    const dateFormat = "DD-MM-YYYY H:mm";
    const today = moment();

    const startDateRegisterCandidate = moment(this.state.electoralEvent.startDateRegisterCandidate, dateFormat);
    const endDateRegisterCandidate = moment(this.state.electoralEvent.endDateRegisterCandidate, dateFormat);
    return today.isBetween(startDateRegisterCandidate, endDateRegisterCandidate);
  }

  hasCandidates = () => {
    return this.state.election.candidates.length > 0;
  }

  setCandidates = () => {
    this.setState({ bHasErrorCandidates: false })
  }

  associateCandidates = () => {
    if (this.CandidatesFormComponentRef.current.getCandidates().length === 0) {
      this.setState({ bHasErrorCandidates: true })
    }
    else {
      this.setState({ loadingRegisterCandidates: true });
      const candidates = [...this.CandidatesFormComponentRef.current.getCandidates()];
      const values = { election: this.state.election, candidates }
      electionService.associateCandidates(this.state.electoralEvent.publickey, values)
        .then(response => {
          message.success('Candidatos Registrados');
          this.props.history.push({
            pathname: pathRoutes.ELECTIONS.replace(':electoralEventPublickey', this.state.electoralEvent.publickey),
            state: { electoralEvent: this.state.electoralEvent }
          })
        })
        .catch(error => {
          this.setState({ loadingRegisterCandidates: false });
          if (error.code === '00') {
            this.notValidCandidates(error.notValidCandidates);
          }
          else { message.error('Ocurrió un error'); this.handleError(error); }
        })
    }
  }

  notValidCandidates = (notValidCandidates) => {
    this.setState({ notValidCandidates });
    this.setState({ notValidCandidates: [] });
  }

  handleError = (error) => {
    let errorApi = [];
    if (typeof error === 'object' && error.constructor === Array) {
      error.forEach(err => {
        for (const key in err) {
          if (err.hasOwnProperty(key)) {
            const element = err[key];
            errorApi.push(element);
          }
        }
      });
    }
    else {
      errorApi.push(error.message);
    }
    this.setState({ errorApi: errorApi });
  }

  ErrorApi = () => {
    return (
      <Form.Item>
        {this.state.errorApi.map((error, index) => <Alert message={error} type='error' key={index} />)}
      </Form.Item>
    )
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
    const { CandidatesUninominal, CandidatesList, ErrorApi } = this;
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
          {(!this.checkDateRegisterCandidates() && !this.hasCandidates()) ? (
            <div>
              <CandidateForm
                bHasError={this.state.bHasErrorCandidates}
                typeCandidate={this.props.form.getFieldValue('typeCandidate')}
                setCandidates={this.setCandidates}
                notValidCandidates={this.state.notValidCandidates}
                ref={this.CandidatesFormComponentRef}
                {...this.props}
              />
              < Form.Item className='float-right' style={{}}>
                <Button
                  type='default'
                  loading={this.state.loadingRegisterCandidates}
                  onClick={this.associateCandidates}
                >
                  REGISTRAR CANDIDATOS
              </Button>
              </Form.Item>
            </div>
          ) : (
              <Candidates />
            )}
          {/* CANDIDATES */}

          {/* API ERROR */}
          {/* {this.state.errorApi.length > 0 && (
            <ErrorApi />
          )} */}
          {/* API ERROR */}

        </Form>
      </div >
    );
  }
}

const ElectionEditForm = Form.create({ name: 'election-edit-form' })(ElectionEdit);

export { ElectionEditForm };