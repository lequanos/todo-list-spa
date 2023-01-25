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
import PropTypes from 'prop-types';

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
    console.log(title);
  };

  /**
   * Validate the form
   */
  const handleValidate = () => {
    handleSubmit(handleCreateList)();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t('AddListModal.Title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('AddListModal.Text')}</DialogContentText>
        <Box
          className="Home--card-form"
          component="form"
          onSubmit={handleSubmit(handleCreateList)}
        >
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
