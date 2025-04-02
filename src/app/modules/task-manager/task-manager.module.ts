import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Components
import { TaskManagerComponent } from './components/task-manager/task-manager.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TaskManagerComponent }, // Default route for this module
];

@NgModule({
  declarations: [TaskManagerComponent, TaskListComponent, TaskFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    TaskManagerComponent,
    TaskListComponent,
    TaskFormComponent,
    RouterModule,
  ],
})
export class TaskManagerModule {}
