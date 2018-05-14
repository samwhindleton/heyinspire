import Footer from './Footer';
import Head from 'next/head';

import '../styles/main.css';

const Layout = (props) => (
  <div>
    <Head>
      {/* character encoding */}
      <meta charSet='utf-8'/>
      {/* viewport for page dimensions and scaling */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="author" content="Sam Whindleton"/>
      <meta name="description" content=""/>
      <meta name="keywords" content=""/>
      <title>Hey Inspire</title>
      {/* main css */}
      <link rel="stylesheet" href="/_next/static/style.css"/>
      {/* font awesome */}
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossOrigin="anonymous"/>
      {/* favicon */}
      <link rel="icon" href="../static/favicon/favicon.ico" type="image/x-icon"/>
    </Head>
    <div className="main-container">
      {props.children}
      <Footer/>
    </div>
  </div>
);

export default Layout;
