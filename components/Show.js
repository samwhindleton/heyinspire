import React from 'react';


export default class Show extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {};
  // };


  render () {
    return (
      <div>
        <h1>Show page.</h1>
        <button onClick={() => this.props.viewProfile()}>
          back
        </button>

        <div>
          <p>Title: {this.props.editTitle}</p>
          <img src={this.props.editImage} alt=""/>
        </div>
      </div>
    );
  };
};
