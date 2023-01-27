import { useMemo } from 'react';
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  List as MuiList,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Delete, AddCircleOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

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

  return (
    <Card
      sx={{
        width: 350,
        opacity: isCompletedList ? 0.7 : 1,
      }}
      elevation={8}
    >
      <CardHeader
        action={
          <IconButton onClick={handleDeleteList} disabled={isCompletedList}>
            <Delete />
          </IconButton>
        }
        title={<ListTitle title={title} tasks={tasks} listId={listId} />}
        subheader={
          <Button
            className="List--button"
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
