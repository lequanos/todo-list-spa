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
};

export default listService;
