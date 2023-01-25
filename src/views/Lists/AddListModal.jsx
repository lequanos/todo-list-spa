import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { CREATE_LIST } from '@/plugins/store/actions/actions';

function AddListModal({ open, setOpen }) {
  // Hooks
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
    },
  });
  const { title } = watch();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Methods
  /**
   * Close modal
   */
  const handleClose = () => {
    setOpen(false);
    setValue('title', '');
  };

  /**
   * Save new list
   */
  const handleCreateList = () => {
    dispatch({ type: CREATE_LIST, title });
  };

  /**
   * Validate the form
   */
  const handleValidate = async (e) => {
    e.preventDefault();
    await handleSubmit(handleCreateList)();

    if (!errors.hasOwnProperty('title')) handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('AddListModal.Title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('AddListModal.Text')}</DialogContentText>
        <Box component="form" onSubmit={async (e) => await handleValidate(e)}>
          <Controller
            name="title"
            control={control}
            rules={{
              required: t('Error.Title_Required'),
            }}
            render={({ field }) => (
              <TextField
                size="small"
                error={!!errors.title}
                helperText={errors.title?.message}
                autoFocus
                margin="dense"
                label={t('AddListModal.Label')}
                fullWidth
                variant="standard"
                {...field}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('AddListModal.Cancel')}</Button>
        <Button onClick={handleValidate}>{t('AddListModal.Validate')}</Button>
      </DialogActions>
    </Dialog>
  );
}

AddListModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default AddListModal;
