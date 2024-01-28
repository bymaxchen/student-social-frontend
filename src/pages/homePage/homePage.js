import React, { useContext } from 'react';
import { AuthContext } from '../../AuthContext'
import { Button } from 'antd';


function HomePage() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // Optionally redirect to login page or perform other actions post-logout
  };

  return (
    <div>
      <h1>Welcome to the Student Social Platform</h1>
      <Button type="primary"  onClick={handleLogout}>logout</Button>
    </div>
  );
}

export default HomePage;
