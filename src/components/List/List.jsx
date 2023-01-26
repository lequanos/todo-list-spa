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
  DELETE_LIST,
  TOGGLE_ADD_TASK_MODAL,
} from '@/plugins/store/actions/actions';

function List({ title, tasks, listId }) {
  // Hooks
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Methods
  /**
   * Dispatch delete list saga
   */
  const handleDeleteList = () => {
    dispatch({ type: DELETE_LIST, listId });
  };

  /**
   * Handle open create task modal
   */
  const handleOpenAddTaskModal = () => {
    dispatch({ type: TOGGLE_ADD_TASK_MODAL, addTaskModal: true, listId });
  };

  return (
    <Card sx={{ width: 350 }} elevation={8}>
      <CardHeader
        action={
          <IconButton onClick={handleDeleteList}>
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
            onClick={handleOpenAddTaskModal}
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
              title={task.title}
              endDate={task.endDate}
              status={task.status}
              listId={listId}
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
