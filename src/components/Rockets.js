import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRocketsData, reserveRocket, cancelRocket } from '../redux/rockets/rocketsSlice';
import '../styles/Rockets.css';

const Rockets = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.rockets.loading);
  const error = useSelector((state) => state.rockets.error);
  const rocketsData = useSelector((state) => state.rockets.rocketsData);

  useEffect(() => {
    if (rocketsData.length === 0) {
      dispatch(fetchRocketsData());
    }
  }, [dispatch, rocketsData]);

  const handleButtonClick = (rocket) => {
    if (rocket.reserved) {
      dispatch(cancelRocket(rocket.id));
    } else {
      dispatch(reserveRocket(rocket.id));
    }
  };

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
            <p className="rocket-details-description">
              {rocket.reserved ? (
                <span style={{
                  backgroundColor: '#19a2b9', color: 'white', padding: '5px 5px', borderRadius: '5px', fontSize: '20px',
                }}
                >
                  Reserved
                </span>
              ) : null}
              {' '}
              {rocket.description}
            </p>
            <button
              type="button"
              onClick={() => handleButtonClick(rocket)}
              style={{
                backgroundColor: rocket.reserved ? 'white' : '#027bff',
                fontSize: rocket.reserved ? '18px' : '18px',
                color: rocket.reserved ? '#333333' : 'white',
                width: rocket.reserved ? '200px' : '180px',
                height: rocket.reserved ? '50px' : '50px',
                padding: '10px',
                borderRadius: '5px',
                border: rocket.reserved ? '2px solid grey' : 'none',
              }}
            >
              {rocket.reserved ? 'Cancel Reservation' : 'Reserve Rocket'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Rockets;
