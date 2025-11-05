import React, { forwardRef, useEffect, useRef } from 'react';
import useDiscFactory from '@/hooks/disc_system/disc_factory'

const Foundation = (props: { identifier: string, [key: string]: any }, ref) => {
const refsForNested = useRef([]);
  let initialized = false;
  const { createDisc, } = useDiscFactory();

  const buildTransform = () => {
    let reply = '';
    if (props.z) reply += `translateZ(${props.z}px) `;
    return reply;
  };

//  useEffect(() => { console.log('Foundation.useEffect'); }, [ref.current?.children?.map(v => v.style.width).join(",")]);
  
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        try {
          const target = entry.target as HTMLElement;
          const dataInDiscs = props.discs.find(v => v.identifier === target.parentNode.parentNode.id);
          
          const w = (dataInDiscs.width) ? parseInt(dataInDiscs.width) : 100;
console.log(`${w} vs. ${target.style.width}`);
          if (initialized) {
//          if (dataInDiscs && w !== parseInt(target.style.width)) {
//console.log(dataInDiscs);
            ref.current.parentNode.dispatchEvent(new CustomEvent('disc resized', { detail: {
              left: parseInt(target.parentNode.parentNode.parentNode.style.left),
              value: parseInt(target.style.width) - w,
              width: w, 
            }}));
          }
        } catch (e) {
        }
      }
    });

    if (ref.current) {
      ref.current
        .querySelectorAll<HTMLElement>(".front-inner")
        .forEach((el) => resizeObserver.observe(el));
    }
      
    setTimeout(() => { initialized = true; }, 1000);

    return () => resizeObserver.disconnect();
  }, []);
  
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
          height: (props.duration) ? `${props.duration}px` : `${1}rem`,
          width: (props.width) ? `${props.width}px` : `${100}px`,
          top: `${props.top}px`,
          left: `${props.left}px`,
          transform: buildTransform(),
        }}
      >
      {
        props.discs.map((v, i) => {
          return createDisc(v, (el) => refsForNested.current[i] = el);
        })
      }
      </div>
    </>
  );
};

export default forwardRef(Foundation);
