import * as React from 'react';
import { ITaskProps } from './interfaces';

export class Task extends React.Component<ITaskProps, void> {
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
    const liClass: string = this.props.task.complete ? 'list-group-item completed' : 'list-group-item';
    const toggleBtn: HTMLElement = (
      <button className='btn btn-xs btn-primary' onClick={this.toggleTaskComplete}>
        {this.props.task.complete ? 'Uncheck' : 'Check'}
      </button>
    );
    return (
      <li className={liClass}>
        {toggleBtn}
        <span>
          {this.props.task.name} {this.props.task.complete}
        </span>
        <button className='btn btn-xs btn-danger pull-right' onClick={this.deleteTask}>
          Delete
        </button>
      </li>
    );
  }
}
