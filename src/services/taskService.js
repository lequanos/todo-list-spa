import api from '@/api/api';

const taskService = {
  addTask(task) {
    return api.patch('/add/task', task);
  },
  updateTask(task) {
    return api.patch('/update/task', task);
  },
};

export default taskService;
