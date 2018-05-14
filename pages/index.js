import React, { Component } from 'react';

// nextjs routing component
import Link from 'next/link';

// behance
import behanceCredentials from '../credentials/behance';

// firebase
import clientCredentials from '../credentials/client';
import firebase from 'firebase';

// fetch
import Fetch from 'isomorphic-unfetch';

// main layout
import Layout from '../components/Layout';

// pages
import About from '../components/About';
import Edit from '../components/Edit';
import Home from '../components/Home';
import Profile from '../components/Profile';
import Show from '../components/Show';


export default class Index extends React.Component {
  static async getInitialProps ({req, query}) {
    const user = req && req.session ? req.session.decodedToken : null
    // don't fetch anything from firebase if the user is not found
    const snap = user && await req.firebaseServer.database().ref('userImages').once('value')
    const snap2 = user && await req.firebaseServer.database().ref('userFavImages').once('value')
    const userImages = snap && snap.val()
    const userFavImages = snap2 && snap.val()
    return { user, userImages, userFavImages };
  };

  constructor (props) {
    super(props)
    this.state = {
      // behance -----------------------
      projects: [],
      number: 0,
      ready: false,
      // firebase ----------------------
      editKey: '',
      editImage: '',
      editTitle: '',
      user: this.props.user,
      userFavImages: this.props.userFavImages,
      userImages: this.props.userImages,
      title: '',
      value: '',
      // pages -------------------------
      home: true,
      about: false,
      contact: false,
      edit: false,
      profile: false,
      show: false
    };

    // behance -------------------------
    this.getImages = this.getImages.bind(this);
    this.randomNum = this.randomNum.bind(this);
    // firebase ------------------------
    this.addDbListener = this.addDbListener.bind(this);
    this.getEdit = this.getEdit.bind(this);
    this.getShow = this.getShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
    this.handleFavDelete = this.handleFavDelete.bind(this);
    this.handleFavSubmit = this.handleFavSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    // pages ---------------------------
    this.viewHome = this.viewHome.bind(this);
    this.viewAbout = this.viewAbout.bind(this);
    this.viewContact = this.viewContact.bind(this);
    this.viewProfile = this.viewProfile.bind(this);
    // // test ----------------------------
    // this.test = this.test.bind(this);
  };

