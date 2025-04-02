import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { Priority, SortBy, Status } from '../../models/enums/Task';
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
  sortBy: SortBy = SortBy.Priority; // Default sort by priority

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
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
        if (this.sortBy === SortBy.Priority) {
          return (
            Object.values(Priority).indexOf(a.priority as any) -
            Object.values(Priority).indexOf(b.priority as any)
          );
        } else {
          return (
            Number(a.status === Status.Done) - Number(b.status === Status.Done)
          );
        }
      });
  }

  onTaskCreated(task: Task) {
    this.taskService.addTask(task);
  }
}
