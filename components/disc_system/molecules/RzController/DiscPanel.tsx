import React, { useEffect, useRef } from 'react';

export default ({
  id = '',
}) => {
  const base = useRef();
  useEffect(() => {
    base.current.addEventListener('done mouseover', () => {
      base.current.style.visibility = 'visible';
    });
  }, []);
  
  const onCloseButton = (e) => {
    base.current.style.visibility = 'collapse';
  };
  
  return (
    <>
      <style>
      {
        `
          .ground {
            position: relative;
            z-index: 1100;
            visibility: collapse;
            border: 1px solid black;
            top: ${-100}px;
            left: ${0}px;
            
            background-color: rgba(200, 200, 200, 1.0);
            
            height: 100px;
          }

          .listview {
            display: flex;
          }

          .button-for-discs {
            border: 1px solid black;
            background-color: white;
          }
        `
      }
      </style>
      <div ref={base} id={id} className="ground">
        <div onClick={onCloseButton}>✕</div>
        <div className="listview">
          <div className="button-for-discs">
            Sail
          </div>
          <div className="button-for-discs">
            Magazine
          </div>
        </div>
      </div>
    </>
  );
};
