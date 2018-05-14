import React from 'react';


export default class Home extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {};
  // };


  render () {
    return (
      <div className='home'>
        {
          (this.props.user && this.props.ready) ?
          (
            <div className='behance'>
              <div className='behance-images'>
                <a href={this.props.projects[this.props.number].url} target="_blank">
                  <img src={this.props.projects[this.props.number].covers.original} alt={this.props.projects[this.props.number].name}/>
                  <h2>{this.props.projects[this.props.number].name}</h2>
                </a>
              </div>
              <div className='behance-buttons'>
                <a onClick={() => this.props.randomNum()}>
                  <i className="fas fa-chevron-circle-right"></i>
                </a>
                <a onClick={() => this.props.handleFavSubmit()}>
                  <i className="fas fa-heart"></i>
                </a>
              </div>
            </div>
          ) :
          (
            <div className='logo'>
              <h1><span>H</span>ey</h1>
              <h1><span>I</span>nspire</h1>
            </div>
          )
        }
      </div>
    );
  };
};
