import React from 'react';

// behance
import behanceCredentials from '../credentials/behance';

// fetch
import Fetch from 'isomorphic-unfetch';


export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      projects: [],
      number: 0,
      ready: false,
    };

    this.getImages = this.getImages.bind(this);
    this.randomNum = this.randomNum.bind(this);
  };

  componentDidMount () {
    this.randomNum();
    this.getImages();
  };

  getImages () {
    this.randomNum();
    fetch(behanceCredentials.cors + behanceCredentials.url + behanceCredentials.client_id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          projects: data.projects,
          ready: true
        });
        console.log(data.projects);
        // console.log(this.state.projects[0].name);
      });
  };

  // generate random number between 0 - 1
  randomNum() {
    this.setState({
      number: Math.floor(Math.random() * 49)
    });
    console.log('random num:', this.state.number);
  };

  render () {
    return (
      <div>
        <h1>Home page.</h1>

        {/* image */}
        {
          (this.state.ready) ?
          (
            <div>
              <a href={this.state.projects[this.state.number].url} target="_blank"><img src={this.state.projects[this.state.number].covers.original} alt={this.state.projects[this.state.number].name}/></a>
              <h2>{this.state.projects[this.state.number].name}</h2>
            </div>
          ) :
          ('')
        }

        {/* random image button if logged in user */}
        {
          (this.props.user) ?
          (<button onClick={() => this.randomNum()}>
            Get Image
          </button>) :
          ('')
        }
      </div>
    );
  };
};
