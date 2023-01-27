import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './Unauthorized.scss';

function Unauthorized() {
  // Hooks
  const navigate = useNavigate();
  const { t } = useTranslation('translation');

  // Methods
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <Container className="Unauthorized">
      <Typography variant="h1" className="Unauthorized--title">
        401
      </Typography>
      <Typography variant="h5">{t('Unauthorized.Title')}</Typography>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleBackToHome}
        sx={{ mt: '1rem' }}
      >
        {t('Unauthorized.Back')}
      </Button>
    </Container>
  );
}

export default Unauthorized;
