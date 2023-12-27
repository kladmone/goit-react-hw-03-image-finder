import { Component } from 'react';
import Modal from 'react-modal';
// import css from '../Services/styles.module.css';
import ReactModal from 'react-modal';
Modal.setAppElement('#root');
export class ModalComponent extends Component {
  render() {
    return (
      <div>
        <ReactModal>
          <img src={this.props.modalData.url} alt="" />
        </ReactModal>
      </div>
    );
  }
}
