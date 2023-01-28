import { useMemo, useState } from 'react';
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  List as MuiList,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MoreVert, AddCircleOutlined, Edit, Delete } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import './List.scss';
import Task from '../Task/Task';
import ListTitle from './ListTitle';
import {
  TOGGLE_TASK_MODAL,
  TOGGLE_DELETE_MODAL,
} from '@/plugins/store/actions/actions';

function List({ title, tasks, listId }) {
  // Hooks
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(false);

  // Methods
  /**
   * Open delete modal for list
   */
  const handleDeleteList = () => {
    dispatch({
      type: TOGGLE_DELETE_MODAL,
      deleteModal: true,
      listId,
      listTitle: title,
    });
  };

  /**
   * Handle open create task modal
   */
  const handleOpenTaskModal = () => {
    dispatch({ type: TOGGLE_TASK_MODAL, taskModal: true, listId });
  };

  const isCompletedList = useMemo(
    () => tasks.every((task) => task.status === 'inactive') && tasks.length,
    [tasks],
  );

  /**
   * Open list menu
   */
  const handleOpenListMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  /**
   * Close list menu
   */
  const handleCloseListMenu = () => {
    setAnchorEl(null);
  };

  /**
   * Edit list title
   */
  const handleEditList = () => {
    setEdit(true);
  };

  return (
    <>
      <Card
        sx={{
          width: 350,
          opacity: isCompletedList ? 0.7 : 1,
        }}
        elevation={8}
      >
        <CardHeader
          action={
            <IconButton onClick={handleOpenListMenu} disabled={isCompletedList}>
              <MoreVert />
            </IconButton>
          }
          title={
            <ListTitle
              title={title}
              tasks={tasks}
              listId={listId}
              edit={edit}
            />
          }
          subheader={
            <Button
              className={isCompletedList ? 'List--inactive' : ''}
              startIcon={<AddCircleOutlined />}
              size="small"
              sx={{
                mt: '0.5rem',
              }}
              onClick={handleOpenTaskModal}
              disabled={isCompletedList}
            >
              {t('List.Add_Task')}
            </Button>
          }
          titleTypographyProps={{
            variant: 'h5',
          }}
        />
        <CardContent>
          <MuiList>
            {tasks.map((task) => (
              <Task
                key={task._id}
                id={task._id}
                title={task.title}
                endDate={task.endDate}
                status={task.status}
                listId={listId}
                listTitle={title}
              />
            ))}
          </MuiList>
        </CardContent>
      </Card>
      <Menu
        className="List--menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleCloseListMenu}
        onClick={handleCloseListMenu}
        PaperProps={{
          elevation: 0,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleEditList}>
          <ListItemIcon>
            <Edit fontSize="small" />
          </ListItemIcon>
          {t('List.Edit')}
        </MenuItem>
        <MenuItem onClick={handleDeleteList}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          {t('List.Delete')}
        </MenuItem>
      </Menu>
    </>
  );
}

List.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array,
  listId: PropTypes.string.isRequired,
};

List.defaultProps = {
  tasks: [],
};

export default List;
