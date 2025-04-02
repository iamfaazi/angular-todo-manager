import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tasks',
    loadChildren: () =>
      import('./modules/task-manager/task-manager.module').then(
        (m) => m.TaskManagerModule
      ),
  },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }, // Redirect to tasks by default
  { path: '**', redirectTo: 'tasks' }, // Fallback route
];
