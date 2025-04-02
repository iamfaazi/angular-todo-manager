import { Injectable } from '@angular/core';
import { Task } from '../modules/task-manager/models/task.model';
import { Status } from '../modules/task-manager/models/enums/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    this.tasks = (storedTasks ? JSON.parse(storedTasks) : []).map(
      (task: any) => ({
        ...task,
        status: task.status === 'done' ? Status.Done : Status.NotDone, // Convert strings to enums
      })
    );
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.saveTasks();
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  toggleStatus(id: number): void {
    const task = this.tasks.find((task) => task.id === id);
    if (task) {
      // Toggle between 'NotDone' and 'Done'
      task.status =
        task.status === Status.NotDone ? Status.Done : Status.NotDone;
      this.saveTasks();
    }
  }
}
