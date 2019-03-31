import React, { Component } from 'react';
import { SchoolList, WrapperContent } from '../../../@components';

class Schools extends Component {
  render() {
    return (     
      <WrapperContent
        title='ESCUELA'
        subTitle='LISTA'
        {...this.props}
      >
        <SchoolList {...this.props}/>
      </WrapperContent>
    );
  }
}

export { Schools };