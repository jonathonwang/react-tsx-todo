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
      taskList: [],
      newTask: {id: 0, name: '', complete: false},
      alert: { status: '', title: '', visible: false }
    };
    // Methods Bindings
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.showAlert = this.showAlert.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.toggleTaskComplete = this.toggleTaskComplete.bind(this);
    this.clearCompletedTasks = this.clearCompletedTasks.bind(this);
  }
  updateInput(taskName: string): void {
    this.setState({
      newTask: {
        id: this.state.newTask.id,
        name: taskName,
        complete: false
      }
    });
  }
  createTask(newTaskTitle: string): void {
    if (newTaskTitle.length > 0) {
      const newTaskList: Array<Object> = this.state.taskList;
      newTaskList.push(this.state.newTask);
      this.setState({
        taskList: newTaskList,
        newTask: {
          id: this.state.newTask.id + 1,
          name: '',
          complete: false
        }
      });
      this.showAlert('success', `${newTaskTitle} Successfully Created`);
    }
    else {
      this.showAlert('danger', 'Task Title Cannot Be Empty');
    }
  }
  deleteTask(removedTask): void {
    let newTaskList = this.state.taskList;
    const removeIndex: number = newTaskList.findIndex( (task) => task.id === removedTask.id);
    newTaskList.splice(removeIndex, 1);
    this.setState({ taskList: newTaskList });
    this.showAlert('success', `${removedTask.name} Successfully Deleted`);
  }
  showAlert(status, title): void {
    let alertTimeout;
    this.setState({
      alert: { status, title, visible: true }
    });
  }
  hideAlert(): void {
    this.setState({ alert: { status: '', title: '', visible: false } });
  }
  toggleTaskComplete(task): void {
    const taskIndex: number = this.state.taskList.findIndex( (item) => item.id === task.id );
    task.complete = !task.complete;
    this.state.taskList[taskIndex] = task;
    const newTaskList: Array<Object> = this.state.taskList;
    this.setState({ taskList: newTaskList });
  }
  clearCompletedTasks() {
    const newTaskList: Array<Object> = this.state.taskList.filter((task) => task.complete === false);
    const removedTasksCount: number = this.state.taskList.filter((task) => task.complete === true).length;
    this.setState({ taskList: newTaskList });
    this.showAlert('success', `${removedTasksCount} Completed Tasks Successfully Deleted`);
  }
  render(): any {
    // Variables for Render
    const incompleteTasks: Array<HTMLElement> = this.state.taskList.filter( (task) => task.complete === false ).map( (task) => {
     return (
        <Task key={task.id} task={task} deleteTask={this.deleteTask} toggleTaskComplete={this.toggleTaskComplete}></Task>
      );
    });
    const completeTasks: Array<HTMLElement> = this.state.taskList.filter( (task) => task.complete === true ).map( (task) => {
      return (
        <Task key={task.id} task={task} deleteTask={this.deleteTask} toggleTaskComplete={this.toggleTaskComplete}></Task>
      );
    });
    const taskToolBar: HTMLElement = (
      <li className='list-group-item'>
        <span className='pull-right'>
          <strong>Complete Tasks: </strong>
          { this.state.taskList.filter((task) => task.complete === true).length }
        </span>
        <span>
          <strong>Incomplete Tasks: </strong>
          { this.state.taskList.filter((task) => task.complete === false).length }
        </span>
      </li>
    );
    const clearCompletedBtn: HTMLElement = (
      <li className='list-group-item'>
        <button className='btn-block btn btn-primary btn-md' onClick={this.clearCompletedTasks}>Clear Completed Tasks</button>
      </li>
    );
    const noTasksNotifier: HTMLElement = (
      <li className='list-group-item'>
        <strong className='text-center'>No Tasks Created</strong>
      </li>
    );
    // TSX <Main> Render
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
              <InputForm taskName={this.state.newTask.name} handleChange={this.updateInput} handleSubmit={this.createTask}></InputForm>
              {incompleteTasks}
              {completeTasks}
              {this.state.taskList.length > 0 ? taskToolBar : noTasksNotifier }
              {this.state.taskList.filter((task) => task.complete === true).length > 0 ? clearCompletedBtn : ''}
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
