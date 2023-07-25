import axios from 'axios';

export const setRocketsData = (rocketsData) => ({
  type: 'SET_ROCKETS_DATA',
  payload: rocketsData,
});

export const setLoading = () => ({
  type: 'SET_ROCKETS_LOADING',
});

export const setError = (error) => ({
  type: 'SET_ROCKETS_ERROR',
  payload: error,
});

export const reserveRocket = (rocketId) => (dispatch, getState) => {
  dispatch({
    type: 'RESERVE_ROCKET',
    payload: rocketId,
  });

  const updatedRocketsData = getState().rockets.rocketsData;
  localStorage.setItem('rocketsData', JSON.stringify(updatedRocketsData));
};

export const cancelRocket = (rocketId) => (dispatch, getState) => {
  dispatch({
    type: 'CANCEL_ROCKET',
    payload: rocketId,
  });

  const updatedRocketsData = getState().rockets.rocketsData;
  localStorage.setItem('rocketsData', JSON.stringify(updatedRocketsData));
};

export const fetchRocketsData = () => (dispatch) => {
  dispatch(setLoading());

  const savedRocketsData = localStorage.getItem('rocketsData');

  if (savedRocketsData) {
    dispatch(setRocketsData(JSON.parse(savedRocketsData)));
  } else {
    axios.get('https://api.spacexdata.com/v3/rockets')
      .then((response) => {
        const rocketsData = response.data.map((rocket) => ({
          id: rocket.id,
          name: rocket.rocket_name,
          type: rocket.rocket_type,
          flickr_images: rocket.flickr_images,
          reserved: false,
        }));

        localStorage.setItem('rocketsData', JSON.stringify(rocketsData));

        dispatch(setRocketsData(rocketsData));
      })
      .catch((error) => {
        dispatch(setError(error.message));
      });
  }
};
