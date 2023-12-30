<script>
import { useAuthStore } from '../stores/AuthStore';
import axios from 'axios';
export default {
  name: 'MainView',
data() {
  return {
    selectedPriority: '',
    selectedStatus: '',
    Token: useAuthStore().token,
    Priorities: [],
    statuses: [],
    tasks: [],
    newTask: '',
    errors: {
      newTask: '',
    },
  }
},
methods: {
    filterTasksByPriority(id){
        axios.get('http://localhost:8000/api/employee/task/priority/' + id, {
            headers: {
            Authorization: `Bearer ${this.Token}`,
            },
        })
        .then((response) => {
            this.tasks = response.data.tasks;
        })
        .catch((error) => {
            console.error(error);
        });
    },
    getPriorities(){
        axios.get('http://localhost:8000/api/shared/priorities', {
            headers: {
            Authorization: `Bearer ${this.Token}`,
            },
        })
        .then((response) => {
            this.Priorities = response.data.lists;
        })
        .catch((error) => {
            console.error(error);
        });
    },
    getStatues(){
        axios.get('http://localhost:8000/api/shared/statues', {
            headers: {
            Authorization: `Bearer ${this.Token}`,
            },
        })
        .then((response) => {
            this.statuses = response.data.lists;
        })
        .catch((error) => {
            console.error(error);
        });
    },
    getTasks(){
        axios.get('http://localhost:8000/api/employee/tasks', {
            headers: {
            Authorization: `Bearer ${this.Token}`,
            },
        })
        .then((response) => {
            this.tasks = response.data.tasks;
        })
        .catch((error) => {
            console.error(error);
        });
        
    },
},
mounted() {
    this.getPriorities();
    this.getStatues();
  this.getTasks();
},
}
</script>
<template>
    <div class="flex flex-col">
<div>filter</div>
<div>
    <select v-model="this.selectedPriority"  @change="filterTasksByPriority(this.selectedPriority)" name="" id="">
        <option v-for="priority in Priorities" value="priority.id">{{ priority.name }}</option>
    </select>
</div>
<div></div>
    </div>
    <main class="grid grid-flow-col grid-cols-11 bg-gray-50">
        <div class="col-start-4 col-span-5">
        <div class="bg-white shadow-md rounded-lg p-5 mb-5" v-for="task in tasks">
            <div class="flex flex-col justify-between">
                <div class="flex flex-col">
                    <p class="text-lg font-bold">{{ task.name }}</p>
                    <p class="text-sm">{{ task.description }}</p>
                </div>
                <div class="flex flex-col">
                    <p class="text-sm">{{ task.status }}</p>
                    <p class="text-sm">{{ task.priority.name }}</p>
                    <p class="text-sm">{{ task.due_date }}</p>
                </div>
            </div>
        </div>
    </div>
    </main>
</template>
<style>
</style>