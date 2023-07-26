import missionsReducer, { fetchMissions } from '../redux/missions/missionsSlice';

test('reducers', () => {
  let state = null;
  state = missionsReducer(undefined, fetchMissions.pending());
  expect(state.isLoading).toBe(true);
});
