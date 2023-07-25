import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import localforage from 'localforage';

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
    reserveRocket: (state, action) => {
      const id = action.payload;
      state.rocketsData = state.rocketsData.map((rocket) => {
        if (rocket.id === id) {
          return { ...rocket, reserved: true };
        }
        return rocket;
      });
      localforage.setItem('rockets', state.rocketsData);
    },
    cancelRocket: (state, action) => {
      const id = action.payload;
      state.rocketsData = state.rocketsData.map((rocket) => {
        if (rocket.id === id) {
          return { ...rocket, reserved: false };
        }
        return rocket;
      });
      localforage.setItem('rockets', state.rocketsData);
    },
  },
});

export const fetchRocketsData = () => async (dispatch) => {
  dispatch(rocketsSlice.actions.setLoading());
  try {
    let rocketsData = await localforage.getItem('rockets');
    if (!rocketsData) {
      const response = await axios.get('https://api.spacexdata.com/v3/rockets');
      rocketsData = response.data.map((rocket) => ({
        id: rocket.id,
        rocket_name: rocket.rocket_name,
        description: rocket.description,
        flickr_images: rocket.flickr_images,
      }));
    }
    dispatch(rocketsSlice.actions.setRocketsData(rocketsData));
  } catch (error) {
    dispatch(rocketsSlice.actions.setError(error.message));
  }
};

export const {
  setRocketsData, setLoading, setError, reserveRocket, cancelRocket,
} = rocketsSlice.actions;

export default rocketsSlice.reducer;
