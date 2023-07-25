import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router, Route, Routes, NavLink,
} from 'react-router-dom';
import Rockets from './components/Rockets';
import Missions from './components/Missions';
import MyProfile from './components/MyProfile';
import './styles/App.css';
import planet from './images/planet.png';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <header className="header">
          <div>
            <img src={planet} alt="logo" />
            <h1>Space Traveler&apos;s Hub</h1>
          </div>
          <nav>
            <ul>
              <li className="nav-item">
                <NavLink activeclassname="active" to="/">
                  Rockets
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeclassname="active" to="/missions">
                  Missions
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeclassname="active" to="/my-profile">
                  My Profile
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route exact path="/" element={<Rockets />} />
          <Route exact path="/missions" element={<Missions />} />
          <Route exact path="/my-profile" element={<MyProfile />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
