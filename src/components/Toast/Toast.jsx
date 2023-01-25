import { Snackbar, Alert } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { CLOSE_TOAST } from '../../plugins/store/actions/actions';

function Toast() {
  // Hooks
  const toast = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  const handleCloseSnackbar = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: CLOSE_TOAST });
  };
  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={1500}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleCloseSnackbar} severity={toast.severity}>
        {toast.message}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
