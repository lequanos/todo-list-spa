import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import './Lists.scss';
import List from '@/components/List/List';
import Toast from '@/components/Toast/Toast';
import { FETCH_LISTS } from '@/plugins/store/actions/actions';

function Lists() {
  // Hooks
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch({ type: FETCH_LISTS });
  }, [dispatch]);

  return (
    <Container className="Lists">
      {lists.map((list) => (
        <List
          key={list._id}
          title={list.title}
          tasks={list.tasks}
          listId={list._id}
        />
      ))}
      <Toast />
    </Container>
  );
}

export default Lists;
