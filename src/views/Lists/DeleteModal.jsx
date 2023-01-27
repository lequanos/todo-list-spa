import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation, Trans } from 'react-i18next';

import {
  TOGGLE_DELETE_MODAL,
  DELETE_LIST,
  DELETE_TASK,
} from '@/plugins/store/actions/actions';

function DeleteModal() {
  // Hooks
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { open, listId, taskId, listTitle, taskTitle } = useSelector(
    (state) => ({
      open: state.modal.deleteModal,
      listId: state.modal.listId,
      taskId: state.modal.taskId,
      listTitle: state.modal.listTitle,
      taskTitle: state.modal.taskTitle,
    }),
  );

  // Methods
  /**
   * Close modal
   */
  const handleClose = () => {
    dispatch({
      type: TOGGLE_DELETE_MODAL,
      deleteModal: false,
    });
  };

  /**
   * Validate deletion of task or list
   */
  const handleValidate = () => {
    if (taskId.length && listId.length) {
      dispatch({ type: DELETE_TASK, taskId, listId });
    } else if (listId.length) {
      dispatch({ type: DELETE_LIST, listId });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {taskId.length ? (
          <Trans i18nKey="DeleteModal.DeleteTask_Title" />
        ) : (
          <Trans i18nKey="DeleteModal.DeleteList_Title" />
        )}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {taskId.length ? (
            <Trans i18nKey="DeleteModal.DeleteTask_Text" shouldUnescape={true}>
              {{ taskTitle: `"${taskTitle}"` }}
              {{ listTitle: `"${listTitle}"` }}
            </Trans>
          ) : (
            <Trans i18nKey="DeleteModal.DeleteList_Text" shouldUnescape={true}>
              {{ listTitle: `"${listTitle}"` }}
            </Trans>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('DeleteModal.Cancel')}</Button>
        <Button onClick={handleValidate} autoFocus>
          {t('DeleteModal.Validate')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
