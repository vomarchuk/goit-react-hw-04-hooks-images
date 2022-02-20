import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';
import s from './App.module.css';
import Container from '../Container';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import getImagesCollections from '../../API/api-service';
import Button from '../Button';
import Modal from '../Modal';

const statusOptions = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [largeImageURL, setlargeImageURL] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(statusOptions.IDLE);

  const { PENDING, RESOLVED, REJECTED } = statusOptions;

  const getImages = (search, page) => {
    getImagesCollections(search, page)
      .then(response => {
        setArticles(state => [...state, ...response]);
        setStatus(statusOptions.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(statusOptions.REJECTED);
        console.log(error);
      });
  };

  const handlerSearchForm = query => {
    setStatus(statusOptions.PENDING);
    setSearchValue(query);
    setArticles([]);
    setCurrentPage(1);
  };

  const handleIncrement = () => {
    setCurrentPage(state => state + 1);
  };

  const openModal = imageUrl => {
    setlargeImageURL(imageUrl);
  };
  const closeModal = () => {
    setlargeImageURL('');
  };

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    getImages(searchValue, currentPage);
  }, [searchValue, currentPage]);

  return (
    <>
      <Container>
        <Searchbar onSubmit={handlerSearchForm} />
      </Container>

      {largeImageURL && (
        <Modal closeModal={closeModal}>
          <img src={largeImageURL} alt="" className={s.modalImg} />
        </Modal>
      )}
      {status === PENDING && (
        <Loader
          className={s.loader}
          type="BallTriangle"
          color="#00BFFF"
          height={80}
          width={80}
        />
      )}
      {status === RESOLVED && (
        <section className={s.section}>
          <Container>
            <ImageGallery search={articles} openModal={openModal} />
            <Button incrementPage={handleIncrement} />
          </Container>
        </section>
      )}
      {status === REJECTED && (
        <Container>
          <h1>Упс.....чтото пошло не так</h1>
        </Container>
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
}
