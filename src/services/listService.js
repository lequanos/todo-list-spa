import api from '@/api/api';

const listService = {
  getMyLists() {
    return api.get('/lists');
  },
};

export default listService;
