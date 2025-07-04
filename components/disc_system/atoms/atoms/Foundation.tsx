import React, { forwardRef, useRef } from 'react';
import useDiscFactory from '@/hooks/disc_system/disc_factory'

const Foundation = (props: { identifier: string, [key: string]: any }, ref) => {
  const { createDisc, } = useDiscFactory();

  const buildTransform = () => {
    let reply = '';
    if (props.z) reply += `translateZ(${props.z}px) `;
    return reply;
  };

  return (
    <>
      <style>
      {
        `
          .disc {
            transform-style: preserve-3d;
            border: none;
            position: absolute;
          }
        `
      }
      </style>
      <div
        ref={ref}
        id={props.identifier}
        className="disc"
        style={{
          height: (props.duration) ? props.duration : '1rem',
          width: (props.width) ? props.width + 'px' : 100 + 'px',
          top: props.top + 'px',
          left: props.left + 'px',
          transform: buildTransform(),
        }}
      >
      {
        props.discs.map((v, i) => {
          return createDisc(v)
        })
      }
      </div>
    </>
  );
};

export default forwardRef(Foundation);
