import React, { useEffect, useRef, useState } from 'react';

export default ({children, isExpanded}) => {
  const melmo = useRef();
  const toggle = () => {
    melmo.current.style.height = (melmo.current.style.height === `${0}px`) ? 'auto' : `${0}px`;
  };
  const [cursor, setCursor] = useState('▽');
  
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.height === 0) {
          setCursor('▽');
        } else {
          setCursor('▼');
        }
      }
    });

    resizeObserver.observe(melmo.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <>
      <style>
      {
        `
          .caption-on-button {
            display: flex;
          }
          .melmo {
            overflow: hidden;
          }
        `
      }
      </style>
      <div>
        <div className="caption-on-button" onClick={toggle}>{children[0]}<span>{cursor}</span></div>
        <div
          ref={melmo}
          className="melmo"
          style={{ height: (!isExpanded) ? `${0}px` : 'auto' }}
        >
          {children[1]}
        </div>
      </div>
    </>
  );
};
