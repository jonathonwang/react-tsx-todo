import * as React from 'react';

export class Task extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.deleteTask = this.deleteTask.bind(this);
  }
  deleteTask() {
    const task = this.props.task;
    this.props.deleteTask(task);
  }
  render(): any {
    return (
      <li className='list-group-item'>
        <span>{this.props.task.name}</span>
        <button className='btn btn-xs btn-danger pull-right' onClick={this.deleteTask}>Delete</button>
      </li>
    );
  }
}
