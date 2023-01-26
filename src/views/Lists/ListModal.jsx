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
  TOGGLE_LIST_MODAL,
} from '@/plugins/store/actions/actions';

function ListModal() {
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
  const listModal = useSelector((state) => state.modal.listModal);

  // Methods
  /**
   * Close modal
   */
  const handleClose = () => {
    dispatch({
      type: TOGGLE_LIST_MODAL,
      listModal: false,
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
    <Dialog open={listModal} onClose={handleClose}>
      <DialogTitle>{t('ListModal.Title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('ListModal.Text')}</DialogContentText>
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
                label={t('ListModal.Label')}
                fullWidth
                variant="standard"
                {...field}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('ListModal.Cancel')}</Button>
        <Button onClick={handleValidate}>{t('ListModal.Validate')}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ListModal;
