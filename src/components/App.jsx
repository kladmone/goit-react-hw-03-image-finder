import { Component } from 'react';
import css from './Services/styles.module.css';
import { requestImagesByQuery } from './Services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { STATUSES } from './Services/statuses';
import { Modal } from './Modal/Modal';
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

  fetchImagesByQuery = async (query, page) => {
    try {
      const images = await requestImagesByQuery(query, page);
      return images;
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || prevState.query !== query) {
      try {
        this.setState({ status: STATUSES.pending });
        const { hits, totalHits } = await this.fetchImagesByQuery(query, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          isLoadMore: this.state.page < Math.ceil(totalHits / 12),
          status: STATUSES.success,
        }));
      } catch (error) {
        this.setState({ error: error.message, status: STATUSES.error });
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const inputValue = event.currentTarget.elements.searchInput.value;
    this.setState({ query: inputValue, images: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleOpenModal = (largeImageURl, tags) => {
    this.setState({
      modalData: { largeImageURl, tags },
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
      this.state.status === STATUSES.success && this.state.images.length > 0;
    const { isLoadMore } = this.state;
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
          <Modal
            handleCloseModal={this.handleCloseModal}
            modalData={this.state.modalData}
          />
        )}
        {isLoadMore && <Button handleLoadMore={this.handleLoadMore} />}
      </div>
    );
  }
}
