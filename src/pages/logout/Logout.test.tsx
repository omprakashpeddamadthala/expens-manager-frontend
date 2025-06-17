import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Logout from './Logout';

// Mock react-router-dom's useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock localStorage
const mockRemoveItem = vi.fn();
const mockLocalStorage = {
  removeItem: mockRemoveItem,
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage, configurable: true });

describe('Logout Component', () => {
  let mockSetCurrentUser: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSetCurrentUser = vi.fn();
  });

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <Logout setCurrentUser={mockSetCurrentUser} />
      </MemoryRouter>
    );
  };

  test('renders "Logging out..." message', () => {
    renderComponent();
    expect(screen.getByText(/logging out.../i)).toBeInTheDocument();
  });

  test('calls localStorage.removeItem for "currentUser"', () => {
    renderComponent();
    expect(mockRemoveItem).toHaveBeenCalledWith('currentUser');
    expect(mockRemoveItem).toHaveBeenCalledTimes(1);
  });

  test('redirects to /login', () => {
    renderComponent();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  test('calls setCurrentUser prop with null', () => {
    renderComponent();
    expect(mockSetCurrentUser).toHaveBeenCalledWith(null);
    expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);
  });
});
