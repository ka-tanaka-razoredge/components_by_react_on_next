import React, { useEffect, useState, useRef } from 'react';

export default () => {
//export const Carousel = () => {
  const floator = useRef();
  const gold = useRef();
  const silver = useRef();
  const bronze = useRef();
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
    if (counter === Number.MAX_SAFE_INTEGER) counter = 0;
    switch (counter) {
      default:
        if (1 <= magazine.length) {
          let simultaneous = magazine.shift();
          simultaneous.map((doIt) => {
            doIt();
          });
        }
        magazine.push([() => { forward(); }]);
        break;
    }
    counter++;
  };
  
  useEffect(() => {
    setStyleForCurrent(giveStyle('floator'));
    silver.current.innerHTML = contents[contents.length - 1].html;
    gold.current.innerHTML = contents[currentIndex].html;
    bronze.current.innerHTML = contents[currentIndex + 1].html;
    timer = setInterval(doRoutine, 1000);
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
    const unit = 400;
    const valueToSet = cyclic + 400;
//    console.log(valueToSet);
//    console.log(cyclic);
    
    if (valueToSet <= 400) {
      setCyclic(valueToSet);
      floator.current.style.transform = `translateX(` + (-1 * valueToSet) + `px)`;
    } else {
      setCyclic(0);
    }
    
    if (valueToSet === 400) {
      if (unit === 400) setCyclic(0);
      const indexToSet = (currentIndex < contents.length - 1) ? currentIndex + 1 : 0;
      currentIndex = indexToSet;
      silver.current.innerHTML = gold.current.innerHTML;
      gold.current.innerHTML = contents[indexToSet].html;

      const bronzeIndex = (indexToSet + 1 < contents.length) ? indexToSet + 1 : 0;
      bronze.current.innerHTML = contents[bronzeIndex].html;
      
      floator.current.style.transform = `translateX(` + 0 + `px)`;
    }
    
  };
  
  const backward = () => {
    const unit = 400;
    const valueToSet = cyclic - unit;
    if (-400 < cyclic) {
      setCyclic(valueToSet);
      floator.current.style.transform = `translateX(` + (-1 * valueToSet) + `px)`;
    } else {
      setCyclic(0);
    }
    if (valueToSet === -400) {
      if (unit === 400) setCyclic(0);
      const indexToSet = (currentIndex !== 0) ? currentIndex - 1 : contents.length - 1;
      currentIndex = indexToSet;
      bronze.current.innerHTML = gold.current.innerHTML;
      gold.current.innerHTML = contents[indexToSet].html;
      
      const silverIndex = (indexToSet + 1 < contents.length) ? indexToSet + 1 : 0;
      silver.current.innerHTML = contents[silverIndex].html;
      
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
        left: `390px`,
        width: `10px`,
        height: `225px`,
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
        height: `225px`,
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
        left: `-400px`,
        // [silver, gold, bronze]
        width: `1200px`,
        height: `225px`,
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
              width: 400px;
              height: 225px;
            }
            
            
          `
        }
      </style>
      <div id='ground' style={{ backgroundColor: `red`, width: `400px`, height: `225px`, overflow: 'hidden' }}>
        <div ref={ floator } style={ styleForCurrent } >
          <div ref={ silver } className='Slot'></div>
          <div ref={ gold } className='Slot'></div>
          <div ref={ bronze } className='Slot'></div>
        </div>
        <div style={ giveStyle('backwarder') } onClick={ (e) => { backward(); } } ><div style={{ height: '100px' }}></div><div>&lt;</div></div>
        <div style={ giveStyle('forwarder') } onClick={ (e) => { forward(); } } ><div style={{ height: '100px' }}></div><div>&gt;</div></div>
      </div>
    </div>
  )
}