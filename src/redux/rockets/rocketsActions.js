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

export const fetchRocketsData = () => (dispatch) => {
  dispatch(setLoading());

  axios.get('https://api.spacexdata.com/v3/rockets')
    .then((response) => {
      const rocketsData = response.data.map((rocket) => ({
        id: rocket.id,
        name: rocket.rocket_name,
        type: rocket.rocket_type,
        flickr_images: rocket.flickr_images,
      }));

      dispatch(setRocketsData(rocketsData));
    })
    .catch((error) => {
      dispatch(setError(error.message));
    });
};
