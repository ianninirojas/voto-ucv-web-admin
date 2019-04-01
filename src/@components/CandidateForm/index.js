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
      candidates: []
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

  setCandidates = (candidates) => {
    this.setState({ candidates });
    this.props.setCandidates();
  }

  getCandidates = () => {
    let { typeCandidate } = this.props
    let candidates = JSON.parse(JSON.stringify(this.state.candidates));
    if (typeCandidate === TypeCandidate.uninominal) {
      for (const candidate of candidates) {
        delete candidate['key'];
      }
      return candidates;
    }
    else if (typeCandidate === TypeCandidate.list) {
      let candidatesList = [];
      for (const list of candidates) {
        const listName = list.listName;
        const candidates = list.candidates;
        for (const candidate of candidates) {
          candidate['listName'] = listName;
          delete candidate['key'];
          candidatesList.push(candidate);
        }
      }
      return candidatesList;
    }
  }

  TypeCandidate = () => {
    let { typeCandidate } = this.props
    if (typeCandidate === TypeCandidate.uninominal) {
      typeCandidate = <CandidateUninominal {...this.props} positions={this.state.positions} setCandidates={this.setCandidates} />
    }
    else if (typeCandidate === TypeCandidate.list) {
      typeCandidate = <CandidateList {...this.props} positions={this.state.positions} setCandidates={this.setCandidates} />
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