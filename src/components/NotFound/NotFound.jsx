import { Container, Typography, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import './NotFound.scss';

function NotFound() {
  // Hooks
  const navigate = useNavigate();

  // Methods
  /**
   * Go back to the previous history stack entry
   */
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container className="notfound">
      <Typography variant="h1" className="notfound--title">
        404
      </Typography>
      <Typography variant="h5">Page introuvable</Typography>
      <Button variant="outlined" color="secondary" onClick={handleBack}>
        Revenir en arrière
      </Button>
    </Container>
  );
}

export default NotFound;
