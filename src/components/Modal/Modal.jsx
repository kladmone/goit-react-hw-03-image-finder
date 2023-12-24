import { Component } from 'react';
import css from '../Services/styles.module.css';
export class Modal extends Component {
  render() {
    return (
      <div className={css.Overlay}>
        <div className={css.Modal}>
          {/* <img onClick={} src={this.props.largeImage.largeImageURL} alt="" /> */}
        </div>
      </div>
    );
  }
}
