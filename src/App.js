import React from 'react';
import {
  BrowserRouter as Router, Route, Routes, NavLink,
} from 'react-router-dom';
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

        <Routes>
          <Route exact path="/" element={<Rockets />} />
          <Route exact path="/missions" element={<Missions />} />
          <Route exact path="/my-profile" element={<MyProfile />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
