import PropTypes from 'prop-types';

import s from './ImageGalleryItem.module.css';
const ImageGalleryItem = ({ webformatURL, tags, openModal, largeImageURL }) => {
  return (
    <li className={s.imageGallery}>
      <img
        onClick={e => {
          openModal(e.target.dataset.large);
        }}
        src={webformatURL}
        alt={tags}
        className={s.imageGalleryItem_image}
        data-large={largeImageURL}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  tags: PropTypes.string,
  openModal: PropTypes.func,
  largeImageURL: PropTypes.string,
};
