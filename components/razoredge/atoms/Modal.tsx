import React, { useEffect, useState } from 'react';

const Modal = (props) => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(!visible);
    props.setVisible(!props.visible);
  };
  
  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);
  
  return (
    <>
      <style>
      {
        `
          .modal {
            position: absolute;
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
        style={{ visibility: (visible) ? 'visible' : 'collapse' }}
        onClick={onClick}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
