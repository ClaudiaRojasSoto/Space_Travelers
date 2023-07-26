import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import Rockets from '../components/Rockets';

const mockStore = configureStore([]);

describe('Rockets', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      rockets: {
        loading: false,
        error: null,
        rocketsData: [
          {
            id: '1000',
            rocket_name: 'first rocket',
            description: 'first description',
            reserved: true,
            flickr_images: ['http://example.com/image1.jpg'],
          },
          {
            id: '2000',
            rocket_name: 'second rocket',
            description: 'second description',
            reserved: false,
            flickr_images: ['http://example.com/image2.jpg'],
          },
        ],
      },
    });
  });

  test('renders rockets list correctly', () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    expect(screen.getByText('first rocket')).toBeInTheDocument();
    expect(screen.getByText('second rocket')).toBeInTheDocument();

    expect(screen.getByText('first description')).toBeInTheDocument();
    expect(screen.getByText('second description')).toBeInTheDocument();

    expect(screen.getByText('Reserved')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reserve Rocket/i })).toBeInTheDocument();
  });

  test('renders the image for each rocket', () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const firstRocketImage = document.querySelector(`img[src="http://example.com/image1.jpg"]`);
    const secondRocketImage = document.querySelector(`img[src="http://example.com/image2.jpg"]`);

    expect(firstRocketImage).toBeInTheDocument();
    expect(secondRocketImage).toBeInTheDocument();
  });

  test('renders "Reserve Rocket" button for unreserved rockets', () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const reserveButton = screen.getByRole('button', { name: /Reserve Rocket/i });

    expect(reserveButton).toBeInTheDocument();
  });

  test('renders "Cancel Reservation" button for reserved rockets', () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    const cancelButton = screen.getByRole('button', { name: /Cancel Reservation/i });

    expect(cancelButton).toBeInTheDocument();
  });

  test('does not render "Loading..." when not loading', () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('does not render error when there is no error', () => {
    render(
      <Provider store={store}>
        <Rockets />
      </Provider>,
    );

    expect(screen.queryByText(/Error:/i)).not.toBeInTheDocument();
  });
});
