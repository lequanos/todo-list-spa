import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { CLOSE_TOAST } from '../../plugins/store/actions/actions';

function Toast() {
  // Hooks
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: CLOSE_TOAST });
  };
  return (
    <Snackbar
      open={error.open}
      autoHideDuration={1500}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleCloseSnackbar} severity="error">
        {error.message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
