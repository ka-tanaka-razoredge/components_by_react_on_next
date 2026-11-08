import React from 'react';

const Modal = (props) => {
  const onClick = () => {
    props.setVisible(false);
  };
  
  return (
    <>
      <style>
      {
        `
          .modal {
            position: fixed;
            z-index: 11000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `
      }
      </style>
      <div
        className="modal"
        style={{ visibility: props.visible ? 'visible' : 'collapse' }}
        onClick={onClick}
      >
        <div onClick={(event) => event.stopPropagation()}>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default Modal;
