import { Component } from 'react';
import css from './Services/styles.module.css';
import { requestImagesByQuery } from './Services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { STATUSES } from './Services/statuses';
import { ModalComponent } from './Modal/ModalComponent';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    status: STATUSES.idle,
    query: '',
    error: null,
    isLoadMore: false,
    isOpenModal: false,
    modalData: null,
    page: 1,
    isEmpty: false,
  };

  handleSubmit = event => {
    event.preventDefault();

    const inputValue = event.currentTarget.elements.searchInput.value;

    this.setState({ query: inputValue });
  };

  fetchImagesByQuery = async (query, page) => {
    try {
      const images = await requestImagesByQuery(query, page);
      const imagesArray = images.hits;
      return imagesArray;
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  async componentDidUpdate(_, prevState) {
    const { page, query, images } = this.state;
    if (page !== prevState.page || prevState.query !== query) {
      try {
        this.setState({ status: STATUSES.pending });
        const imagesArray = await this.fetchImagesByQuery(query, page);
        this.setState({ images: imagesArray, status: STATUSES.success });
      } catch (error) {
        this.setState({ error: error.message, status: STATUSES.error });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
        isLoadMore: this.state.page < Math.ceil(),
      }));
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleOpenModal = url => {
    this.setState({
      isOpenModal: true,
      modalData: { url },
    });
  };

  handleCloseModal = () => {
    this.setState({
      isOpenModal: false,
      modalData: null,
    });
  };

  render() {
    const showImages =
      this.state.status === STATUSES.success &&
      Array.isArray(this.state.images);
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        {showImages && (
          <ImageGallery
            images={this.state.images}
            onImageClick={this.handleOpenModal}
          />
        )}
        {this.state.isOpenModal && (
          <ModalComponent
            handleCloseModal={this.handleCloseModal}
            modalData={this.state.modalData}
          />
        )}
        <Button handleLoadMore={this.handleLoadMore} />
      </div>
    );
  }
}
