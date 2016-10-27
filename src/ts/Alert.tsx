import * as React from 'react';

export class Alert extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.hideAlert = this.hideAlert.bind(this);
  }
  hideAlert(): void {
    this.props.hideAlert();
  }
  render(): any {
    const alertClass: string = `alert alert-${this.props.alert.status} text-center`;
    const buttonClass: string = `pull-right btn btn-xs btn-${this.props.alert.status}`;
    if (this.props.alert.visible === true) {
      return (
        <div className={alertClass}>
          <strong className='text-capitalize'>{this.props.alert.status}</strong> {this.props.alert.title}
          <button aria-hidden='true' className={buttonClass} onClick={this.hideAlert}>&times;</button>
        </div>
      );
    }
    else {
      return null;
    }
  }
}
