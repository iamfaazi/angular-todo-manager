import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Task } from '../../models/task.model';
import { Priority, Status } from '../../models/enums/Task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskFormComponent {
  newTaskTitle: string = '';
  newTaskPriority: Priority = Priority.Low;

  @Output() taskCreated = new EventEmitter<Task>();

  constructor() {}

  addTask() {
    if (!this.newTaskTitle.trim()) return;

    this.taskCreated.emit({
      id: Date.now(),
      title: this.newTaskTitle,
      status: Status.NotDone,
      priority: this.newTaskPriority,
    });

    this.newTaskTitle = '';
    this.newTaskPriority = Priority.Low;
  }
}
