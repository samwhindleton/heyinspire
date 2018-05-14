import React from 'react';


export default class Edit extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {};
  // };


  render () {
    return (
      <div className='edit-page profile'>
        <div className='create-form'>
          <form onSubmit={this.props.handleEditSubmit}>
            <h1>Edit Image</h1>
            <div>
              <label className='label' htmlFor='title'>Title</label>
              <input
                className='input'
                id='editTitle'
                type='text'
                onChange={this.props.handleEditChange}
                value={this.props.editTitle}
              />
            </div>
            <div>
              <label className='label' htmlFor='image url'>Image URL</label>
              <input
                className='input'
                id='editImage'
                type='url'
                onChange={this.props.handleEditChange}
                value={this.props.editImage}
              />
            </div>
            <div className='create-form-buttons'>
              <button className='button is-primary' type='submit'>Submit</button>
              <button className='button is-danger' onClick={() => this.props.viewProfile()}>
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
};
