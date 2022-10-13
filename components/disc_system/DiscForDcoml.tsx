import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Dcoml from './Dcoml';

export default (props: { identifier: string }, ref) => {
  const base = useRef(null);

  useEffect(() => {
    base.current.addEventListener('moveX', e => {
      moveX(e.detail.value);
    });
    base.current.addEventListener('moveY', e => {
      moveY(e.detail.value);
    });

    if (props.isBottomOnly) {
      base.current.style.border = null;
    }
  }, []);

  const moveX = value => {
    base.current.style.left = value + 'px';
  };
  const moveY = value => {
    base.current.style.top = value + 'px';
  };

  const drawBottom = () => {
    if (!props.isBottomOnly) {
    } else {
    }
  };

  const drawBottomInner = () => {
    if (!props.contentsForBottomInner) {
      return '　';
      //      return props.contentsForFrontInner;
    } else {
      return props.contentsForBottomInner;
    }
  };

  const drawFront = () => {
    const buildTransform = () => {
      let reply = 'rotateX(-90deg) translateY(-25px) translateZ(-50px)';
      if (props.height && props.width) {
        if (props.width === 400 && props.height === 225) reply = 'rotateX(-90deg) translateX(20px) translateY(-100px) translateZ(-160px)';
      }
      return reply;
    };

    if (!props.isBottomOnly) {
      let t = 'title' in props ? props.title : '';
      return (
        <div
          style={{
//            transformStyle: 'preserve-3d',
            border: 'solid 1px lime',
            //          position: 'relative',
            width: (props.width) ? props.width + 'px' : 100 + 'px',
            height: (props.height) ? props.height + 'px' : 50 + 'px',
            transform: 'rotateX(180deg)'
          }}
          title={t}
        >
          <Dcoml aggregate={ props.dcoml } />
        </div>
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
        border: '1px solid orange',
        height: 10 + 'px',
        width: (props.width) ? props.width + 'px' : 100 + 'px',
        top: props.top + 'px',
        left: props.left + 'px',
        position: 'absolute'
      }}
    >
      {drawBottomInner()}
      <div
        style={{
          position: 'absolute',
          width: (props.width) ? props.width + 'px' : 100 + 'px',
          top: '0px',
          height: '1px',
          transform: 'rotateX(90deg)'
        }}>
          {drawFront()}
      </div>
    </div>
  );
};
