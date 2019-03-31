import React, { Component } from 'react';

import {
  CandidateUninominal,
  CandidateList
} from "../../@components";

import { TypeCandidate } from '../../@constans';
import { positionService } from '../../@services';

class CandidateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      positions: [],
    }
  }

  componentDidMount = () => {
    this.getPositions();
  }

  getPositions = () => {
    this.setState({ loading: true });
    positionService.getAll()
      .then(response => {
        let positions = [];
        for (const position of response) {
          position['key'] = position.id
          positions.push(position);
        }
        this.setState({ positions, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      })
  }

  TypeCandidate = () => {
    let { typeCandidate } = this.props
    if (typeCandidate === TypeCandidate.uninominal) {
      typeCandidate = <CandidateUninominal {...this.props} positions={this.state.positions} />
    }
    else if (typeCandidate === TypeCandidate.list) {
      typeCandidate = <CandidateList positions={this.state.positions} />
    }
    return typeCandidate;
  }

  render() {
    const { TypeCandidate } = this;
    return (
      <div>
        <TypeCandidate />
      </div>
    );
  }
}

export { CandidateForm };