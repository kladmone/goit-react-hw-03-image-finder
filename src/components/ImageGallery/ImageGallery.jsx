import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from '../Services/styles.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.ImageGallery}>
      {images?.map(image => (
        <ImageGalleryItem key={image.id} image={image} />
      ))}
    </ul>
  );
};

export { ImageGallery };
