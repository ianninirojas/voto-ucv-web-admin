import React, { Component } from 'react';

import {
  Form,
  Alert,
  Input,
  Button,
  Select,
  message,
  Popconfirm,
  DatePicker,
} from "antd";

import locale from 'antd/lib/date-picker/locale/es_ES';

import moment from 'moment';

import 'moment/locale/es';

import {
  schoolService,
  facultyService,
  electionService,
  typeElectionService,
} from '../../@services';

import {
  pathRoutes,
  TypeElector,
  TypeCandidate,
  LevelElection,
} from '../../@constans';

import { CandidateForm } from '../CandidateForm';

const { RangePicker } = DatePicker;

class ElectionCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      electoralEvent: this.props.location.state.electoralEvent,
      loading: false,
      errorApi: [],
      typesElection: [],
      typesElectionSelected: [],
      faculties: [],
      schools: [],
      candidates: [],
      bHasErrorCandidates: false
    }
    this.CandidatesFormComponentRef = React.createRef();
  }

  componentDidMount = () => {
    this.getTypesElection();
    this.getFaculties();
  }

  // GETS
  getTypesElection = () => {
    this.setState({ loading: true });
    typeElectionService.getAll()
      .then(response => {
        let typesElection = [];
        for (const typeElection of response) {
          typeElection['key'] = typeElection.id
          typesElection.push(typeElection);
        }
        this.setState({ typesElection, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      })
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

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (this.CandidatesFormComponentRef.current.getCandidates().length === 0) {
        this.setState({ bHasErrorCandidates: true })
      }
      else if (!err) {
        this.setState({ loading: true });
        const candidates = [...this.CandidatesFormComponentRef.current.getCandidates()];
        values = { ...values, candidates }
        const dateFormat = "DD/MM/YYYY";
        let startDatePeriod = moment(values.date[0], dateFormat).format(dateFormat);
        let endDatePeriod = moment(values.date[1], dateFormat).format(dateFormat);
        values['period'] = `${startDatePeriod} - ${endDatePeriod}`;
        electionService.create(this.state.electoralEvent.publickey, values)
          .then(response => {
            message.success('Elección creada');
            this.props.history.push(pathRoutes.ELECTORALEVENTS)
          })
          .catch(error => {
            this.setState({ loading: false });
            message.error('Ocurrio un error');
            this.handleError(error);
          })
      }
    });
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

  // SELECT OPTIONS
  levelElectionOptions = () => {
    let levelsElection = [];
    for (const keyLevelElection in LevelElection) {
      if (LevelElection.hasOwnProperty(keyLevelElection)) {
        const levelElection = LevelElection[keyLevelElection];
        levelsElection.push(levelElection);
      }
    }
    return (levelsElection.map(levelElection => <Select.Option key={levelElection}>{levelElection}</Select.Option>));
  }

  typesElectionOptions = () => {
    return (this.state.typesElectionSelected.map(typeElection => <Select.Option key={typeElection.name}>{typeElection.name}</Select.Option>));
  }

  typesElectorOptions = () => {
    let typesElector = [];
    for (const keyTypeElector in TypeElector) {
      if (TypeElector.hasOwnProperty(keyTypeElector)) {
        const typeElector = TypeElector[keyTypeElector];
        typesElector.push(typeElector);
      }
    }
    return (typesElector.map(typeElector => <Select.Option key={typeElector}>{typeElector}</Select.Option>));
  }

  typesCandidateOptions = () => {
    let typesCandidate = [];
    for (const keyTypeCandidate in TypeCandidate) {
      if (TypeCandidate.hasOwnProperty(keyTypeCandidate)) {
        const typeCandidate = TypeCandidate[keyTypeCandidate];
        typesCandidate.push(typeCandidate);
      }
    }
    return (typesCandidate.map(typeCandidate => <Select.Option key={typeCandidate}>{typeCandidate}</Select.Option>));
  }

  facultyOptions = () => {
    return (this.state.faculties.map(faculty => <Select.Option key={faculty.code}>{faculty.name}</Select.Option>));
  }

  schoolOptions = () => {
    return (this.state.schools.map(school => <Select.Option key={school.code}>{school.name}</Select.Option>));
  }

  // SELECT OPTIONS

  // HANDLE CHANGE
  handleLevelElectionChange = (levelElection) => {
    const typesElectionSelected = this.state.typesElection.filter(typeElection => typeElection.levelElection === levelElection);
    this.setState({ typesElectionSelected });
  }

  handleFacultyChange = (facultyId) => {
    this.getSchools(facultyId);
  }
  // HANDLE CHANGE

  setCandidates = () => {
    this.setState({ bHasErrorCandidates: false })
  }

  // FIELD RULES
  isNumber = (rule, value, callback) => {
    if (!isNaN(value)) {
      callback();
      return;
    }
    callback('Debe ser un número');
  }

  disabledDate = (current) => {
    return current < moment().endOf('day').subtract(1, 'day');
  }
  // FIELD RULES

  render() {
    const { ErrorApi } = this;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h1 >Evento Electoral: <span style={{ fontWeight: 400 }} >{this.state.electoralEvent.name}</span></h1>
        <Form>
          {/* NAME */}
          <Form.Item
            label={(
              <span>Nombre</span>
            )}
          >
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: 'Requerido' }
              ],
            })(
              <Input placeholder="Nombre" />
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
              rules: [
                { required: true, message: 'Requerido' }
              ],
            })(
              <Select placeholder="Nivel Elección" onChange={this.handleLevelElectionChange}>
                {this.levelElectionOptions()}
              </Select>
            )}
          </Form.Item>
          {/* LEVEL ELECTION */}

          {/* TYPE */}
          {this.props.form.getFieldValue('levelElection') && (
            <Form.Item
              label={(
                <span>Tipo Elección</span>
              )}
            >
              {getFieldDecorator('type', {
                rules: [
                  { required: true, message: 'Requerido' }
                ],
              })(
                <Select placeholder="Tipo Elección" >
                  {this.typesElectionOptions()}
                </Select>
              )}
            </Form.Item>
          )}
          {/* TYPE */}

          {/* TYPE ELECTOR */}
          <Form.Item
            label={(
              <span>Tipo Elector</span>
            )}
          >
            {getFieldDecorator('typeElector', {
              rules: [
                { required: true, message: 'Requerido' }
              ],
            })(
              <Select placeholder="Tipo Elector" >
                {this.typesElectorOptions()}
              </Select>
            )}
          </Form.Item>
          {/* TYPE ELECTOR */}

          {/* FACULTY */}
          {(this.props.form.getFieldValue("levelElection") === LevelElection.faculty || this.props.form.getFieldValue("levelElection") === LevelElection.school) && (
            <Form.Item
              label={(
                <span>Facultad</span>
              )}
            >
              {getFieldDecorator('facultyId', {
                rules: [
                  { required: true, message: 'Requerido' }
                ],
              })(
                <Select placeholder="Facultad" onChange={this.handleFacultyChange}>
                  {this.facultyOptions()}
                </Select>
              )}
            </Form.Item>
          )}
          {/* FACULTY */}

          {/* SCHOOL */}
          {this.props.form.getFieldValue("levelElection") === LevelElection.school && (
            <Form.Item
              label={(
                <span>Escuela</span>
              )}
            >
              {getFieldDecorator('schoolId', {
                rules: [
                  { required: true, message: 'Requerido' }
                ],
              })(
                <Select placeholder="Escuela">
                  {this.schoolOptions()}
                </Select>
              )}
            </Form.Item>
          )}
          {/* SCHOOL */}

          {/* ALLOWED VOTES */}
          <Form.Item
            label={(
              <span>Número Votos</span>
            )}
          >
            {getFieldDecorator('allowedVotes', {
              rules: [
                { required: true, message: 'Requerido' },
                { validator: this.isNumber, message: 'Debe ser número' }
              ],
            })(
              <Input placeholder="Número Votos" />
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
              rules: [
                { required: true, type: 'array', message: 'Requerido' },
              ],
            })(
              <RangePicker
                locale={locale}
                disabledDate={this.disabledDate}
                format='DD-MM-YYYY'
                placeholder={['Comienzo', 'Fin']}
              />
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
              rules: [
                { required: true, message: 'Requerido' }
              ],
            })(
              <Select placeholder="Tipo Candidato" >
                {this.typesCandidateOptions()}
              </Select>
            )}
          </Form.Item>
          {/* TYPE CANDIDATE */}

          {/* CANDIDATES */}
          {this.props.form.getFieldValue('typeCandidate') !== undefined && (
            <CandidateForm
              bHasError={this.state.bHasErrorCandidates}
              typeCandidate={this.props.form.getFieldValue('typeCandidate')}
              setCandidates={this.setCandidates}
              ref={this.CandidatesFormComponentRef}
              {...this.props}
            />
          )}
          {/* CANDIDATES */}

          {/* API ERROR */}
          {this.state.errorApi.length > 0 && (
            <ErrorApi />
          )}
          {/* API ERROR */}

          < Form.Item className='float-right' >
            <Popconfirm title="Esta información no puede ser modificada" onConfirm={this.handleSubmit}>
              <Button
                type='primary'
                loading={this.state.loading}
              >
                CREAR
            </Button>
            </Popconfirm>
          </Form.Item>

        </Form>
      </div >
    );
  }
}

const ElectionCreateForm = Form.create({ name: 'election-create-form' })(ElectionCreate);

export { ElectionCreateForm };