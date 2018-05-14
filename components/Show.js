import React from 'react';


export default class Show extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {};
  // };


  render () {
    return (
      <div className='show-page'>
        <div>
          <h1>{this.props.editTitle}</h1>
          <img src={this.props.editImage} alt=""/>
        </div>

        <button className='button is-warning' onClick={() => this.props.viewProfile()}>
          Back
        </button>
      </div>
    );
  };
};
