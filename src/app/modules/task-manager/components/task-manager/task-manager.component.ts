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
  }

  loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  get filteredTasks() {
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
