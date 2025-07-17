import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { userServices } from 'services';
import { enable, disable } from 'darkreader';
import App from './App';

const { getByTestId } = screen;

describe('User has not logged in yet', () => {
  // Smoke testing (no assertions)
  it('Renders correctly', () => {
    jest.spyOn(userServices, 'isLoggedIn').mockReturnValueOnce(false);
    render(<App />);
  });
});

describe('User has already logged in', () => {
  it('Renders correctly', () => {
    render(<App />);
  });

  it('Clicks logout on header', async () => {
    const logoutMock = jest.spyOn(userServices, 'logout');
    render(<App />);
    await waitFor(() => {
      fireEvent.click(getByTestId('btn-logout'));
    });
    expect(logoutMock).toHaveBeenCalled();
  });

  it('Clicks toggle sidebar', async () => {
    render(<App />);
    await waitFor(() => {
      fireEvent.click(getByTestId('sider-icon'));
    });
    expect(getByTestId('sider-icon')).toBeInTheDocument();
  });

  it('Click toggle dark/light mode', async () => {
    render(<App />);

    await waitFor(() => {
      fireEvent.click(getByTestId('theme-switch'));
    });

    expect(enable).toHaveBeenCalled();

    await waitFor(() => {
      fireEvent.click(getByTestId('theme-switch'));
    });

    expect(disable).toHaveBeenCalled();
  });
});
