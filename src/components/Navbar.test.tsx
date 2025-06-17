import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

// Define a type for the user object for testing purposes
interface User {
  email: string;
  name: string;
}

describe('Navbar Component', () => {
  const testUser: User = { email: 'test@example.com', name: 'Test User' };

  test('shows Login and Register links when no user is logged in', () => {
    render(
      <MemoryRouter>
        <Navbar currentUser={null} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
    expect(screen.queryByText(/welcome, test user/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /logout/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /new expense/i})).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /reports/i})).not.toBeInTheDocument();
  });

  test('shows Logout link and user name when a user is logged in', () => {
    render(
      <MemoryRouter>
        <Navbar currentUser={testUser} />
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome, test user!/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /register/i })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /new expense/i})).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /reports/i})).toBeInTheDocument();
  });

  test('shows New Expense and Reports links when user is logged in', () => {
    render(
      <MemoryRouter>
        <Navbar currentUser={testUser} />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /new expense/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /reports/i })).toBeInTheDocument();
  });

  test('hides New Expense and Reports links when no user is logged in', () => {
    render(
      <MemoryRouter>
        <Navbar currentUser={null} />
      </MemoryRouter>
    );
    expect(screen.queryByRole('link', { name: /new expense/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /reports/i })).not.toBeInTheDocument();
  });
});
