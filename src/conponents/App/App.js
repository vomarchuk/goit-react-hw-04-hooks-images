import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { Component } from 'react';

import Loader from 'react-loader-spinner';

import s from './App.module.css';
import Container from '../Container';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import getImagesCollections from '../../API/api-service';
import Button from '../Button';
import Modal from '../Modal';

const status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    searchValue: '',
    articles: [],
    status: status.IDLE,
    page: 1,
    error: '',
    showModal: false,
    modalImage: '',
  };

  getImages(search, page) {
    getImagesCollections(search, page)
      .then(response =>
        this.setState({
          articles: [...this.state.articles, ...response],
        }),
      )
      .catch(error => this.setState({ error }));
  }

  handlerSearchForm = searchValue => {
    this.setState({
      searchValue,
      articles: [],
      page: 1,
      status: status.PENDING,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const newSearch = this.state.searchValue;
    const nextPage = this.state.page;

    if (this.state.status === 'pending' && prevProps.prevProps !== this.props) {
      this.setState({ status: status.RESOLVED });
      this.getImages(newSearch, nextPage);
    }
    if (this.state.status === 'resolved' && prevState.page !== nextPage) {
      this.getImages(newSearch, nextPage);
    }
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  handleIncrement = () => {
    this.setState({ page: this.state.page + 1 });
  };

  openModal = url => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImage: url,
    }));
  };
  closeModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalImage: '',
    }));
  };

  render() {
    const { status, articles, showModal, modalImage } = this.state;
    return (
      <>
        <Container>
          <Searchbar onSubmit={this.handlerSearchForm} />
        </Container>

        {showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={modalImage} alt="" className={s.modalImg} />
          </Modal>
        )}
        {status === 'pending' && (
          <Loader
            className={s.loader}
            type="BallTriangle"
            color="#00BFFF"
            height={80}
            width={80}
          />
        )}
        {status === 'resolved' && (
          <section className={s.section}>
            <Container>
              <ImageGallery search={articles} openModal={this.openModal} />
              <Button incrementPage={this.handleIncrement} />
            </Container>
          </section>
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
