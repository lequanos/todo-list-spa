import logo from '@/assets/logo.svg';
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

import './Home.scss';

function Home() {
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
    console.log(email);
  };

  return (
    <Container className="Home">
      <img className="Home--logo" src={logo} />
      <Card className="Home--card" elevation={8}>
        <CardContent className="Home--card-content">
          <Typography
            color="text.secondary"
            gutterBottom
            className="Home--card-title"
          >
            Veuillez entrer une adresse mail pour accéder à l'application
          </Typography>
          <Box Box component="form" onSubmit={handleSubmit(handleSetEmail)}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Adresse email requise',
                pattern: {
                  value:
                    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
                  message: 'Veuillez entrer une adresse email valide',
                },
              }}
              render={({ field }) => (
                <TextField
                  className="Home--card-input"
                  label="Adresse email"
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
            Valider
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default Home;
