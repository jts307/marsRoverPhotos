import React from 'react';
import {
  BrowserRouter as Router, Route, NavLink, Switch,
} from 'react-router-dom';
import MainImage from './main_image';
import Buttons from './buttons';

const About = (props) => {
  return (
    <div className="app_container about_container">
      <p className="about_page">
        This is a tool I created to look through images of Mars taken by the Mars Rover.
        You can post an interesting image you find to the unofficial Mars Rover instagram
        using the post to instagram button. Use these credentials to login to Facebook when prompted:
        <br /><br />- Email: marsroverimages@gmail.com
        <br />- Password: kNay%/@/VT&#40;x@G3
        <br /><br />You can view all posted images on the instagram here:<br />
        <a href="https://www.instagram.com/marsroverphotos/">https://www.instagram.com/marsroverphotos/</a>
      </p>
    </div>
  );
};
const Welcome = (props) => {
  return <div className="app_container"><MainImage /><Buttons /></div>;
};

const Nav = (props) => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/" activeStyle={{ color: 'rgb(193, 68, 14)' }} exact>Home</NavLink>
        </li>
        <li><NavLink to="/about" activeStyle={{ color: 'rgb(193, 68, 14)' }}>About</NavLink></li>
      </ul>
    </nav>
  );
};

const FallBack = (props) => {
  return <div>URL Not Found</div>;
};

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/about" component={About} />
          <Route component={FallBack} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
