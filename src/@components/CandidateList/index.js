import React, { Component } from "react";
import { Table, Input, Icon, Button, Popconfirm, Form, Select, Modal, message, List } from 'antd';

class CustomFormItem extends Component {
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

class Candidates extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Nombre',
        dataIndex: 'name',
        width: '15%',
        align: 'center',
        render: (text, record) => (
          <CustomFormItem
            form={this.props.form}
            value={text}
            name={`name-${record.key}`}
            rules={[
              { required: true, message: "Requerido" }
            ]}
          >
            <Input onChange={(value) => this.onCellChange(value.target.value, record.key, 'name')} />
          </CustomFormItem>
        )
      },
      {
        title: 'CI',
        dataIndex: 'identityDocument',
        width: '15%',
        align: 'center',
        render: (text, record) => (
          <CustomFormItem
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
          </CustomFormItem>
        ),
      },
      {
        title: 'Cargo',
        dataIndex: 'position',
        width: '15%',
        align: 'center',
        render: (text, record) => (
          <CustomFormItem
            form={this.props.form}
            value={text}
            name={`position-${record.key}`}
            rules={[
              { required: true, message: "Requerido" }
            ]}
          >
            <Select onChange={(value) => this.onCellChange(value, record.key, 'position')} style={{ width: '100%' }}>
              {this.positionOptions()}
            </Select>
          </CustomFormItem>
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
      positions: this.props.positions,
      electedPositions: [],
      allPositions: this.props.positions,
    };

  }

  componentDidMount = () => {
    if (this.props.editList) {
      const count = this.props.editList.candidates.length;
      this.setState({
        candidates: this.props.editList.candidates,
        count
      },
        () => {
          this.selectPosition();
        });
      this.props.setList(this.props.editList.candidates);
    }
    else
      this.addCandidate();
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

  handlePositionChange = (candidate) => {
    let positions = this.state.positions;
    const allPositions = this.state.allPositions;
    const removePostion = allPositions.find(position => position.name === candidate.position);
    if (removePostion)
      positions.push(removePostion);
    this.setState({ positions });
  }

  selectPosition = (positionSelected) => {
    const allPositions = this.state.allPositions;
    const candidates = this.state.candidates;
    let positions = this.state.positions;
    positions = allPositions.filter(position => (position.name !== positionSelected));
    positions = positions.filter(position => (!candidates.some(candidate => candidate.position === position.name)))
    this.setState({ positions });
  }

  positionOptions = () => {
    return (this.state.positions.map(position => <Select.Option key={position.name}>{position.name}</Select.Option>));
  }

  onCellChange = (value, key, dataIndex) => {
    const candidates = [...this.state.candidates];
    const target = candidates.find(item => item.key === key);
    if (target) {
      target[dataIndex] = value;
      this.setState({ candidates },
        () => {
          if (dataIndex === 'position') {
            this.selectPosition(value);
          }
        });
    }
  }

  handleDeleteCandidate = (key) => {
    const candidates = [...this.state.candidates];
    if (candidates.length > 1) {
      candidates.find((candidate, index) => {
        if (candidate.key === key) {
          candidates.splice(index, 1);
          this.handlePositionChange(candidate);
          this.setState({
            candidates,
            count: this.state.count - 1,
          });
          this.props.setList(candidates);
          return candidate;
        }
      });
    }
    else {
      message.error('Debe haber al menos un candidato');
    }
  }

  handleAddCandidate = () => {
    this.props.form.validateFields((err, values) => {
      if (this.state.positions.length === 0) {
        message.error("No se puede agregar mas candidatos");
      }
      else if (!err) {
        this.addCandidate()
      }
      else {
        message.error("Debe completar el candidato");
      }
    });
  }

  addCandidate = () => {
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
    this.props.setList(newDataSource);
  }

  addListName = () => {
    const { getFieldDecorator } = this.props.form;
    let options = {
      rules: [
        { required: true, message: 'Requerido' }
      ],
    }
    if (this.props.editList) {
      options['initialValue'] = this.props.editList.listName;
    }
    return (
      <Form.Item
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 22 }}
        label={(
          <span>Plancha</span>
        )}
      >
        {getFieldDecorator(`listName`, options)(
          <div>
            <Input placeholder="Plancha" />
          </div>
        )}
      </Form.Item>
    )
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
          title={this.addListName}
          bodyStyle={{ backgroundColor: 'none' }}
        />
        <Button
          onClick={this.handleAddCandidate}
          type="primary"
          style={{ marginTop: 16, marginBottom: 10 }}>
          AGREGAR CANDIDATO
				</Button>
      </div>
    );
  }
}

const CandidatesForm = Form.create({})(Candidates)

class CandidateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      count: 0
    }
    this.candidatesFormComponentRef = React.createRef();
  }

  notSameIdentityDocument = (newCandidates) => {
    let err = false;
    let identityDocumentsUsed = [];
    const lists = [...this.state.lists];
    if (this.state.editList) {
      const index = lists.findIndex(list => list.key === this.state.editList.key);
      lists.splice(index, 1);
    }
    for (const list of lists) {
      const candidates = list.candidates;
      for (const candidate of candidates) {
        for (const key in candidate) {
          if (key === 'identityDocument') {
            for (const key2 in newCandidates) {
              if (key2.split('-')[0] === 'identityDocument') {
                if (candidate[key] === newCandidates[key2]) {
                  err = true;
                  identityDocumentsUsed.push(newCandidates[key2]);
                  continue;
                }
              }
            }
          }
        }
      }
    }
    return { err, identityDocumentsUsed }
  }

  notSameListName = (listName) => {
    const lists = this.state.lists;
    const list = lists.find(list => list.listName.toLowerCase() === listName.toLowerCase());
    if (list)
      return true
    else
      return false
  }

  setList = (list) => {
    this.setState({ list });
  }

  handleEditList = (editList) => {
    this.setState({ editList, visible: true });
  }

  handleAddList = (e) => {
    this.candidatesFormComponentRef.current.validateFields((err, values) => {
      if (this.notSameListName(values.listName)) {
        message.error(`El nombre "${values.listName}" ya fue seleccionado`);
        err = true;
      }
      const notSameIdentityDocument = this.notSameIdentityDocument(values);
      if (notSameIdentityDocument.err) {
        err = true;
        message.error(`Las siguientes CI ya fueron agregadas: ${notSameIdentityDocument.identityDocumentsUsed}`);
      }
      else if (!err) {
        let lists = this.state.lists
        let list = this.state.list;
        list = {
          key: this.state.count,
          listName: values.listName,
          candidates: list
        }
        lists.push(list);
        this.setState({
          lists,
          list: [],
          count: this.state.count + 1,
          visible: false
        });
        message.success(`Se creó la plancha "${values.listName}"`);
      }
    });
  }

  handleUpdateList = () => {
    this.candidatesFormComponentRef.current.validateFields(async (err, values) => {
      if (this.state.editList) {
        if (this.state.editList.listName !== values.listName) {
          if (this.notSameListName(values.listName)) {
            message.error(`El nombre "${values.listName}" ya fue seleccionado`);
            err = true;
          }
        }
      }
      else if (this.notSameListName(values.listName)) {
        message.error(`El nombre "${values.listName}" ya fue seleccionado`);
        err = true;
      }
      const notSameIdentityDocument = this.notSameIdentityDocument(values);
      if (notSameIdentityDocument.err) {
        err = true;
        message.error(`Las siguientes CI ya fueron agregadas en otras planchas: ${notSameIdentityDocument.identityDocumentsUsed}`);
      }
      else if (!err) {
        const lists = this.state.lists;
        const editList = this.state.editList;
        const listCandidates = this.state.list;
        for (const list of lists) {
          console.log(list.key, '', editList.key);
          if (list.key === editList.key) {
            list.candidates = listCandidates;
          }
        }
        this.setState({
          list: [],
          editList: undefined,
          lists,
          visible: false
        });
        message.success(`Se editó la plancha "${values.listName}"`);
      }
    });
  }

  handleDeleteList = async (key) => {
    const lists = [...this.state.lists];
    const index = lists.findIndex(list => list.key === key);
    lists.splice(index, 1);
    if (lists.length !== 0) {
      this.setState({ lists })
      // this.props.setCandidate(newDataSource);
    }
    else {
      message.error('Debe haber al menos una plancha');
    }
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  render = () => {
    return (
      <div>
        <h1>
          Planchas
        <Button
            onClick={this.showModal}
            type="primary"
            style={{ marginLeft: 10 }}
          >
            AGREGAR LISTA
        </Button>
        </h1>
        <List
          dataSource={this.state.lists}
          renderItem={(list) => (
            <List.Item>
              <h1>
                <span style={{ marginRight: '10px' }}>{list.listName}</span>
                <Popconfirm title="Editar plancha?" onConfirm={() => this.handleEditList(list)}>
                  <Icon type="edit" />
                </Popconfirm>
                <Popconfirm title="¿Eliminar plancha?" onConfirm={() => this.handleDeleteList(list.key)}>
                  <Icon style={{ marginLeft: '10px' }} type="delete" />
                </Popconfirm>
              </h1>
              <ul>{list.candidates.map((candidate, index) => <li key={index}>{candidate.name} - {candidate.identityDocument} - {candidate.position} </li>)}</ul>
            </List.Item>
          )} />
        <Modal
          title="Nueva Plancha"
          visible={this.state.visible}
          onOk={this.state.editList ? this.handleUpdateList : this.handleAddList}
          onCancel={this.handleCancel}
          width={950}
          okText={this.state.editList ? 'EDITAR LISTA' : 'CREAR LISTA'}
          cancelText='CANCELAR'
        >
          {
            this.state.visible && (
              <CandidatesForm ref={this.candidatesFormComponentRef} positions={this.props.positions} setList={this.setList} editList={this.state.editList} />
            )
          }
        </Modal>
      </div>
    )
  }

}

export { CandidateList };