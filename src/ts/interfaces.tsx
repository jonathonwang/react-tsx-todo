export interface ITask extends Object {
  id: number;
  name: string;
  complete: boolean;
}
export interface ITaskProps {
  task: ITask;
  deleteTask(task: ITask);
  toggleTaskComplete(task: ITask);
}

export interface IAlert extends Object {
  status: string;
  title: string;
  visible: boolean;
}
export interface IAlertProps {
  alert: IAlert;
  hideAlert();
}

export interface IInputFormProps {
  taskName: string;
  handleChange(event: Event);
  handleSubmit(newTask: string);
}

export interface IMainBaseState extends Object {
  taskList: Array<ITask>;
  newTask: ITask;
  alert: IAlert;
}
