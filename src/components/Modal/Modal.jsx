import { Component } from 'react';
// import css from '../Services/styles.module.css';

export class Modal extends Component {
  render() {
    return (
      <div>
        <img src={this.props.modalData.url} alt="" />
      </div>
    );
  }
}
