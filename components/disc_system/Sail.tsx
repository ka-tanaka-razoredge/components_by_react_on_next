// @ts-nocheck

import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

export default (props: { identifier: string, [key: string]: any }, ref) => {
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
  };

  const drawBottomInner = () => {};

  const drawFront = () => {
    const buildTransform = () => {
      let reply = '';
      if (props.height) {
        reply += `translateY(${-1 * props.height}px) `;
      } else {
        reply += `translateY(-75px) `;
      }
      
      if (props.isFromNow) {
        reply += 'rotateY(180deg) ';
      }
      
      return reply;
    };

    if (!props.isBottomOnly) {
      let t = 'title' in props ? props.title : '';
//      console.log('---- Sail.drawFront begin-end ----');
//      console.log('props: ', props);
      return (
        <div
          style={{
            //            transformStyle: 'preserve-3d',
            border: 'solid 1px rgba(0, 0, 0, 0.5)',
            //            position: 'absolute',
            width: props.width + 'px',
            height: props.height + 'px',
            transform: buildTransform(),
//            transform: (props.transform) ? props.transform : 'rotateX(180deg)',
          }}
          dangerouslySetInnerHTML={{ __html: (props.contentsForFrontInner) ? props.contentsForFrontInner : props.title }}
          title={t}
        />
      );
    } else {
      return null;
    }
  };

  const onMouseOver = (e) => {
    const previewWindow = document.getElementById('preview-window');
    if (!previewWindow || !props.contents) return;
    previewWindow.dispatchEvent(new CustomEvent('show', { detail: { value: (props.contents) ? props.contents : '' } }));
  };
  const onMouseLeave = (e) => {
    const previewWindow = document.getElementById('preview-window');
    if (!previewWindow|| !props.contents) return;
    previewWindow.dispatchEvent(new CustomEvent('hide', { detail: { value: (props.contents) ? props.contents : '' } }));
  };

  return (
    <div
      ref={base}
      id={props.identifier}
      style={{
        transformStyle: 'preserve-3d',
        border: '0.5px solid blue',
        height: `${(props.duration) ? props.duration : 1}px`,
        width: `${(props.width) ? props.width : 100}px`,
        top: props.top + 'px',
        left: props.left + 'px',
        position: 'absolute',
        transform: (props.z) ? `translateZ(${props.z}px)` : ''
      }}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {drawBottom()}
      <div
        style={{
//border: '1px solid red',
          height: 1 + 'px',
          transform: `rotateX(-90deg)`,
//          transform: 'rotateX(90deg)',
        }}
      >
        {drawFront()}
      </div>
    </div>
  );
};
