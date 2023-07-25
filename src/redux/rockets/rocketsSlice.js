import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rocketsData: [],
  loading: false,
  error: null,
};

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    setRocketsData: (state, action) => {
      state.rocketsData = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setRocketsData, setLoading, setError } = rocketsSlice.actions;

export const fetchRocketsData = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get('https://api.spacexdata.com/v3/rockets')
    .then((response) => {
      const rocketsData = response.data.map((rocket) => ({
        id: rocket.id,
        rocket_name: rocket.rocket_name,
        description: rocket.description,
        flickr_images: rocket.flickr_images,
      }));

      dispatch(setRocketsData(rocketsData));
    })
    .catch((error) => {
      dispatch(setError(error.message));
    });
};

export default rocketsSlice.reducer;
