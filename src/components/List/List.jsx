import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  List as MuiList,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import PropTypes from 'prop-types';

import Task from '../Task/Task';

function List({ title, tasks, listId }) {
  return (
    <Card sx={{ width: 350 }} elevation={8}>
      <CardHeader
        action={
          <IconButton>
            <Add />
          </IconButton>
        }
        title={title}
        titleTypographyProps={{
          variant: 'h5',
        }}
      />
      <CardContent>
        <MuiList>
          {tasks.map((task) => (
            <Task
              key={task.id}
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
  title: PropTypes.string,
  tasks: PropTypes.array,
  listId: PropTypes.string,
};

List.defaultProps = {
  title: '',
  tasks: [],
  listId: '',
};

export default List;
