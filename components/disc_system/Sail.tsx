import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default (props: { identifier: string }, ref) => {
  const base = useRef(null);

  useEffect(() => {
    base.current.addEventListener('moveX', (e) => {
      moveX(e.detail.value);
    });
    base.current.addEventListener('moveY', (e) => {
      moveY(e.detail.value);
    });

    if (props.isBottomOnly) {
      base.current.style.border = null;
    }
  }, []);

  const moveX = (value) => {
    base.current.style.left = value + 'px';
  };
  const moveY = (value) => {
    base.current.style.top = value + 'px';
  };

  const drawBottom = () => {
    if (!props.isBottomOnly) {
    } else {
    }
  };

  const drawBottomInner = () => {};

  const drawFront = () => {
    if (!props.isBottomOnly) {
      let t = 'title' in props ? props.title : '';
      return (
        <div
          style={{
            //            transformStyle: 'preserve-3d',
            border: 'solid 1px rgba(0, 0, 0, 0.5)',
            //            position: 'absolute',
            width: props.width + 'px',
            height: props.height + 'px',
            transform: 'translateY(-75px)',
          }}
          dangerouslySetInnerHTML={{ __html: props.contentsForFrontInner }}
          title={t}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div
      ref={base}
      id={props.identifier}
      style={{
        transformStyle: 'preserve-3d',
        border: '1px solid blue',
        height: 1 + 'px',
        width: 100 + 'px',
        top: props.top + 'px',
        left: props.left + 'px',
        position: 'absolute',
      }}
    >
      <div
        style={{
          height: 1 + 'px',
          transform: 'rotateX(-90deg)',
        }}
      >
        {drawBottomInner()}
        {drawFront()}
      </div>
    </div>
  );
};
