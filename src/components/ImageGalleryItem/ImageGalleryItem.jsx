import css from '../Services/styles.module.css';
const ImageGalleryItem = ({ image, onImageClick }) => {
  return (
    <li key={image.id} className={css.ImageGalleryItem}>
      <img
        className={css.ImageGalleryItemImage}
        src={image.webformatURL}
        alt={image.tags}
        onClick={() => onImageClick(image.largeImageURL)}
      />
    </li>
  );
};

export { ImageGalleryItem };
