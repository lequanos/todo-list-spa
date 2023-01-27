import api from '@/api/api';

const taskService = {
  addTask(task) {
    return api.patch('/add/task', task);
  },
  updateTask(task) {
    return api.patch('/update/task', task);
  },
  deleteTask(taskId, listId) {
    return api.delete(`/delete/task/${taskId}/${listId}`);
  },
};

export default taskService;
