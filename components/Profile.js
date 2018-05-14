import React from 'react';


export default class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      addImage: false,
      viewFavs: false,
      viewImages: false
    };

    this.handleCancel = this.handleCancel.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.toggleAddImage = this.toggleAddImage.bind(this);
    this.toggleViewFavs = this.toggleViewFavs.bind(this);
    this.toggleViewImages = this.toggleViewImages.bind(this);
  };

  handleCancel () {
    this.setState({
      addImage: false,
      viewFavs: false,
      viewImages: false
    });
    this.props.handleReset();
  };

  handleNewSubmit () {
    this.props.handleSubmit();
    this.setState({
      addImage: false,
      viewFavs: false,
      viewImages: true
    });
  };

  toggleAddImage () {
    (this.state.addImage) ?
    ('') :
    (this.setState({
      addImage: true,
      viewFavs: false,
      viewImages: false
    }))
  };

  toggleViewFavs () {
    (this.state.viewFavs) ?
    ('') :
    (this.setState({
      addImage: false,
      viewFavs: true,
      viewImages: false
    }))
  };

  toggleViewImages () {
    (this.state.viewImages) ?
    ('') :
    (this.setState({
      addImage: false,
      viewFavs: false,
      viewImages: true
    }))
  };

  render () {
    return (
      <div className='profile'>
        <div className='user-info'>
          <img src={this.props.user.photoURL} alt={this.props.user.displayName}/>
          <h1><span>Hi</span> {this.props.user.displayName}</h1>
        </div>

        <div className='view-selection'>
          <button className='button is-primary' onClick={this.toggleAddImage}>Add &nbsp;<i className='fas fa-image'></i></button>
          <button className='button is-primary' onClick={this.toggleViewImages}>View &nbsp;<i className='fas fa-image'></i></button>
          <button className='button is-primary' onClick={this.toggleViewFavs}>View &nbsp;<i className='fas fa-heart'></i></button>
        </div>

        {/* create form */}
        {
          (this.state.addImage) ?
          (
            <div className='create-form'>
              <form onSubmit={this.handleNewSubmit}>
                <h1>Add an Image</h1>
                <div>
                  <label className='label' htmlFor='title'>Title</label>
                  <input
                    className='input'
                    id='title'
                    type='text'
                    onChange={this.props.handleChange}
                    placeholder='My Image Title'
                    value={this.props.title}
                    required
                  />
                </div>
                <div>
                  <label className='label' htmlFor='image url'>Image URL</label>
                  <input
                    className='input'
                    id='value'
                    type='url'
                    onChange={this.props.handleChange}
                    placeholder={'https://behance.net/my-image.png'}
                    value={this.props.value}
                    required
                  />
                </div>
                <div className='create-form-buttons'>
                  <button className='button is-primary' type='submit'>Submit</button>
                  <button onClick={this.props.handleReset} className='button is-warning' type='submit'>Reset</button>
                  <button onClick={this.handleCancel} className='button is-danger' type='submit'>Cancel</button>
                </div>
              </form>
            </div>
          ) :
          ('')
        }

        {/* view images */}
        {
          (this.state.viewImages) ?
          (
            <div className='create-form'>
              <ul>
                <h1>Image List</h1>
                {
                  (this.props.userImages[this.props.user.uid]) ?
                  (
                    Object.keys(this.props.userImages[this.props.user.uid]).reverse().map
                      (
                        key =>
                          <li key={key}>
                            <div className='profile-image-container'>
                              <a onClick={() => this.props.getShow(key, this.props.userImages[this.props.user.uid][key].title, this.props.userImages[this.props.user.uid][key].image)}>
                                <h1>Title: {this.props.userImages[this.props.user.uid][key].title}</h1>
                                <img src={this.props.userImages[this.props.user.uid][key].image} alt=""/>
                              </a>
                            </div>

                            <div className='create-form-buttons'>
                              <button className='button is-primary' onClick={() => this.props.getEdit(key, this.props.userImages[this.props.user.uid][key].title, this.props.userImages[this.props.user.uid][key].image)}>
                                Edit
                              </button>
                              <button className='button is-danger' onClick={() => this.props.handleDelete(key)}>
                                Delete
                              </button>
                            </div>
                          </li>
                      )
                  ) :
                  (
                    <div className='empty'>
                      <h1>Empty.</h1>
                    </div>
                  )
                }
              </ul>
            </div>
          ) :
          ('')
        }

        {/* view favs */}
        {
          (this.state.viewFavs) ?
          (
            <div className='create-form'>
              <ul>
                <h1>Favs list</h1>
                {
                  (this.props.userFavImages[this.props.user.uid]) ?
                  (
                    Object.keys(this.props.userFavImages[this.props.user.uid]).reverse().map
                    (
                      key =>
                        <li key={key}>
                          <div className='profile-image-container'>
                            <a href={this.props.userFavImages[this.props.user.uid][key].url} target="_blank">
                              <h1>
                                {this.props.userFavImages[this.props.user.uid][key].title}
                              </h1>
                              <img src={this.props.userFavImages[this.props.user.uid][key].image} alt=""/>
                            </a>
                          </div>

                          <div className='create-form-buttons'>
                            <button className='button is-primary' onClick={() => this.props.handleFavDelete(key)}>
                              Delete
                            </button>
                          </div>
                        </li>
                    )
                  ) :
                  (
                    <div className='empty'>
                      <h1>Empty.</h1>
                    </div>
                  )
                }
              </ul>
            </div>
          ) :
          ('')
        }
      </div>
    );
  };
};
