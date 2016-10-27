// ------------------------------------------------------------
// Weird Thing I dont wanna do but is necessary with TypeScript
// assigns the imported jQuery object as jQuery & $ on window.
import * as jQuery from 'jquery';
Object.assign(Window.prototype, {
  jQuery,
  $: jQuery
});
import 'bootstrap';
// End Weird Stuff
// ------------------------------------------------------------

// ------------------------------------------------------------
// React Dependency Imports
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { InputForm } from './InputForm';
import { Task } from './Task';
import { Alert } from './Alert';

export class Main extends React.Component<any, any> {
  constructor() {
    super();
    // State
    this.state = {
      newTask: '',
      taskList: [],
      alert: { status: '', title: '', visible: false }
    };
    // Methods Bindings
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.toggleTaskComplete = this.toggleTaskComplete.bind(this);
  }
  updateInput(taskName: string): void {
    this.setState({ newTask: taskName });
  }
  createTask(newTask): void {
    if (newTask !== '') {
      const newTaskList = this.state.taskList;
      newTaskList.push({ id: this.state.taskList.length, name: newTask, complete: false });
      this.setState({ taskList: newTaskList, newTask: '' });
      this.showAlert('success', `${newTask} Successfully Created`);
    }
    else {
      this.showAlert('danger', 'Task Title Cannot Be Empty');
    }
  }
  deleteTask(removedTask): void {
    let newTaskList = this.state.taskList;
    const removeIndex = newTaskList.findIndex( (task) => task.id === removedTask.id);
    newTaskList.splice(removeIndex, 1);
    this.setState({ taskList: newTaskList });
    this.showAlert('success', `${removedTask.name} Successfully Deleted`);
  }
  showAlert(status, title): void {
    this.setState({ alert: { status, title, visible: true } });
  }
  hideAlert(): void {
    this.setState({ alert: { status: '', title: '', visible: false } });
  }
  toggleTaskComplete(task): void {
    const taskIndex: number = this.state.taskList.findIndex( (item) => item.id === task.id );
    task.complete = !task.complete;
    this.state.taskList[taskIndex] = task;
    const newTaskList: Array<HTMLElement> = this.state.taskList;
    this.setState({ taskList: newTaskList });
  }
  render(): any {
    // Variables for Render
    const tasks: Array<HTMLElement> = this.state.taskList.map( (task) => {
      return <Task key={task.id} task={task} deleteTask={this.deleteTask} toggleTaskComplete={this.toggleTaskComplete}></Task>;
    });
    // TSX Render
    return (
    <div>
      <div className='row'>
        <div className='col-xs-8 col-xs-offset-2'>
          <Alert alert={this.state.alert} hideAlert={this.hideAlert}></Alert>
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-8 col-xs-offset-2'>
          <h1 className='text-center'>
            Todo List
          </h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-xs-8 col-xs-offset-2'>
          <ul className='list-group'>
            <InputForm taskName={this.state.newTask} handleChange={this.updateInput} handleSubmit={this.createTask}></InputForm>
            {tasks}
          </ul>
        </div>
      </div>
    </div>
    );
  }
}

ReactDOM.render(
  <Main></Main>,
  document.getElementById('main')
);
