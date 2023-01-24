import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import List from '@/components/List/List';
import { FETCH_LISTS } from '@/plugins/store/actions/actions';

function Lists() {
  // Hooks
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch({ type: FETCH_LISTS });
  }, [dispatch]);

  return (
    <Container>
      {lists.map((list) => (
        <List
          key={list.id}
          title={list.title}
          tasks={list.tasks}
          listId={list.id}
        />
      ))}
    </Container>
  );
}

export default Lists;
