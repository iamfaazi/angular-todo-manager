import { Component, Input } from '@angular/core';
import { TaskService } from '../../../../services/task.service';
import { Task } from '../../models/task.model';
import { Status } from '../../models/enums/Task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: false,
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  toggleStatus(id: number) {
    this.taskService.toggleStatus(id);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  getStatus(status: Status) {
    return status === Status.Done;
  }
}
