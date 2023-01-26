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
import { useDispatch, useSelector } from 'react-redux';

import {
  CREATE_LIST,
  TOGGLE_ADD_LIST_MODAL,
} from '@/plugins/store/actions/actions';

function AddListModal() {
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
  const addListModal = useSelector((state) => state.modal.addListModal);

  // Methods
  /**
   * Close modal
   */
  const handleClose = () => {
    dispatch({
      type: TOGGLE_ADD_LIST_MODAL,
      addListModal: false,
    });
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
    <Dialog open={addListModal} onClose={handleClose}>
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

export default AddListModal;
