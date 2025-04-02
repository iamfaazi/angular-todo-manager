import { Component } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../models/task.model';
import { Priority, Status } from '../../models/enums/Task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: false,
})
export class TaskFormComponent {
  newTaskTitle: string = '';
  newTaskPriority: Priority = Priority.Low;

  constructor(private taskService: TaskService) {}

  addTask() {
    if (!this.newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title: this.newTaskTitle,
      status: Status.NotDone,
      priority: this.newTaskPriority,
    };
    this.taskService.addTask(newTask);
    this.newTaskTitle = '';
    this.newTaskPriority = Priority.Low;
  }
}
