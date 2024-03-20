// @ts-nocheck

import React, { useEffect, useState, useRef } from 'react';

export default (props) => {
//export const Carousel = () => {
  const floator = useRef<HTMLDivElement>();
  const gold = useRef<HTMLDivElement>();
  const silver = useRef<HTMLDivElement>();
  const bronze = useRef<HTMLDivElement>();
  const [styleForCurrent, setStyleForCurrent] = useState({});
  const [cyclic, setCyclic] = useState(0);
  let currentIndex = 0;
  //--------------------------------------------------------------------------------
  //
  //--------------------------------------------------------------------------------
  let timer = null;
  let counter = 0;
  let magazine = [];
  const doRoutine = () => {
    try {
      if (counter === Number.MAX_SAFE_INTEGER) counter = 0;
      switch (counter) {
        default:
          if (1 <= magazine.length) {
            let simultaneous = magazine.shift();
            simultaneous.map((doIt) => {
              doIt();
            });
          }
          if (props.repeatAutomatically) magazine.push([() => { forward(); }]);
          break;
      }
      counter++;
    } catch (e) {
    }
  };
  
  useEffect(() => {
    try {
      setStyleForCurrent(giveStyle('floator'));
      silver.current.innerHTML = props.contents[props.contents.length - 1].html;
      gold.current.innerHTML = props.contents[currentIndex].html;
      const bronzeIndex = (props.contents.length !== 1) ? currentIndex + 1 : currentIndex;
      bronze.current.innerHTML = props.contents[bronzeIndex].html;
      timer = setInterval(doRoutine, 1000);
    } catch (e) {
    }
  }, []);
  
  // dummy<props>
  const contents = [
    {
      html:
        `unpleasant`
    },
    {
      html:
        `pleasant`
    },
    {
      html:
        `final`
    }
  ];
  
  const forward = () => {
    const unit = props.width;
    const valueToSet = cyclic + unit;
//    console.log(valueToSet);
//    console.log(cyclic);
    
    if (valueToSet <= unit) {
      setCyclic(valueToSet);
      floator.current.style.transform = `translateX(` + (-1 * valueToSet) + `px)`;
    } else {
      setCyclic(0);
    }
    
    if (valueToSet === unit) {
      if (unit === props.width) setCyclic(0);
      const indexToSet = (currentIndex < props.contents.length - 1) ? currentIndex + 1 : 0;
      currentIndex = indexToSet;
      silver.current.innerHTML = gold.current.innerHTML;
      gold.current.innerHTML = props.contents[indexToSet].html;

      const bronzeIndex = (indexToSet + 1 < props.contents.length) ? indexToSet + 1 : 0;
      bronze.current.innerHTML = props.contents[bronzeIndex].html;
      
      floator.current.style.transform = `translateX(` + 0 + `px)`;
    }
    
  };
  
  const backward = () => {
    const unit = props.width;
    const valueToSet = cyclic - unit;
    if ((-1 * unit) < cyclic) {
      setCyclic(valueToSet);
      floator.current.style.transform = `translateX(` + (-1 * valueToSet) + `px)`;
    } else {
      setCyclic(0);
    }
    if (valueToSet === -1 * unit) {
      if (unit === props.width) setCyclic(0);
      const indexToSet = (currentIndex !== 0) ? currentIndex - 1 : props.contents.length - 1;
      currentIndex = indexToSet;
      bronze.current.innerHTML = gold.current.innerHTML;
      gold.current.innerHTML = props.contents[indexToSet].html;
      
      const silverIndex = (indexToSet + 1 < props.contents.length) ? indexToSet + 1 : 0;
      silver.current.innerHTML = props.contents[silverIndex].html;
      
      floator.current.style.transform = `translateX(` + 0 + `px)`;
    }
  }
  
  const giveStyle = (key) => {
    if (key === 'forwarder') {
      return {
        position: `absolute`,
        zIndex: 1100,
        textAlign: `center`,
        top: `0px`,
        left: `${props.width - 10}px`,
        width: `10px`,
        height: `${props.height}px`,
//        backgroundColor: `rgba(0, 255, 0, 0.5)`,
      }
    }

    if (key === 'backwarder') {
      return {
        position: `absolute`,
        zIndex: 1100,
        textAlign: `center`,
        top: `0px`,
        left: `0px`,
        width: `10px`,
        height: `${props.height}px`,
//        backgroundColor: `rgba(0, 255, 0, 0.5)`,
      }
    }

    if (key === 'floator') {
      return {
        display: 'flex',
        position: `relative`,
        zIndex: 1090,
        top: `0px`,
        // I want to show gold at first.
        left: `-${props.width}px`,
        // [silver, gold, bronze]
        width: `1200px`,
        height: `${props.height}px`,
        backgroundColor: `white`,
      }
    }

  }
  
  return (
    <div>
      <style>
        {
          `
            @keyframes forward {
              0% {
                transform: translateX(100%);
              }
              100% {
                transform: translateX(0);
              }
            }
            
            .Slot {
              border: 1px solid black;
              width: ${props.width}px;
              height: ${props.height}px;
            }
            
            
          `
        }
      </style>
      <div id='ground' style={{ position: 'relative', backgroundColor: `red`, width: `${props.width}px`, height: `${props.height}px`, overflow: 'hidden' }}>
        <div ref={ floator } style={ styleForCurrent } >
          <div ref={ silver } className='Slot'></div>
          <div ref={ gold } className='Slot'></div>
          <div ref={ bronze } className='Slot'></div>
        </div>
        <div style={ giveStyle('backwarder') } onClick={ (e) => { backward(); } } ><div style={{ height: `${props.height * 0.4}px` }}></div><div>&lt;</div></div>
        <div style={ giveStyle('forwarder') } onClick={ (e) => { forward(); } } ><div style={{ height: `${props.height * 0.4}px` }}></div><div>&gt;</div></div>
      </div>
    </div>
  )
}