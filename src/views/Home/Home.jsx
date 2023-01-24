import {
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Box,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import logo from '@/assets/logo.svg';
import './Home.scss';
import { SET_USER } from '@/plugins/store/actions/actions';

function Home() {
  // Hooks
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: '',
    },
  });
  const { email } = watch();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation('translation');

  /**
   * Submit email form
   */
  const handleValidate = () => {
    handleSubmit(handleSetEmail)();
  };

  /**
   * Set email in store
   */
  const handleSetEmail = () => {
    dispatch({ type: SET_USER, email });
    dispatch({ type: SET_USER, email });
    navigate('/lists');
  };

  return (
    <Container className="Home">
      <img className="Home--logo" src={logo} alt="Todo logo" />
      <Card className="Home--card" elevation={8}>
        <CardContent className="Home--card-content">
          <Typography
            color="text.secondary"
            gutterBottom
            className="Home--card-title"
          >
            {t('Home.Title')}
          </Typography>
          <Box
            className="Home--card-form"
            component="form"
            onSubmit={handleSubmit(handleSetEmail)}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: t('Error.Email_Required'),
                pattern: {
                  value:
                    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                  message: t('Error.Email_Format'),
                },
              }}
              render={({ field }) => (
                <TextField
                  className="Home--card-input"
                  label={t('Home.Email_Label')}
                  variant="filled"
                  size="small"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...field}
                />
              )}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Button className="Home--card-button" onClick={handleValidate}>
            {t('Home.Validate')}
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Home;
