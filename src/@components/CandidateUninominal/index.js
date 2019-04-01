import React, { Component } from "react";
import {
  Table,
  Input,
  Icon,
  Button,
  Popconfirm,
  Form,
  Select,
  message
} from 'antd';

class EditableCell extends Component {
  state = {
    name: this.props.name,
    value: this.props.value,
    rules: this.props.rules,
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="editable-cell">
        <Form.Item style={{ marginBottom: '0px' }}>
          {getFieldDecorator(this.state.name, {
            rules: this.state.rules,
            initialValue: this.state.value
          })(
            this.props.children
          )}
        </Form.Item>
      </div>
    );
  }
}
class CandidateUninominal extends Component {
  constructor(props) {
    super(props);

    this.columns = [
      {
        title: 'Nombre',
        dataIndex: 'name',
        width: '15%',
        align: 'center',
        render: (text, record) => (
          <EditableCell
            form={this.props.form}
            value={text}
            name={`name-${record.key}`}
            rules={[
              { required: true, message: "Requerido" }
            ]}
          >
            <Input onChange={(value) => this.onCellChange(value.target.value, record.key, 'name')} />
          </EditableCell>
        )
      },
      {
        title: 'CI',
        dataIndex: 'identityDocument',
        width: '15%',
        align: 'center',
        render: (text, record) => (
          <EditableCell
            form={this.props.form}
            value={text}
            name={`identityDocument-${record.key}`}
            rules={[
              { required: true, message: "Requerido" },
              { min: 7, message: 'Cantidad número mayor a 7' },
              { max: 8, message: 'Cantidad número menor a 8' },
              { pattern: /^[0-9\s]+$/, message: "Solo números" },
              { validator: this.notSameIdentityDocument }
            ]}
          >
            <Input onChange={(value) => this.onCellChange(value.target.value, record.key, 'identityDocument')} />
          </EditableCell>
        ),
      },
      {
        title: '',
        dataIndex: '',
        width: '1%',
        align: 'center',
        render: (text, record) => {
          return (
            this.state.candidates.length > 0 ?
              (
                <Popconfirm title="¿Eliminar?" onConfirm={() => this.handleDeleteCandidate(record.key)}>
                  <Icon type="delete" />
                </Popconfirm>
              ) : null
          );
        },
      }
    ];

    this.state = {
      candidates: [],
      count: 0,
      bErrorMessage: false
    };
    this.hasError = this.hasError.bind(this);
  }

  componentDidMount = () => {
    // this.addCandidate()
  }

  componentWillReceiveProps(props) {
    this.hasError(props.bHasError);
  }

  positionOptions = () => {
    return (this.props.positions.map(position => <Select.Option key={position.name}>{position.name}</Select.Option>));
  }

  onCellChange = (value, key, dataIndex) => {
    const candidates = [...this.state.candidates];
    const target = candidates.find(item => item.key === key);
    if (target) {
      target[dataIndex] = value;
      this.setState({ candidates });
    }
  }

  notSameIdentityDocument = (rule, value, callback) => {
    const actualField = rule.field.split('-')[1];
    for (let i = 0; i < this.state.count; i++) {
      if (i != actualField) {
        if (this.props.form.getFieldValue(`identityDocument-${i}`) === value) {
          callback('Otro candidato tiene mismo CI')
        }
      }
    }
    callback()
    return;
  }

  handleDeleteCandidate = (key) => {
    const candidates = [...this.state.candidates];
    if (candidates.length > 1) {
      let newDataSource = candidates.filter(item => item.key !== key);
      this.setState({ candidates: newDataSource });
      this.props.setCandidates(newDataSource);
    }
    else {
      message.error('Debe haber al menos un candidato');
    }
  }

  handleAddCandidate = () => {
    const positionSelected = this.props.form.getFieldValue(`positionSelected`);
    if (!positionSelected) {
      message.error('Debe seleccionar el cargo de la elección');
    }
    else {
      this.addCandidate()
    }
  }

  addCandidate = () => {
    const { count, candidates } = this.state;
    const positionSelected = this.props.form.getFieldValue(`positionSelected`)
    const newData = {
      key: count,
      name: '',
      identityDocument: '',
      position: positionSelected
    };
    let newDataSource = [...candidates, newData];
    this.setState({
      candidates: newDataSource,
      count: count + 1,
    });
    this.props.setCandidates(newDataSource);
  }

  hasError = (hasError) => {
    const positionSelected = this.props.form.getFieldValue(`positionSelected`);
    if (positionSelected) {
      const error = document.getElementById("add-new-candidate-error");
      if (hasError) {
        error.classList.add('has-error');
      }
      else {
        error.classList.remove('has-error');
      }
      this.setState({ bErrorMessage: hasError });
    }
  }

  render() {
    const { candidates } = this.state;
    const columns = this.columns;
    const { getFieldDecorator } = this.props.form;
    const positionSelected = this.props.form.getFieldValue(`positionSelected`)
    return (
      <div>
        <Form.Item
          label={(
            <span>Cargo</span>
          )}
          style={{ marginBottom: '8px' }}
        >
          {getFieldDecorator(`positionSelected`, {
            rules: [
              { required: true, message: 'Requerido' }
            ]
          })(
            <Select>
              {this.positionOptions()}
            </Select>
          )}
        </Form.Item>
        {positionSelected && (
          <div>
            <Table
              id="table-candidates"
              dataSource={candidates}
              columns={columns}
              pagination={false}
              title={() => <h1>Candidatos </h1>}
              bodyStyle={{ backgroundColor: 'none' }}
            />
            <Button
              onClick={this.handleAddCandidate}
              type="primary"
              style={{ marginTop: 16, marginBottom: 10 }}>
              AGREGAR CANDIDATO
  				  </Button>
          </div>
        )}
        <div id="add-new-candidate-error" className="ant-form-item-control">
          {this.state.bErrorMessage && (
            <div className="ant-form-explain">Por favor agrega al menos un candidato</div>
          )}
        </div>

      </div>
    );
  }
}

export { CandidateUninominal };