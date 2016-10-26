// React Dependency Imports
import * as React from 'react';

export class InputForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const newValue = event.target.value;
    this.props.handleChange(newValue);
  }
  handleSubmit(event) {
    event.preventDefault();
    const newTask = this.props.taskName;
    this.props.handleSubmit(newTask);
  }
  render(): any {
    return (
      <li className='list-group-item'>
        <form onSubmit={this.handleSubmit}>
          <input type='text' className='form-control' placeholder='Enter Task Name'
          value={this.props.taskName}
          onChange={this.handleChange}/>
        </form>
      </li>
    );
  }
}