import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

// Mock child component
const MockChildComponent = () => <div data-testid="child-component">Child Component</div>;

// Mock Navigate component for verification
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        Navigate: vi.fn(({ to, replace }) => <div data-testid="navigate-mock" data-to={to} data-replace={replace?.toString()}>Navigating</div>),
    };
});


describe('ProtectedRoute Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

  test('renders child component when isAuthenticated is true', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute isAuthenticated={true} element={<MockChildComponent />} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('child-component')).toBeInTheDocument();
    expect(screen.getByText('Child Component')).toBeInTheDocument();
    expect(Navigate).not.toHaveBeenCalled();
  });

  test('redirects to /login when isAuthenticated is false', () => {
    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<ProtectedRoute isAuthenticated={false} element={<MockChildComponent />} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('child-component')).not.toBeInTheDocument();
    expect(Navigate).toHaveBeenCalledTimes(1);
    expect(Navigate).toHaveBeenCalledWith({ to: '/login', replace: true }, {});

    // Check if the Navigate mock is rendering what we expect
    const navigateMock = screen.getByTestId('navigate-mock');
    expect(navigateMock).toBeInTheDocument();
    expect(navigateMock).toHaveAttribute('data-to', '/login');
    expect(navigateMock).toHaveAttribute('data-replace', 'true');
  });
});
