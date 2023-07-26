import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  missions: [],
  error: undefined,
  joined: false,
};

const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  try {
    const response = await axios.get(
      'https://api.spacexdata.com/v3/missions',
    );
    return response.data;
  } catch (error) {
    throw error.response;
  }
});

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    member: (state, action) => {
      const missionId = action.payload;
      state.missions = state.missions.map((mission) => (mission.mission_id === missionId
        ? { ...mission, activeMember: !mission?.activeMember ?? true }
        : mission));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.missions = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default missionsSlice.reducer;
export { fetchMissions };
export const { member } = missionsSlice.actions;
