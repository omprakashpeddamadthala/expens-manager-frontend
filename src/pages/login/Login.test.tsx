import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Login from './Login';

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
const mockSetItem = vi.fn();
const mockLocalStorage = {
  setItem: mockSetItem,
};
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

describe('Login Component', () => {
  let mockSetCurrentUser: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSetCurrentUser = vi.fn();
  });

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <Login setCurrentUser={mockSetCurrentUser} />
      </MemoryRouter>
    );
  };

  test('renders login form correctly', () => {
    renderComponent();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('successful login calls localStorage.setItem, navigates to /, and calls setCurrentUser', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockSetItem).toHaveBeenCalledWith(
      'currentUser',
      JSON.stringify({ email: 'test@example.com', name: 'Test User' })
    );
    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockSetCurrentUser).toHaveBeenCalledWith({ email: 'test@example.com', name: 'Test User' });
  });

  test('incorrect credentials display an error message', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument();
    expect(mockSetItem).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
    expect(mockSetCurrentUser).not.toHaveBeenCalled();
  });

   test('setCurrentUser prop is called with user object on successful login', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(mockSetCurrentUser).toHaveBeenCalledTimes(1);
    expect(mockSetCurrentUser).toHaveBeenCalledWith({ email: 'test@example.com', name: 'Test User' });
  });
});
