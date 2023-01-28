import { useState } from 'react';
import {
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  ListItemIcon,
  Checkbox,
  Divider,
  Menu,
  MenuItem,
} from '@mui/material';
import { MoreVert, Delete, Edit } from '@mui/icons-material';
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
  const [anchorEl, setAnchorEl] = useState(null);

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

  /**
   * Open task menu
   */
  const handleOpenTaskMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  /**
   * Close task menu
   */
  const handleCloseTaskMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Divider />
      <ListItem
        className={`Task--${status}`}
        alignItems="flex-start"
        disableGutters
        secondaryAction={
          <IconButton
            onClick={handleOpenTaskMenu}
            disabled={status === 'inactive'}
          >
            <MoreVert fontSize="small" />
          </IconButton>
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
                {t('Task.PlannedEnd')}
              </Typography>
              <Typography
                className={status === 'late' ? 'Task--late' : ''}
                variant="caption"
              >
                {dayjs(endDate).format('lll')}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Menu
        className="Task--menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleCloseTaskMenu}
        onClick={handleCloseTaskMenu}
        PaperProps={{
          elevation: 0,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleOpenTaskModal}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          {t('Task.Edit')}
        </MenuItem>
        <MenuItem onClick={handleDeleteTask}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          {t('Task.Delete')}
        </MenuItem>
      </Menu>
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
