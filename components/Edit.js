import React from 'react';


export default class Edit extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {};
  // };


  render () {
    return (
      <div>
        <h1>Edit page.</h1>
        <button onClick={() => this.props.viewProfile()}>
          back
        </button>

        <div>
          <form onSubmit={this.props.handleEditSubmit}>
            <input
              id='editTitle'
              type='text'
              onChange={this.props.handleEditChange}
              value={this.props.editTitle}
            />
            <input
              id='editImage'
              type='url'
              onChange={this.props.handleEditChange}
              value={this.props.editImage}
            />
            <button type='submit'>submit</button>
          </form>
        </div>
      </div>
    );
  };
};
