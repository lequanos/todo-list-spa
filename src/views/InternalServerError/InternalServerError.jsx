import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './InternalServerError.scss';

function InternalServerError() {
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
    <Container className="internalServerError">
      <Typography variant="h1" className="internalServerError--title">
        500
      </Typography>
      <Typography Typography variant="h5">
        {t('InternalServerError.Title')}
      </Typography>
      <Button variant="outlined" color="secondary" onClick={handleBack}>
        {t('InternalServerError.Back')}
      </Button>
    </Container>
  );
}

export default InternalServerError;
