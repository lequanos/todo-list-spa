import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './Unauthorized.scss';

function Unauthorized() {
  // Hooks
  const navigate = useNavigate();

  // Methods
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container className="Unauthorized">
      <Typography variant="h1" className="Unauthorized--title">
        401
      </Typography>
      <Typography variant="h5">
        Veuillez entrer une adresse mail pour utiliser l'application
      </Typography>
      <Button variant="outlined" color="secondary" onClick={handleBackToHome}>
        Retour à l'accueil
      </Button>
    </Container>
  );
}

export default Unauthorized;
