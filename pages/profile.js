import React, { Component } from 'react';
import Layout from '../components/Layout';

export default class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // foobar: ''
    }

    // this.foobar = this.foobar.bind(this);
  };

  // componentDidMount () {};

  render () {
    // const { foo, bar } = this.state

    return (
      <Layout>
        <div>
          <h1>Profile page.</h1>
        </div>
      </Layout>
    );
  };
};
