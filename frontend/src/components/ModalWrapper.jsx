import React from 'react';
import './ModalWrapper.css';

const ModalWrapper = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
