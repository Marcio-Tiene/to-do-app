export interface ITask {
  id: string;
  name: string;
  done: boolean;
  projectId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
