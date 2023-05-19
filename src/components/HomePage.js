import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
  };

  const x = localStorage.getItem('x-Auth-token');

  if (x) {
    return (
      <div>
        <h1> Welcome to the my Home Page </h1>
        <br />
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleLogOut}
        >
          Log out
        </Button>
      </div>
    );
  } else {
    navigate('/');
    return null; // or display a loading state while redirecting
  }
};

export default HomePage;
