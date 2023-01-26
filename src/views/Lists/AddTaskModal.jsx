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
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import './Lists.scss';
import { CREATE_TASK } from '@/plugins/store/actions/actions';
import { TOGGLE_ADD_TASK_MODAL } from '@/plugins/store/actions/actions';

function AddTaskModal() {
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
      endDate: new Date(),
    },
  });
  const { title, endDate } = watch();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const addTaskModal = useSelector((state) => state.modal.addTaskModal);
  const listId = useSelector((state) => state.modal.listId);

  // Methods
  /**
   * Close modal
   */
  const handleClose = () => {
    dispatch({ type: TOGGLE_ADD_TASK_MODAL, addTaskModal: false });
    setValue('title', '');
  };

  /**
   * Save new task
   */
  const handleCreateTask = () => {
    dispatch({
      type: CREATE_TASK,
      task: {
        title,
        endDate,
        listId,
      },
    });
  };

  /**
   * Validate the form
   */
  const handleValidate = async (e) => {
    e.preventDefault();
    await handleSubmit(handleCreateTask)();

    if (!errors.hasOwnProperty('title')) handleClose();
  };

  return (
    <Dialog open={addTaskModal} onClose={handleClose}>
      <DialogTitle>{t('AddTaskModal.Title')}</DialogTitle>
      <DialogContent>
        <DialogContentText>{t('AddTaskModal.Text')}</DialogContentText>
        <Box
          className="AddTaskModal--form"
          component="form"
          onSubmit={async (e) => await handleValidate(e)}
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
                label={t('AddTaskModal.Title_Label')}
                fullWidth
                variant="standard"
                {...field}
              />
            )}
          />
          <Controller
            name="endDate"
            control={control}
            rules={{
              required: t('Error.EndDate_Required'),
            }}
            render={({ field }) => (
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label={t('AddTaskModal.EndDate_Label')}
                minDateTime={dayjs()}
                {...field}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('AddTaskModal.Cancel')}</Button>
        <Button onClick={handleValidate}>{t('AddTaskModal.Validate')}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTaskModal;
