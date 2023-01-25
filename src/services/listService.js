import api from '@/api/api';

const listService = {
  getMyLists() {
    return api.get('/lists');
  },
  createList(title) {
    return api.post('/list', {
      title,
    });
  },
  updateList(list) {
    return api.put('/list', {
      id: list.id,
      title: list.title,
      tasks: list.tasks,
    });
  },
  deleteList(listId) {
    return api.delete(`/list/${listId}`);
  },
};

export default listService;
