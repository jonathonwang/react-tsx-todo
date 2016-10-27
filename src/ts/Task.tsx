import * as React from 'react';

export class Task extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this);
    this.toggleTaskComplete = this.toggleTaskComplete.bind(this);
  }
  deleteTask() {
    const task = this.props.task;
    this.props.deleteTask(task);
  }
  toggleTaskComplete() {
    const task = this.props.task;
    this.props.toggleTaskComplete(task);
  }
  render(): any {
    const toggleBtn: HTMLElement = <button className='btn btn-xs btn-primary' onClick={this.toggleTaskComplete}>{this.props.task.complete ? 'Uncheck' : 'Check'}</button>;
    const liClass: string = this.props.task.complete ? 'list-group-item completed' : 'list-group-item';
    return (
      <li className={liClass}>
        {toggleBtn}
        <span>{this.props.task.name} {this.props.task.complete}</span>
        <button className='btn btn-xs btn-danger pull-right' onClick={this.deleteTask}>Delete</button>
      </li>
    );
  }
}
