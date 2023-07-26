import rocketsReducer, {
  setRocketsData, setLoading, setError, reserveRocket, cancelRocket,
} from '../redux/rockets/rocketsSlice';

describe('rockets reducer', () => {
  let state = null;

  beforeEach(() => {
    state = {
      rocketsData: [],
      loading: false,
      error: null,
    };
  });

  it('should handle setRocketsData', () => {
    const mockData = [
      {
        id: 1, rocket_name: 'Rocket Name 1', description: 'Description 1', flickr_images: ['image1_1', 'image1_2'], reserved: false,
      },
      {
        id: 2, rocket_name: 'Rocket Name 2', description: 'Description 2', flickr_images: ['image2_1', 'image2_2'], reserved: false,
      },
    ];

    state = rocketsReducer(state, setRocketsData(mockData));
    expect(state.rocketsData).toEqual(mockData);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should handle setLoading', () => {
    state = rocketsReducer(state, setLoading());
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle setError', () => {
    const mockError = 'Error fetching data';

    state = rocketsReducer(state, setError(mockError));
    expect(state.loading).toBe(false);
    expect(state.error).toEqual(mockError);
  });

  it('should handle reserveRocket', () => {
    const initialState = {
      rocketsData: [{
        id: 1, rocket_name: 'Rocket Name 1', description: 'Description 1', flickr_images: ['image1_1', 'image1_2'], reserved: false,
      }],
      loading: false,
      error: null,
    };

    state = rocketsReducer(initialState, reserveRocket(1));
    expect(state.rocketsData[0].reserved).toBe(true);
  });

  it('should handle cancelRocket', () => {
    const initialState = {
      rocketsData: [{
        id: 1, rocket_name: 'Rocket Name 1', description: 'Description 1', flickr_images: ['image1_1', 'image1_2'], reserved: true,
      }],
      loading: false,
      error: null,
    };

    state = rocketsReducer(initialState, cancelRocket(1));
    expect(state.rocketsData[0].reserved).toBe(false);
  });
});
