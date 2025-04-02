import { Injectable } from '@angular/core';
import { Task } from '../modules/task-manager/models/task.model';
import { Priority, Status } from '../modules/task-manager/models/enums/Task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>(this.loadTasks());
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  private loadTasks(): Task[] {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  private saveTasks(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasksSubject.next(tasks); // Notify subscribers of changes
  }

  getTasks(): Task[] {
    return this.tasksSubject.getValue();
  }

  addTask(newTask: Task) {
    const updatedTasks = [...this.getTasks(), newTask];
    this.saveTasks(updatedTasks);
  }

  deleteTask(id: number) {
    const updatedTasks = this.getTasks().filter((task) => task.id !== id);
    this.saveTasks(updatedTasks);
  }

  toggleStatus(id: number) {
    const updatedTasks = this.getTasks().map((task) =>
      task.id === id
        ? {
            ...task,
            status: task.status === Status.Done ? Status.NotDone : Status.Done,
          }
        : task
    );

    //@TODO: remove console.log
    console.log('====================================');
    console.log(updatedTasks);
    console.log('====================================');
    this.saveTasks(updatedTasks);
  }
}
