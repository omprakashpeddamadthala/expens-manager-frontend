import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoutProps {
  setCurrentUser: (user: null) => void;
}

const Logout: React.FC<LogoutProps> = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove currentUser from local storage
    localStorage.removeItem('currentUser');
    // Update app state
    setCurrentUser(null);

    // Redirect to login page
    navigate('/login');
  }, [navigate, setCurrentUser]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
