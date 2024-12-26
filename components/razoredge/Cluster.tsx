// @ts-nocheck

import React, { useEffect, useState, useRef } from 'react';

export type ClusterParams = {
  candy: string;
  children: string[]; // HTML
};

export default (props: ClusterParams) => {
  const foundation = useRef();
  const [candy, setCandy] = useState('');

  useEffect(() => {
    const c = foundation.current.getContext('2d');
    let strokeStyle = c.strokeStyle;
    const nodeX = 50;
    const nodeY = 20;
    
    c.fillText(props.candy, 0, 10);

    c.beginPath();
    c.arc( 5, 20, 5, 0 * Math.PI / 180, 360 * Math.PI / 180, false );
    c.stroke();
    c.closePath();
    
    c.beginPath();
    c.moveTo(10, nodeY);
    c.lineTo(nodeX, nodeY);
    c.stroke();
    c.closePath();
    
    c.beginPath();
    c.moveTo(nodeX, nodeY);
    c.lineTo(50, 10);
    c.lineTo(100, 10);
//    c.strokeStyle = 'red';
    c.stroke();
    c.closePath();
//    c.strokeStyle = strokeStyle;

    props.children.map((v, index) => {
      if (index === 0) return;
      c.beginPath();
      c.moveTo(nodeX, nodeY);
      c.lineTo(nodeX, 40 * index);
      c.lineTo(nodeX + 50, 40 * index);
      c.stroke();
      c.closePath();
      c.strokeStyle = strokeStyle;
    });
  }, []);

  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      <style>
      {
        `
          .actor {
            position: absolute;
            z-index: 1100;
          }
        `
      }
      </style>
      <canvas ref={foundation} style={{border: '1px solid black' }}></canvas>
      <div style={{ position: 'absolute', width: '10vw', height: props.children.length + 1 + 'rem', left: 100 }}>
      {
        /* */
        props.children.map((v, index) => {
          return (
            <div dangerouslySetInnerHTML={{ __html: v }}></div>
          )
        })
      }
      </div>
    </div>
  );
};
