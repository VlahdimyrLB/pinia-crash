import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
  }),

  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav === true);
    },
    favCount() {
      return this.tasks.reduce((prev, curr) => {
        return curr.isFav ? prev + 1 : prev;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },

  actions: {
    async fetchTasks() {
      this.isLoading = true;
      const res = await fetch("http://localhost:3000/tasks");
      const data = await res.json();
      this.tasks = data;
      this.isLoading = false;
    },
    addTask(task) {
      this.tasks.push(task);
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => {
        return t.id !== id;
      });
    },
    toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;
    },
  },
});
