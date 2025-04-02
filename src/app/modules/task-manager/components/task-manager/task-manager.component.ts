import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task } from '../../models/task.model';
import { Priority } from '../../models/enums/Task';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
  standalone: false,
})
export class TaskManagerComponent implements OnInit {
  tasks: Task[] = [];
  newTaskTitle: string = '';
  newTaskPriority: Priority = Priority.Low;
  searchQuery: string = ''; // Add search query property
  sortBy: 'priority' | 'status' = 'priority';

  constructor(
    private snackBar: MatSnackBar,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.tasks = this.taskService.getTasks();

    // this.loadTasks();
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  // saveTasks() {
  //   localStorage.setItem('tasks', JSON.stringify(this.tasks));
  // }

  // addTask() {
  //   if (!this.newTaskTitle.trim()) return;
  //   const newTask: Task = {
  //     id: Date.now(),
  //     title: this.newTaskTitle,
  //     status: Status.NotDone,
  //     priority: this.newTaskPriority
  //   };
  //   this.tasks.push(newTask);
  //   this.saveTasks();
  //   this.snackBar.open('Task Added!', 'Close', { duration: 2000 });
  //   this.newTaskTitle = '';
  //   this.newTaskPriority = Priority.Low;
  // }

  // deleteTask(id: number) {
  //   this.tasks = this.tasks.filter(task => task.id !== id);
  //   this.saveTasks();
  //   this.snackBar.open('Task Deleted!', 'Close', { duration: 2000 });
  // }

  // toggleStatus(id: number) {
  //   const task = this.tasks.find(task => task.id === id);
  //   if (task) {
  //     task.status = task.status === Status.Done ? Status.NotDone : Status.Done;
  //     this.saveTasks();
  //     this.snackBar.open('Task Updated!', 'Close', { duration: 2000 });
  //   }
  // }

  get filteredTasks() {
    console.log(
      this.tasks
        .filter((task) =>
          task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          if (this.sortBy === 'priority') {
            // Compare the enum values directly
            return (
              Object.values(Priority).indexOf(a.priority as any) -
              Object.values(Priority).indexOf(b.priority as any)
            );
          } else {
            return Number(a.status) - Number(b.status);
          }
        })
    );
    return this.tasks
      .filter((task) =>
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (this.sortBy === 'priority') {
          // Compare the enum values directly
          return (
            Object.values(Priority).indexOf(a.priority as any) -
            Object.values(Priority).indexOf(b.priority as any)
          );
        } else {
          return Number(a.status) - Number(b.status);
        }
      });
  }

  onTaskCreated($event: any) {}
}
