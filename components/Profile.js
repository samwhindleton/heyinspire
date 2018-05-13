import React from 'react';


export default class Profile extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {};
  // };


  render () {
    return (
      <div id="profile">
        <div>
          <h1>Profile page.</h1>
          <img src={this.props.user.photoURL} alt={this.props.user.displayName}/>
          Hi {this.props.user.displayName}
        </div>

        <div>
          <form onSubmit={this.props.handleSubmit}>
            <input
              id='title'
              type='text'
              onChange={this.props.handleChange}
              placeholder='Image description'
              value={this.props.title}
            />
            <input
              id='value'
              type='url'
              onChange={this.props.handleChange}
              placeholder={'https://behance.net/project/1/my_image.png'}
              value={this.props.value}
            />
            <button type='submit'>submit</button>
          </form>
        </div>

        <div>
          <div>
            <h1>Image List</h1>
            <ul>
              {
                (this.props.userImages[this.props.user.uid]) ?
                (
                  Object.keys(this.props.userImages[this.props.user.uid]).reverse().map
                    (
                      key =>
                        <li key={key}>
                          <h1>
                            {this.props.userImages[this.props.user.uid][key].title}
                          </h1>
                          <img src={this.props.userImages[this.props.user.uid][key].image} alt=""/>
                          <button onClick={() => this.props.handleDelete(key)}>
                            delete
                          </button>
                        </li>
                    )
                ) :
                ('')
              }
            </ul>
          </div>

          <div>
            <h1>Favs list</h1>
            <ul>
              {
                (this.props.userFavImages[this.props.user.uid]) ?
                (
                  Object.keys(this.props.userFavImages[this.props.user.uid]).reverse().map
                  (
                    key =>
                      <li key={key}>
                        <h1>
                          {this.props.userFavImages[this.props.user.uid][key].title}
                        </h1>
                        <img src={this.props.userFavImages[this.props.user.uid][key].image} alt=""/>
                        <button onClick={() => this.props.handleFavDelete(key)}>
                          remove
                        </button>
                      </li>
                  )
                ) :
                ('')
              }
            </ul>
          </div>
        </div>
      </div>
    );
  };
};
