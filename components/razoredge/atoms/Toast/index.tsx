import React, { forwardRef, useEffect, useRef, useState } from 'react';

export default forwardRef((props, ref) => {
  const [value, setValue] = useState('Toast');
  const toast = useRef();
  useEffect(() => {
    ref.current.addEventListener('animationend', (e) => {
      ref.current.style.visibility = 'collapse';
      ref.current.className = "cyclorama";
    });
    ref.current.addEventListener('show', (e) => {
      setValue(e.detail.value);
      ref.current.style.visibility = 'visible';
      ref.current.className = "cyclorama fadeout";
    });
  }, []);
  

  return (
    <>
      <style>
      {
        `
          .cyclorama {
            color: rgba(255, 255, 255, 1.0);
            background-color: rgba(0, 0, 0, 0.5);
            position: absolute;
            z-index: 1100;
            height: 90px;
            width: 160px;
            visibility: collapse;
          }

          .fadeout {
            animation-name: fadeout;
            animation-duration: 1.5s;
            animation-timing-function: ease-out;
            animation-fill-mode: forwards;
          }
          
          @keyframes fadeout {
            0% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        `
      }
      </style>
      <div ref={ref} className="cyclorama">
        {value}
      </div>
    </>
  );
});
