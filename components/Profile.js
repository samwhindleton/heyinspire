import React from 'react';

export default class Profile extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     foobar: ''
  //   }
  //
  //   this.foobar = this.foobar.bind(this);
  // };

  render () {
    return (
      <div id="profile">
        <h1>Profile page.</h1>
        <img src={this.props.user.photoURL} alt={this.props.user.displayName}/>
        Welcome {this.props.user.displayName}

        <form onSubmit={this.props.handleSubmit}>
          <input
            type='text'
            onChange={this.props.handleChange}
            placeholder={'any message here'}
            value={this.props.value}
          />
          <button type='submit'>submit</button>
        </form>

        <ul>
          {
            this.props.userImages &&
            Object.keys(this.props.userImages).map(key =>
              <li key={key}>{this.props.userImages[key].image}
                <button onClick={() => this.props.handleDelete(key)}>
                  delete
                </button>
              </li>
            )
          }
        </ul>
      </div>
    );
  };
};
