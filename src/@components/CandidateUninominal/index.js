import React, { Component } from "react";
import { Table, Input, Icon, Button, Popconfirm, Form, Select } from 'antd';

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
        <Form.Item style={{marginBottom: '0px'}}>
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
            name={`name${record.key}`}
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
            name={`identityDocument${record.key}`}
            rules={[
              { required: true, message: "Requerido" },
              { min: 7, message: 'Cantidad número mayor a 7' },
              { max: 8, message: 'Cantidad número menor a 8' },
              { pattern: /^[0-9\s]+$/, message: "Only number" }
            ]}
          >
            <Input onChange={(value) => this.onCellChange(value.target.value, record.key, 'identityDocument')} />
          </EditableCell>
        ),
      },
      {
        title: 'Cargo',
        dataIndex: 'position',
        width: '15%',
        align: 'center',
        render: (text, record) => (
          <EditableCell
            form={this.props.form}
            value={text}
            name={`position${record.key}`}
            rules={[
              { required: true, message: "Requerido" }
            ]}
          >
            <Select onChange={(value) => this.onCellChange(value, record.key, 'position')} >
              {this.positionOptions()}
            </Select>
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
                <Popconfirm title="¿Eliminar?" onConfirm={() => this.onDelete(record.key)}>
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

  onDelete = (key) => {
    const candidates = [...this.state.candidates];
    let newDataSource = candidates.filter(item => item.key !== key);
    this.setState({ candidates: newDataSource });
    this.props.setCandidate(newDataSource);
  }

  handleAdd = () => {
    const { count, candidates } = this.state;
    const newData = {
      key: count,
      name: '',
      identityDocument: '',
      position: ''
    };
    let newDataSource = [...candidates, newData];
    this.setState({
      candidates: newDataSource,
      count: count + 1,
    });
    this.props.setCandidate(newDataSource);
  }

  hasError = (hasError) => {
    const button = document.getElementById("table-candidates");
    const error = document.getElementById("add-new-size-error");
    if (hasError) {
      button.scrollIntoView();
      error.classList.add('has-error');
    }
    else {
      error.classList.remove('has-error');
    }
    this.setState({ bErrorMessage: hasError });
  }

  render() {
    const { candidates } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Table
          id="table-candidates"
          dataSource={candidates}
          columns={columns}
          pagination={false}
          title={() => <h1>Candidatos</h1>}
          bodyStyle={{ backgroundColor: 'none' }}
        />
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{ marginTop: 16, marginBottom: 10 }}>
          AGREGAR CANDIDATO
				</Button>
        <div id="add-new-size-error" className="ant-form-item-control">
          {this.state.bErrorMessage && (
            <div className="ant-form-explain">Por favor agrega al menos un candidato</div>
          )}
        </div>
      </div>
    );
  }
}

export { CandidateUninominal };