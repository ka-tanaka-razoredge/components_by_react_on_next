import React, { useEffect, useState, useRef } from 'react';

export default (props, ref) => {
  const base = useRef(null);
//  const [size, setSize] = useState(50);
  const [size, setSize] = useState(14);

  useEffect(() => {
    base.current.addEventListener('moveX', (e) => {
      moveX(e.detail.value);
    });
    base.current.addEventListener('moveY', (e) => {
      moveY(e.detail.value);
    });
    base.current.addEventListener('moveZ', (e) => {
      moveZ(e.detail.value);
    });
    if (props.z) moveZ(props.z);

    base.current.style.transform += `rotateX(-90deg) ${(props.transform) ? props.transform : ''}`;
  }, []);

  const moveX = (value) => {
    base.current.style.left = value + 'px';
  };
  const moveY = (value) => {
    base.current.style.top = value + 'px';
  };
  const moveZ = (value) => {
    base.current.style.transform += 'translateY(' + value + 'px)';
  };
  
  return (
    <>
      <style>
      {
        `
          .threeD {
            transform-style: preserve-3d;
            position: absolute;
            height: ${size}px;
            width: ${size}px;
            top: ${size}px;
            left: ${size}px;
            background-color: rgba(0, 0, 0, 0.25);
          }
          
          .shaft {
            postion: absolute;
            top: 0;
            left: 0;
            height: 1px;
            width: ${size}px;
          }

          .triangle {
            height: calc(${size}px / 2 * tan(60deg));
            width: ${size}px;
            clip-path: polygon(50% 0, 100% 100%, 0 100%);
          }          
        `
      } 
      </style>
      <div ref={base} id={props.identifier} className="threeD">
        <div className="shaft" style={{ width: `${size}px`, transform: `rotateX(60deg)` }}>
          <div className="triangle" style={{ color: 'white', height: `${size}px`, backgroundColor: 'rgba(0, 0, 255, 0.9)', textAlign: 'center', transform: `rotateY(180deg) rotateX(180deg)` }}>^</div>
        </div>
        <div className="shaft" style={{ width: `${size}px`, transform: `rotateX(90deg) rotateY(90deg) translateZ(${size / 2}px) translateX(${size / 2}px) rotateX(-30deg)` }}>
          <div className="triangle" style={{ border: `1px solid green`, color: 'white', height: `${size}px`, backgroundColor: 'rgba(0, 255, 0, 0.1)', textAlign: 'center', transform: `rotateY(180deg) rotateX(180deg)` }}></div>
        </div>
        <div className="shaft" style={{ width: `${size}px`, transform: `translateY(${size}px) rotateX(120deg)` }}>
          <div className="triangle" style={{ color: 'black', height: `${size}px`, backgroundColor: 'rgba(200, 0, 0, 1.0)', textAlign: 'center', transform: `rotateY(180deg) rotateX(180deg)` }}></div>
        </div>
        <div className="shaft" style={{ width: `${size}px`, transform: `rotateX(90deg) rotateY(-90deg) translateZ(${size / 2}px) translateX(-${(size / 2)}px) rotateX(-30deg)` }}>
          <div className="triangle" style={{ color: 'white', height: `${size}px`, backgroundColor: 'black', textAlign: 'center', transform: `rotateY(180deg) rotateX(180deg)` }}>^</div>
        </div>
      </div>
    </>
  );
};
