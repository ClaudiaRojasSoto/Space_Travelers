import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import MissionsList from '../components/MissionsList';

const mockStore = configureStore([]);

describe('Missions', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      missions: {
        missions: [
          {
            mission_id: '1000',
            mission_name: 'first mission',
            description: 'first description',
            activeMember: true,
          },
          {
            mission_id: '2000',
            mission_name: 'second mission',
            description: 'second description',
            activeMember: false,
          },
        ],
      },
    });
  });

  test('renders mission list correctly', () => {
    render(
      <Provider store={store}>
        <MissionsList />
      </Provider>,
    );

    expect(screen.getByText('first mission')).toBeInTheDocument();
    expect(screen.getByText('second mission')).toBeInTheDocument();

    expect(screen.getByText('second description')).toBeInTheDocument();
    expect(screen.getByText('second description')).toBeInTheDocument();

    expect(screen.getByText('ACTIVE MEMBER')).toBeInTheDocument();
    expect(screen.getByText('NOT A MEMBER')).toBeInTheDocument();
  });
});