  // --------------------------------------------------
  // behance
  // --------------------------------------------------

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
        // console.log(data.projects);
        // console.log(this.state.projects[0].name);
      });
  };

  // generate random number between 0 - 48
  randomNum() {
    this.setState({
      number: Math.floor(Math.random() * 49)
    });
    // console.log('random num:', this.state.number);
  };


  // --------------------------------------------------
  // firebase
  // --------------------------------------------------

  componentDidMount () {
    // behance -----------------------
    this.randomNum();
    this.getImages();
    // firebase ----------------------
    // firebase.initializeApp(clientCredentials)
    if (!firebase.apps.length) {
      firebase.initializeApp(clientCredentials);
    };

    if (this.state.user) this.addDbListener()

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user })
        return user.getIdToken()
          .then((token) => {
            // eslint-disable-next-line no-undef
            return fetch('/api/login', {
              method: 'POST',
              // eslint-disable-next-line no-undef
              headers: new Headers({ 'Content-Type': 'application/json' }),
              credentials: 'same-origin',
              body: JSON.stringify({ token })
            })
          }).then((res) => this.addDbListener())
      } else {
        this.setState({ user: null })
        // eslint-disable-next-line no-undef
        fetch('/api/logout', {
          method: 'POST',
          credentials: 'same-origin'
        }).then(() => firebase.database().ref('userImages').off())
      };
    });
  };

  addDbListener () {
    firebase.database().ref('userImages').on('value', snap => {
      const userImages = snap.val();
      if (userImages) this.setState({ userImages });
    });
    firebase.database().ref('userFavImages').on('value', snap2 => {
      const userFavImages = snap2.val();
      if (userFavImages) this.setState({ userFavImages });
    });
  };

  getEdit(key, title, image) {
    // console.log(key);
    // console.log(title);
    // console.log(image);
    this.setState({
      editKey: key,
      editImage: image,
      editTitle: title
    });
    this.viewEdit();
  };

  getShow(key, title, image) {
    // console.log(key);
    // console.log(title);
    // console.log(image);
    this.setState({
      editKey: key,
      editImage: image,
      editTitle: title
    });
    this.viewShow();
  };

  handleChange (event) {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleEditChange (event) {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleEditSubmit (event) {
    event.preventDefault();
    const date = new Date().getTime();
    const key = this.state.editKey;
    const uuid = this.state.user.uid;
    const updateImage = firebase.database().ref(`userImages/${uuid}/${key}`).update({
      // id: date,
      // created_at: date,
      updated_at: date,
      title: this.state.editTitle,
      image: this.state.editImage,
    });
    this.setState({
      editKey: '',
      editImage: '',
      editTitle: ''
    });
    this.viewProfile();
  };

  handleDelete(image) {
    const uuid = this.state.user.uid;
    const deleteImage = firebase.database().ref(`userImages/${uuid}/${image}`);
    deleteImage.remove();
    this.addDbListener();
  };

  handleFavDelete(image) {
    const uuid = this.state.user.uid;
    const deleteImage = firebase.database().ref(`userFavImages/${uuid}/${image}`);
    deleteImage.remove();
    this.addDbListener();
  };

  handleFavSubmit(event) {
    const date = new Date().getTime();
    const uuid = this.state.user.uid;
    firebase.database().ref(`userFavImages/${uuid}/${date}`).set({
      id: date,
      created_at: date,
      title: this.state.projects[this.state.number].name,
      image: this.state.projects[this.state.number].covers.original,
      url: this.state.projects[this.state.number].url,
      username: this.state.user.displayName
    });
    // console.log('faved');
  };

  handleReset (event) {
    // event.preventDefault();
    this.setState({
      title: '',
      value: ''
    });
  };

  handleSubmit (event) {
    // event.preventDefault();
    const date = new Date().getTime();
    const uuid = this.state.user.uid;
    firebase.database().ref(`userImages/${uuid}/${date}`).set({
      id: date,
      created_at: date,
      updated_at: date,
      title: this.state.title,
      image: this.state.value,
      username: this.state.user.displayName
    });
    this.setState({ title: '', value: '' });
  };

  handleLogin () {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.viewHome();
  };

  handleLogout () {
    this.viewHome();
    firebase.auth().signOut();
  };


  // --------------------------------------------------
  // pages
  // --------------------------------------------------

  viewHome () {
    (this.state.home) ?
    ('') :
    (this.setState({
      home: true,
      about: false,
      contact: false,
      edit: false,
      profile: false,
      show: false
    }))
  };

  viewAbout () {
    (this.state.about) ?
    ('') :
    (this.setState({
      home: false,
      about: true,
      contact: false,
      edit: false,
      profile: false,
      show: false
    }))
  };

  viewContact () {
    (this.state.contact) ?
    ('') :
    (this.setState({
      home: false,
      about: false,
      contact: true,
      edit: false,
      profile: false,
      show: false
    }))
  };

  viewEdit () {
    (this.state.edit) ?
    ('') :
    (this.setState({
      home: false,
      about: false,
      edit: true,
      contact: false,
      profile: false,
      show: false
    }))
  };

  viewProfile () {
    (this.state.profile) ?
    ('') :
    (this.setState({
      home: false,
      about: false,
      contact: false,
      edit: false,
      profile: true,
      show: false
    }))
  };

  viewShow () {
    (this.state.show) ?
    ('') :
    (this.setState({
      home: false,
      about: false,
      contact: false,
      edit: false,
      profile: false,
      show: true
    }))
  };


  // --------------------------------------------------
  // test
  // --------------------------------------------------

  // test () {
  //   console.log(this.state.user.displayName);
  //   console.log(this.state.user.photoURL);
  //   console.log(this.state.user);
  //   console.log(this.state.userImages[this.state.user.uid]);
  //   console.log(this.state.userFavImages[this.state.user.uid]);
  // };


  render (props) {
    return (
      <Layout>
        {/* navbar */}
        <div className='navbar'>
          <ul>
            {/* logo */}
            <li className='navbar-user-image'>
              <a onClick={() => this.viewHome()}>
                <img src="../static/logo/logo.png" alt=""/>
              </a>
            </li>

            {/* home */}
            <li>
              {/* <Link href='/'> */}
              <a onClick={() => this.viewHome()}>Home</a>
              {/* </Link> */}
            </li>

            {/* about */}
            <li>
              <a onClick={() => this.viewAbout()}>About</a>
            </li>

            {/* logout, register / login */}
            {
              (this.state.user) ?
              (
                <li>
                  <a onClick={this.handleLogout}>Logout</a>
                </li>
              ) :
              (
                <li>
                  <a onClick={this.handleLogin}>Login</a>
                </li>
              )
            }

            {/* logged in username */}
            {
              (this.state.user) ?
              (
                <li className='navbar-user-image'>
                  <a onClick={() => this.viewProfile()}>
                    <img src={this.state.user.photoURL} alt={this.state.user.displayName}/>
                  </a>
                </li>
              ) :
              ('')
            }
          </ul>
        </div> {/* /navbar */}

        <div className='content-container'>
          {/* test */}
          {/* <button onClick={() => this.test()}>test button</button> */}

          {/* home */}
          {
            (this.state.home) ?
            (<Home
              handleFavSubmit={this.handleFavSubmit}
              number={this.state.number}
              projects={this.state.projects}
              randomNum={this.randomNum}
              ready={this.state.ready}
              user={this.state.user}
            />) :
            ('')
          }

          {/* about */}
          {
            (this.state.about) ?
            (<About
              handleLogin={this.handleLogin}
              user={this.state.user}
              viewHome={this.viewHome}
            />) :
            ('')
          }

          {/* contact */}
          {
            (this.state.contact) ?
            (<Contact/>) :
            ('')
          }

          {/* edit */}
          {
            (this.state.edit) ?
            (<Edit
              editKey={this.state.editKey}
              editImage={this.state.editImage}
              editTitle={this.state.editTitle}
              handleEditChange={this.handleEditChange}
              handleEditSubmit={this.handleEditSubmit}
              user={this.state.user}
              viewProfile={this.viewProfile}
            />) :
            ('')
          }

          {/* profile */}
          {
            (this.state.profile) ?
            (<Profile
              addDbListener={this.addDbListener}
              edit={this.state.edit}
              handleChange={this.handleChange}
              handleDelete={this.handleDelete}
              handleReset={this.handleReset}
              getEdit={this.getEdit}
              getShow={this.getShow}
              handleFavDelete={this.handleFavDelete}
              handleSubmit={this.handleSubmit}
              title={this.state.title}
              user={this.state.user}
              userImages={this.state.userImages}
              userFavImages={this.state.userFavImages}
              value={this.state.value}
              viewHome={this.viewHome}
            />) :
            ('')
          }

          {/* show */}
          {
            (this.state.show) ?
            (<Show
              editKey={this.state.editKey}
              editImage={this.state.editImage}
              editTitle={this.state.editTitle}
              handleEditChange={this.handleEditChange}
              handleEditSubmit={this.handleEditSubmit}
              user={this.state.user}
              viewProfile={this.viewProfile}
            />) :
            ('')
          }
        </div>
      </Layout>
    );
  };
};
