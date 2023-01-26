import { Container, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import './Lists.scss';
import List from '@/components/List/List';
import Toast from '@/components/Toast/Toast';
import AddListModal from './AddListModal';
import AddTaskModal from './AddTaskModal';
import {
  FETCH_LISTS,
  TOGGLE_ADD_LIST_MODAL,
} from '@/plugins/store/actions/actions';

function Lists() {
  // Hooks
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);

  /**
   * Open add list modal
   */
  const handleOpenAddListModal = () => {
    dispatch({
      type: TOGGLE_ADD_LIST_MODAL,
      addListModal: true,
    });
  };

  useEffect(() => {
    dispatch({ type: FETCH_LISTS });
  }, [dispatch]);

  return (
    <>
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
      <Fab
        className="Lists--add-btn"
        color="secondary"
        onClick={handleOpenAddListModal}
      >
        <Add />
      </Fab>
      <AddListModal />
      <AddTaskModal />
    </>
  );
}

export default Lists;
