import * as rocketsActions from '../redux/rockets/rocketsActions';

describe('rocketsActions', () => {
  it('should create an action to set rockets data', () => {
    const mockData = [{
      id: 1, name: 'Rocket Name 1', type: 'Rocket Type 1', flickr_images: ['image1_1', 'image1_2'], reserved: false,
    }];
    const expectedAction = {
      type: 'SET_ROCKETS_DATA',
      payload: mockData,
    };
    expect(rocketsActions.setRocketsData(mockData)).toEqual(expectedAction);
  });

  it('should create an action to set loading', () => {
    const expectedAction = {
      type: 'SET_ROCKETS_LOADING',
    };
    expect(rocketsActions.setLoading()).toEqual(expectedAction);
  });

  it('should create an action to set error', () => {
    const error = 'Error fetching data';
    const expectedAction = {
      type: 'SET_ROCKETS_ERROR',
      payload: error,
    };
    expect(rocketsActions.setError(error)).toEqual(expectedAction);
  });
});
