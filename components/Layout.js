import Head from 'next/head';
import '../styles/main.css';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = (props) => (
  <div>
    <Head>
      <title></title>
      <link rel="stylesheet" href="/_next/static/style.css"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
    </Head>
    <Navbar/>
    <div className="main-container">
      {props.children}
    </div>
    <Footer/>
  </div>
);

export default Layout;
