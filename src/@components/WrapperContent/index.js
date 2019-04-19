import React, { Component } from 'react';

import { PageHeader, Card } from "antd";

import './style.css';

class WrapperContent extends Component {
  render() {
    const { title, subTitle, children } = this.props;
    return (
      <div>
        <PageHeader
          title={title}
          subTitle={subTitle}
          onBack={()=>{this.props.history.goBack()}}
        >
        </PageHeader>
        
        <Card className='card-content'>
          {children}
        </Card>
      </div>
    );
  }
}

export { WrapperContent };