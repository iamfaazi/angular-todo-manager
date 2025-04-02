import { Status, Priority } from './enums/Task';

export interface Task {
  id: number;
  title: string;
  status: Status;
  priority: Priority;
}
