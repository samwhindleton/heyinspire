// ----------------------------------------
// | DEPENDENCIES                         |
// ----------------------------------------

const express = require('express');
const server = express();

require('dotenv').config();

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const next = require('next');
const admin = require('firebase-admin');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();


// ----------------------------------------
// | DATABASE                             |
// ----------------------------------------

const firebase = admin.initializeApp({
  credential: admin.credential.cert(require('./credentials/server')),
  databaseURL: 'process.env.DATABASE_URL'
}, 'server');


// ----------------------------------------
// | APP                                  |
// ----------------------------------------

app.prepare().then(() => {
  const server = express();

  // --------------------------------------
  // | MIDDLEWARE                         |
  // --------------------------------------

  // bodyParser
  server.use(express.urlencoded({ extended: false }));
  server.use(express.json());
  // express-session
  server.use(session({
    secret: 'process.env.SESSION_SECRET', // any random string
    saveUninitialized: true,
    store: new FileStore({path: '/tmp/sessions', secret: 'process.env.SESSION_SECRET'}),
    resave: false,
    rolling: true,
    httpOnly: true,
    cookie: { maxAge: 604800000 } // week
  }));
  // firebase
  server.use((req, res, next) => {
    req.firebaseServer = firebase
    next()
  });

  // --------------------------------------
  // | ROUTES                             |
  // --------------------------------------
  // --------------------                 |
  // 7 Restful Routes   |                 |
  // --------------------                 |
  // Index  : GET    '/'              1/7 |
  // Show   : GET    '/:id'           2/7 |
  // New    : GET    '/new'           3/7 |
  // Create : POST   '/'              4/7 |
  // Edit   : GET    '/:id/edit'      5/7 |
  // Update : PUT    '/:id'           6/7 |
  // Delete : DELETE '/:id'           7/7 |
  // --------------------------------------

  // firebase
  // firebase login
  server.post('/api/login', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    const token = req.body.token;
    firebase.auth().verifyIdToken(token)
      .then((decodedToken) => {
        req.session.decodedToken = decodedToken;
        return decodedToken;
      })
      .then((decodedToken) => {
        res.json({ status: true, decodedToken });
      })
      .catch((error) => {
        res.json({ error });
      });
  });

  // firebase logout
  server.post('/api/logout', (req, res) => {
    req.session.decodedToken = null;
    res.json({ status: true });
  });

  // NextJS default route
  // NOTE: DO NOT EDIT
  server.get('*', (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // test .env
    // res.send(process.env.TEST_KEY);
    return handle(req, res);
  });

  // --------------------------------------
  // | LISTENER                           |
  // --------------------------------------

  const port = parseInt(process.env.PORT, 10) || 9000;
  // const port = process.env.PORT || 3000;
  server.listen(port, (error) => {
    if (error) throw error;
    console.log(`### Listening on http://127.0.0.1:${port} ###`);
  });
});
