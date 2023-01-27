import {
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  ListItemIcon,
  Checkbox,
  Divider,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import './Task.scss';
import {
  SET_TASK,
  TOGGLE_TASK_MODAL,
  TOGGLE_DELETE_MODAL,
  TOGGLE_CHECK_TASK,
} from '@/plugins/store/actions/actions';

function Task({ id, title, endDate, status, listId, listTitle }) {
  // Hooks
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Methods
  /**
   * Update status of a task
   */
  const handleCheckTask = () => {
    dispatch({
      type: TOGGLE_CHECK_TASK,
      task: { id, title, endDate, listId, status: getTaskStatus() },
    });
  };

  /**
   * Get status of a task for update task
   */
  const getTaskStatus = () => {
    switch (true) {
      case status === 'late':
        return 'inactive';
      case status === 'active':
        return 'inactive';
      case status === 'inactive' && dayjs().isAfter(dayjs(endDate)):
        return 'late';
      default:
        return 'active';
    }
  };

  /**
   * Open task modal to edit task
   */
  const handleOpenTaskModal = () => {
    dispatch({ type: SET_TASK, task: { id, title, endDate, listId, status } });
    dispatch({ type: TOGGLE_TASK_MODAL, taskModal: true, listId });
  };

  /**
   * Open delete task modal
   */
  const handleDeleteTask = () => {
    dispatch({
      type: TOGGLE_DELETE_MODAL,
      deleteModal: true,
      taskId: id,
      taskTitle: title,
      listId,
      listTitle,
    });
  };

  return (
    <>
      <Divider />
      <ListItem
        className={`Task--${status}`}
        alignItems="flex-start"
        disableGutters
        secondaryAction={
          <>
            <IconButton
              onClick={handleOpenTaskModal}
              disabled={status === 'inactive'}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              onClick={handleDeleteTask}
              disabled={status === 'inactive'}
            >
              <Delete fontSize="small" />
            </IconButton>
          </>
        }
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={status === 'inactive'}
            disableRipple
            onChange={handleCheckTask}
          />
        </ListItemIcon>
        <ListItemText
          primary={`${title}${
            status === 'late' ? ' - ' + t('Task.Late').toLocaleUpperCase() : ''
          }`}
          secondary={
            <>
              <Typography
                className={status === 'late' ? 'Task--late' : ''}
                variant="caption"
                display="block"
              >
                Fin prévue :
              </Typography>
              <Typography
                className={status === 'late' ? 'Task--late' : ''}
                variant="caption"
              >
                {new Date(endDate).toLocaleString()}
              </Typography>
            </>
          }
        />
      </ListItem>
    </>
  );
}

Task.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  endDate: PropTypes.string,
  status: PropTypes.string,
  listId: PropTypes.string,
  listTitle: PropTypes.string,
};

Task.defaultProps = {
  id: '',
  title: '',
  endDate: '',
  status: '',
  listId: '',
  listTitle: '',
};

export default Task;
