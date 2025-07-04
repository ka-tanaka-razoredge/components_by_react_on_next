import React from 'react';

export default (props: {
  id: string,
  variable: string;
  top: string,
  left: string,
  height: string,
  visibility: 'visible' | 'hidden' | 'collapse',
  children: any,
}) => {
  const toggle = () => {
    const body = document.getElementById(`${props.id}-body`);
    body.style.visibility = (body.style.visibility === 'visible') ? 'collapse' : 'visible';
    
    let motherBoard = document.getElementById(`${props.id}`);
    motherBoard.style.height = (motherBoard.style.height === props.height) ? '0' : props.height;
  };
  
  return (
    <div id={props.id}>
      <style>
      {
        `
        `
      }
      </style>
      <div style={{ color: 'blue' }} onClick={toggle}>{props.variable}</div>
      
      <div id={`${props.id}-body`} style={{ position: 'relative', zIndex: 2000, width: 0, height: 0, visibility: props.visibility }}>
        {props.children}
      </div>
    </div>
  );  
};
