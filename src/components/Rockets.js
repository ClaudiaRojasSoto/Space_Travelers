import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRocketsData } from '../redux/rockets/rocketsSlice';

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
    <div>
      <h2>Rockets</h2>
      <ul>
        {rocketsData.map((rocket) => (
          <li key={rocket.id}>
            <h3>{rocket.rocket_name}</h3>
            <p>
              ID:
              {rocket.id}
            </p>
            <p>
              Description:
              {rocket.description}
            </p>
            {rocket.flickr_images && (
              <div>
                <p>Images:</p>
                <img src={rocket.flickr_images[0]} alt={rocket.name} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rockets;
