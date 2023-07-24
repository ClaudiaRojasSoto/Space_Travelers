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
              Type:
              {rocket.type}
            </p>
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
                <ul>
                  {rocket.flickr_images.map((image) => (
                    <li key={image}>
                      <img src={image} alt="Rocket" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rockets;
