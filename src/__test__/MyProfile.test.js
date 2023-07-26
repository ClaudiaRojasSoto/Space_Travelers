import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MyProfile from '../components/MyProfile';

const mockStore = configureStore([thunk]);

describe('MyProfile', () => {
  it('displays loading state initially', () => {
    const store = mockStore({
      rockets: { rocketsData: [] },
      missions: { missions: [] },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MyProfile />
      </Provider>,
    );

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('displays missions and rockets when data is loaded', async () => {
    const store = mockStore({
      rockets: {
        rocketsData: [
          { id: 1, rocket_name: 'Falcon 1', reserved: true },
          { id: 2, rocket_name: 'Falcon Heavy', reserved: false },
        ],
      },
      missions: {
        missions: [
          { mission_id: 1, mission_name: 'Starlink-1', activeMember: true },
          { mission_id: 2, mission_name: 'Starlink-2', activeMember: false },
        ],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MyProfile />
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('My Missions')).toBeInTheDocument();
      expect(getByText('Starlink-1')).toBeInTheDocument();
      expect(getByText('My Rockets')).toBeInTheDocument();
      expect(getByText('Falcon 1')).toBeInTheDocument();
    });
  });
});
