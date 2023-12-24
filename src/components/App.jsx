import { Component } from 'react';
// import css from '../styles.module.css';
import { requestImagesByQuery } from './Services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { STATUSES } from './Services/statuses';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    images: null,
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

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (page !== prevState.page || prevState.query !== query) {
      try {
        this.setState({ status: STATUSES.pending });
        const images = await requestImagesByQuery(query, page);

        this.setState({ images, status: STATUSES.success });

        if (images.length === 0) {
          this.setState({ isEmpty: true });
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images.hits, ...images.hits],
          isloadMore: this.state.page < Math.ceil(images.totalHits / 12),
        }));
      } catch (error) {
        this.setState({ error: error.message, status: STATUSES.error });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, isLoadMore } = this.state;
    const showImages = status === STATUSES.success && Array.isArray(images);

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {showImages && <ImageGallery images={this.state.images} />}
        {this.state.isOpenModal && (
          <Modal LargeImage={this.state.images.largeImageURL} />
        )}
        {isLoadMore && <Button handleLoadMore={this.handleLoadMore} />}
      </div>
    );
  }
}
