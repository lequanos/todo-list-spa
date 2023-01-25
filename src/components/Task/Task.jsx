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
import PropTypes from 'prop-types';

import './Task.scss';

function Task({ title, endDate, status, listId }) {
  // Hooks
  const { t } = useTranslation();

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
  title: PropTypes.string,
  endDate: PropTypes.string,
  status: PropTypes.string,
  listId: PropTypes.string,
};

Task.defaultProps = {
  title: '',
  endDate: '',
  status: '',
  listId: '',
};

export default Task;
