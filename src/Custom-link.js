import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const OldSchoolMenuLink = ({label, to, activeOnlyWhenExact}) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({match}) => (
    <div className={match ? 'active' : ''}>
      {match ? '>' : ''}<Link to={to}>{label}</Link>
    </div>
  )}/>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const CustomLinkExample = () => (
  <Router>
    <div>
      <Link to='/'>Home</Link>
      <hr/>
      <Link to='/about'>about</Link>
      <hr/>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
    </div>
  </Router>
);


export default CustomLinkExample;
