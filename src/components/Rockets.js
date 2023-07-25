import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRocketsData } from '../redux/rockets/rocketsSlice';
import '../styles/Rockets.css';

const Rockets = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.rockets.loading);
  const error = useSelector((state) => state.rockets.error);
  const rocketsData = useSelector((state) => state.rockets.rocketsData);

  useEffect(() => {
    dispatch(fetchRocketsData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {' '}
        {error}
      </div>
    );
  }

  return (
    <ul className="container rockets-container">
      {rocketsData.map((rocket) => (
        <li key={rocket.id} className="rocket-item">
          {rocket.flickr_images && (
            <img src={rocket.flickr_images[0]} alt={rocket.name} className="rocket-image" />
          )}
          <div className="rocket-details">
            <h3 className="rocket-details-name">{rocket.rocket_name}</h3>
            <p className="rocket-details-description">{rocket.description}</p>
            {/* Button reserve */}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Rockets;
