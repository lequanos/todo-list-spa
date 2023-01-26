import api from '@/api/api';

const taskService = {
  addTask(task) {
    return api.patch('/add/task', task);
  },
};

export default taskService;
