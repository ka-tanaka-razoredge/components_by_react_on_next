import React, { useRef, useEffect } from 'react';

import Carousel from './CarouselForDiscSystem';

export default (props: { identifier: string, [key: string]: any }, ref) => {
  const base = useRef(null);

  useEffect(() => {
    console.log('---- MetalTape useEffect begin ----');
    console.log(props);
    console.log('---- MetalTape useEffect end ----');
    base.current.addEventListener('moveX', e => {
      moveX(e.detail.value);
    });
    base.current.addEventListener('moveY', e => {
      moveY(e.detail.value);
    });
  });

  const moveX = value => {
    base.current.style.left = value + 'px';
  };
  const moveY = value => {
    base.current.style.top = value + 'px';
  };
  
  const draw = () => {
    if (props.carousel) {
      return (
        <div
          style={{
            transformStyle: 'preserve-3d',
            position: 'absolute',
            width: 100 + 'px',
            height: 1 + 'px',
            transform: `rotateY(180deg) rotateZ(180deg)`,
          }}
        >
          <Carousel { ...props.carousel } />
        </div>
      );
    } else {
      return (
        <div
          className="nowrap"
          style={{
            transformStyle: 'preserve-3d',
            border: 'solid 1px lime',
            position: 'absolute',
            width: `${100}px`,
            transform: `rotateY(180deg) rotateZ(180deg)`,
          }}
          dangerouslySetInnerHTML={{ __html: (!Array.isArray(props.contentsForFrontInner)) ? props.contentsForFrontInner : props.contentsForFrontInner.join('') }}
        >
        </div>
      );
    }   
  };

  const buildTransform = () => {
//    console.log('---- buildTransform begin ----');
    let reply = '';
    if (props.z) reply += `translateZ(${props.z}px) `;
    if (props.rotateY) reply += `rotateZ(${props.rotateY}deg) `;
    if (props.transform) reply += `${props.transform}`;
//console.log(reply);
    return reply;
  };

  return (
    <>
      <style>
      {
        `
          .shaft {
            transform-style: preserve-3d;
            position: absolute;
            height: 1px;
            transform: rotateX(90deg);
          }
        `
      }
      </style>
      <div
        ref={base}
        id={props.identifier}
        style={{
          transformStyle: 'preserve-3d',
          backgroundColor: 'orange',
          height: props.height + 'px',
          width: 2 + 'px',
          top: props.top + 'px',
          left: props.left + 'px',
          position: 'absolute',
          transform: buildTransform(),
        }}
      >
        <div
          className="shaft"
          style={{
            top: `${props.height}px`,
            width:(props.width) ? `${props.width}px` : `${100}px`,
          }}
        >
        {
          draw()
        }
        </div>
      </div>
    </>
  );
};
