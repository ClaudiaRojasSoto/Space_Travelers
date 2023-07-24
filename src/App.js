import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Rockets from './components/Rockets';
import Missions from './components/Missions';
import MyProfile from './components/MyProfile';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink exact activeClassName="active" to="/">
                Rockets
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="active" to="/missions">
                Missions
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="active" to="/my-profile">
                My Profile
              </NavLink>
            </li>
          </ul>
        </nav>

        <Route exact path="/" component={Rockets} />
        <Route exact path="/missions" component={Missions} />
        <Route exact path="/my-profile" component={MyProfile} />
      </div>
    </Router>
  );
}

export default App;
