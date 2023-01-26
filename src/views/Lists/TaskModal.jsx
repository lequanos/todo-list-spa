import { useEffect } from 'react';
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
import {
  CREATE_TASK,
  TOGGLE_TASK_MODAL,
  UPDATE_TASK,
  RESET_TASK,
} from '@/plugins/store/actions/actions';

function TaskModal() {
  // Hooks
  const currentTask = useSelector((state) => state.task);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      endDate: dayjs(),
    },
  });
  const { title, endDate } = watch();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const taskModal = useSelector((state) => state.modal.taskModal);
  const listId = useSelector((state) => state.modal.listId);

  // Methods
  /**
   * Close modal
   */
  const handleClose = () => {
    dispatch({ type: TOGGLE_TASK_MODAL, taskModal: false });
    dispatch({ type: RESET_TASK });
    setValue('title', '');
    setValue('endDate', dayjs());
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
   * Update task
   */
  const handleUpdateTask = () => {
    dispatch({
      type: UPDATE_TASK,
      task: {
        id: currentTask.id,
        title,
        endDate,
        status: currentTask.status,
        listId,
      },
    });
  };

  /**
   * Validate the form
   */
  const handleValidate = async (e) => {
    e.preventDefault();

    if (currentTask.id.length) {
      await handleSubmit(handleUpdateTask)();
    } else {
      await handleSubmit(handleCreateTask)();
    }

    if (!errors.hasOwnProperty('title')) handleClose();
  };

  useEffect(() => {
    if (currentTask.id.length) {
      setValue('title', currentTask.title);
      setValue('endDate', dayjs(currentTask.endDate));
    }
  }, [setValue, currentTask]);

  return (
    <Dialog open={taskModal} onClose={handleClose}>
      <DialogTitle>
        {currentTask.id.length
          ? t('TaskModal.UpdateTitle')
          : t('TaskModal.CreateTitle')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{t('TaskModal.Text')}</DialogContentText>
        <Box
          className="TaskModal--form"
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
                label={t('TaskModal.Title_Label')}
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
                label={t('TaskModal.EndDate_Label')}
                minDateTime={dayjs()}
                {...field}
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('TaskModal.Cancel')}</Button>
        <Button onClick={handleValidate}>{t('TaskModal.Validate')}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default TaskModal;
