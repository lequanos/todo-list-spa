import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './NotFound.scss';

function NotFound() {
  // Hooks
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <Typography variant="h5">{t('NotFound.Title')}</Typography>
      <Button variant="outlined" color="secondary" onClick={handleBack}>
        {t('NotFound.Title')}
      </Button>
    </Container>
  );
}

export default NotFound;
