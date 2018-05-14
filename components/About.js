import React from 'react';

// firebase
import clientCredentials from '../credentials/client';
import firebase from 'firebase';

// fetch
import Fetch from 'isomorphic-unfetch';


export default class About extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {};
  // };

  render () {
    return (
      <div className='about'>
        <p>Hi there! Do you need inspiration for your next project? No matter how big or small you've come to the right place. Hey Inspire provides the inspiration you need for your next project. <span>
          {
            (this.props.user) ?
            (<a onClick={() => this.props.viewHome()}>Get started.</a>) :
            (<a onClick={this.props.handleLogin}>Login to get started.</a>)
          }
        </span></p>
      </div>
    )
  };
};
