import {
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  ListItemIcon,
  Checkbox,
  Divider,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import './Task.scss';
import { UPDATE_TASK } from '@/plugins/store/actions/actions';

function Task({ id, title, endDate, status, listId }) {
  // Hooks
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Methods
  /**
   * Update status of a task
   */
  const handleCheckTask = () => {
    dispatch({
      type: UPDATE_TASK,
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

  return (
    <>
      <Divider />
      <ListItem
        className={`Task--${status}`}
        alignItems="flex-start"
        disableGutters
        secondaryAction={
          <IconButton disabled={status === 'inactive'}>
            <Edit />
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
};

Task.defaultProps = {
  id: '',
  title: '',
  endDate: '',
  status: '',
  listId: '',
};

export default Task;
