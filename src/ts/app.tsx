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

export class Main extends React.Component<any, any> {
  constructor() {
    super();
    this.state = {
      newTask: '',
      taskList: []
    };
    this.createTask = this.createTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }
  updateInput(taskName: string): void {
    this.setState({ newTask: taskName });
  }
  createTask(newTask): void {
    if (newTask !== '') {
      const newTaskList = this.state.taskList;
      newTaskList.push({ id: this.state.taskList.length, name: newTask });
      this.setState({ taskList: newTaskList, newTask: '' });
    }
  }
  deleteTask(removedTask): void {
    let newTaskList = this.state.taskList;
    const removeIndex = newTaskList.findIndex( (task) => task.id === removedTask.id);
    newTaskList.splice(removeIndex, 1);
    this.setState({ taskList: newTaskList });
  }
  render(): any {
    // Variables for Render
    const tasks = this.state.taskList.map( (task) => {
      return <Task key={task.id} task={task} deleteTask={this.deleteTask}></Task>;
    });
    // TSX Render
    return (
    <ul className='list-group'>
      <InputForm taskName={this.state.newTask} handleChange={this.updateInput} handleSubmit={this.createTask}></InputForm>
      {tasks}
    </ul>
    );
  }
}

ReactDOM.render(
  <Main></Main>,
  document.getElementById('main')
);
