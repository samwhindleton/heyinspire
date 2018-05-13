import React from 'react';


export default class Home extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {};
  // };


  render () {
    return (
      <div>
        <h1>Home page.</h1>

        {
          (this.props.user && this.props.ready) ?
          (
            <div>
              <a href={this.props.projects[this.props.number].url} target="_blank"><img src={this.props.projects[this.props.number].covers.original} alt={this.props.projects[this.props.number].name}/></a>
              <h2>{this.props.projects[this.props.number].name}</h2>
            </div>
          ) :
          ('')
        }

        {
          (this.props.user) ?
          (
            <div>
              <button onClick={() => this.props.randomNum()}>
                Get Image
              </button>
              <button onClick={() => this.props.handleFavSubmit()}>
                Fav
              </button>
            </div>
          ) :
          ('')
        }
      </div>
    );
  };
};
