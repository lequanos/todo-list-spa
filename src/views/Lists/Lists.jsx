import { Container, Fab, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import './Lists.scss';
import List from '@/components/List/List';
import Toast from '@/components/Toast/Toast';
import ListModal from './ListModal';
import TaskModal from './TaskModal';
import DeleteModal from './DeleteModal';
import SelectLang from './SelectLang';
import {
  FETCH_LISTS,
  TOGGLE_LIST_MODAL,
} from '@/plugins/store/actions/actions';

function Lists() {
  // Hooks
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const { t } = useTranslation();

  /**
   * Open list modal
   */
  const handleOpenListModal = () => {
    dispatch({
      type: TOGGLE_LIST_MODAL,
      listModal: true,
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
      <Tooltip title={t('Lists.CreateList')}>
        <Fab
          className="Lists--add-btn"
          color="secondary"
          onClick={handleOpenListModal}
        >
          <Add />
        </Fab>
      </Tooltip>
      <ListModal />
      <TaskModal />
      <DeleteModal />
      <SelectLang />
    </>
  );
}

export default Lists;
