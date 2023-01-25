import { Container, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './Lists.scss';
import List from '@/components/List/List';
import Toast from '@/components/Toast/Toast';
import AddListModal from './AddListModal';
import { FETCH_LISTS } from '@/plugins/store/actions/actions';

function Lists() {
  // Hooks
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [open, setOpen] = useState(false);

  /**
   * Open add list modal
   */
  const handleOpenAddModal = () => {
    setOpen(true);
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
        onClick={handleOpenAddModal}
      >
        <Add />
      </Fab>
      <AddListModal open={open} setOpen={setOpen} />
    </>
  );
}

export default Lists;
