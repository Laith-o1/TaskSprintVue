<script>
import { useAuthStore } from '../stores/AuthStore';
import axios from 'axios';
export default {
    name: 'MainView',
    data() {
        return {
            updateModal: false,
            selectedPriority: '',
            selectedStatus: '',
            Token: useAuthStore().token,
            Priorities: [],
            statuses: [],
            tasks: [],
            selectedTask: '',
            errors: {
                newTask: '',
            },
        }
    },
    methods: {
        updateTask(task) {
            axios.post('http://localhost:8000/api/employee/task/update/' + task.id, {
                status: task.status,
            }, {
                headers: {
                    Authorization: `Bearer ${this.Token}`,
                },
            })
                .then((response) => {
                    this.updateModal = false;
                    this.getTasks();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        filterTasksByStatus(id) {
            axios.get('http://localhost:8000/api/employee/task/status/' + id, {
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
        filterTasksByPriority(id) {
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
        getPriorities() {
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
        getStatues() {
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
        getTasks() {
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
    <div class="flex flex-row my-5 items-center">
        <div class="ml-5 text-xl">filter</div>
        <div class="ml-5">
            <select class=" w-32 bg-gray-100" v-model="this.selectedPriority" @change="filterTasksByPriority(this.selectedPriority)"
                name="" id="">
                <!-- selected with no value for place holder -->
                <option selected disabled value="">Select Priority</option>
                <option v-for="priority in Priorities" :value="priority.id">{{ priority.name }}</option>
            </select>
        </div>
        <div class="ml-5">
            <select class=" w-32 bg-gray-100" v-model="this.selectedStatus" @change="filterTasksByStatus(this.selectedStatus)" name="" id="">
                <!-- selected with no value for place holder -->
                <option selected disabled value="">Select Status</option>
                <option v-for="status in statuses" :value="status">{{ status}}</option>
            </select>
        </div>
        <div></div>
    </div>
    <main class="grid grid-flow-col grid-cols-11">
        <div class="col-start-3 col-span-7">
            <!-- when there is no tasks avilible -->
            <div v-if="tasks.length === 0"  class="bg-white shadow-md rounded-lg p-5 mb-5">
                <div class="flex flex-col justify-between">
                    <div class="flex flex-col">
                        <p class="text-lg font-bold">No Tasks Avilible</p>
                    </div>
                </div>
            </div>
            <div v-else class="bg-white shadow-md rounded-lg p-5 mb-5" v-for="task in tasks">
                <div class="flex flex-col justify-between">
                    <div class="flex flex-col">
                        <p class="text-lg font-bold">{{ task.name }}</p>
                        <p class="text-sm">{{ task.description }}</p>
                    </div>
                    <div class="flex flex-col">
                        <p class="text-sm">{{ task.status }}</p>
                        <p class="text-sm">{{ task.priority[0].name }}</p>
                        <div class="flex flex-row space-x-1">
                        <p class="text-sm flex place-self-center"> due date :  {{ task.due_date }}</p>
                        <!-- button to toggle the update modal -->
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
                            @click="updateModal = true; this.selectedTask = task">Update</button>
                    </div>
                    </div>
                </div>
            </div>
            

        </div>
    </main>
    <!-- update modal -->
    <div v-if="updateModal" class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <!-- background overlay -->
            <div class="fixed inset-0 transition-opacity" aria-hidden="true">
                <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <!-- modal -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <!-- modal header -->
                <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="flex flex-col">
                        <div class="flex flex-row justify-between">
                            <div class="flex flex-col">
                                <p class="text-lg font-bold">Update Task</p>
                            </div>
                            <div class="flex flex-col">
                                <button class="bg-gray-400 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full"
                                    @click="updateModal = false">X</button>
                            </div>
                        </div>
                        <div class="flex flex-col space-y-2">
                            <div>
                            <p class="text-sm">Task Name : {{this.selectedTask.name}}</p>
                        </div>
                        <div>
                            <p class="text-sm">Task Description : {{this.selectedTask.description}}</p>
                        </div>
                        <div>
                            <p class="text-gray-500">task statues</p>
                            <!-- select element for the task statues -->
                            <select class=" w-32" v-model="this.selectedTask.status" name="" id="">
                                <option v-for="status in statuses" :value="status">{{ status}}</option>
                            </select>
                        </div>
                        </div>
                    </div>
                </div>
                <!-- modal footer -->
                <div class="px-4 py-3 flex flex-col space-y-4">
                    <button class="bg-gray-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full"
                        @click="updateTask(this.selectedTask)">Update</button>
                    <button class="bg-gray-200 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
                        @click="updateModal = false">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>