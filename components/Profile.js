
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
      </div>
    );
  };
};
