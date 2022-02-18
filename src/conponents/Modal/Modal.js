import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, children }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') closeModal();
  };
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  return createPortal(
    <div className={s.overlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <button
          className={s.btn}
          type="button"
          onClick={() => {
            closeModal();
          }}
        >
          close
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.object,
  closeModal: PropTypes.func,
};
