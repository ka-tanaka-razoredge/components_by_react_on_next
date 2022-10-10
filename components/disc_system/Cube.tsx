import React, { useRef, useEffect } from 'react';

export default (props: { identifier: string }, ref) => {
  const base = useRef(null);

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
  }, []);

  const moveX = (value) => {
    base.current.style.left = value + 'px';
  };
  const moveY = (value) => {
    base.current.style.top = value + 'px';
  };
  const moveZ = (value) => {
    base.current.style.transform = 'translateZ(' + value + 'px)';
  };

  return (
    <div
      ref={base}
      id={props.identifier}
      style={{
        transformStyle: 'preserve-3d',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: 10 + 'px',
        width: 10 + 'px',
        top: props.top + 'px',
        left: props.left + 'px',
        position: 'absolute',
      }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          height: 10 + 'px',
          width: 10 + 'px',
          transform: 'translateZ(-' + props.z + 'px)',
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          height: 10 + 'px',
          width: 10 + 'px',
          transform: 'translateZ(10px)',
        }}
      ></div>
      <div
        style={{
          height: 1 + 'px',
          transform: 'rotateX(90deg)',
          position: 'absolute',
        }}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: 10 + 'px',
            height: 10 + 'px',
          }}
        ></div>
      </div>
      <div
        style={{
          border: 'rgba(255, 200, 200, 1.0)',
          top: 10 + 'px',
          height: 1 + 'px',
          transform: 'rotateX(90deg)',
          position: 'absolute',
        }}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: 10 + 'px',
            height: 10 + 'px',
          }}
        ></div>
      </div>
      <div
        style={{
          border: 'rgba(255, 200, 200, 1.0)',
          height: 1 + 'px',
          transform:
            'rotateX(90deg) rotateY(90deg) translateX(5px) translateZ(5px)',
          position: 'absolute',
        }}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: 10 + 'px',
            height: 10 + 'px',
          }}
        ></div>
      </div>
      <div
        style={{
          height: 1 + 'px',
          transform:
            'rotateX(90deg) rotateY(90deg) translateX(5px) translateZ(-5px)',
          position: 'absolute',
        }}
      >
        <div
          style={{
            transformStyle: 'preserve-3d',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            width: 10 + 'px',
            height: 10 + 'px',
          }}
        ></div>
      </div>
    </div>
  );
};