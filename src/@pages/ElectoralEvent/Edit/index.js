
import React, { Component } from 'react';

import {
  WrapperContent,
  ElectoralEventEditForm
} from '../../../@components';

class ElectoralEventEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      electoralEventPublickey: this.props.match.params.id,
      electoralEvent: this.props.location.state.electoralEvent
    }
  }
  
  render() {
    return (
      <WrapperContent
        title='EVENTO ELECTORAL'
        subTitle='EDITAR'
        {...this.props}
      >
        <ElectoralEventEditForm electoralEvent={this.state.electoralEvent} electoralEventPublickey={this.state.electoralEventPublickey} />
      </WrapperContent>
    );
  }
}

export { ElectoralEventEdit };