// @ts-nocheck

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import Tank from './Tank';

export default forwardRef((props: {top}, ref) => {
  const tank = useRef();
  let timer;
  let counter = 0;
  let magazine = [];
  
  useImperativeHandle(ref, () => ({
    pushDisc: (value) => {
      tank.current.dispatchEvent( new CustomEvent('pushDisc', { detail: value }) );
    },
    pushSimultaneous: (value) => {
      magazine.push(value);
    },
    moveY: (lop) => {
      tank.current.dispatchEvent( new CustomEvent('moveY', { detail: lop }) );
    },
    shiftXThme: (lop) => {
      tank.current.shiftXThem(lop);
    },
    removeDisc: (identifier) => {
      tank.current.removeDisc(identifier);
    }
  }));
  
  useEffect(() => {
    timer = setInterval(doRoutine, 1000);
  }, []);
  
  const doRoutine = () => {
    if (counter === Number.MAX_SAFE_INTEGER) counter = 0;
    switch (counter) {
      case 0:
        break;
      default:
        if (1 <= magazine.length) {
          let simultaneous = magazine.shift();
          simultaneous.map((doIt) => {
            doIt();
          });
        }
        break;
    }
    counter++;
  };
  
  const giveTop = () => {
    if ('top' in props) {
      return props.height;
    } else {
      return -150;
    }
  }
  
  return (
    <div style={{ position: 'absolute', top: giveTop(), left: 150 }}>
      <Tank ref={ tank } width={ props.width } height={ props.height } />
    </div>
  )
})
