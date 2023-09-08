import React, { useEffect, useState, useRef } from 'react';

export default (props) => {
  const floator = useRef();
  const gold = useRef();
  const silver = useRef();
  const bronze = useRef();
  const [styleForCurrent, setStyleForCurrent] = useState({});
  const [cyclic, setCyclic] = useState(0);
  let currentIndex = 0;
  
  const forward = () => {
    const unit = 400;
    const valueToSet = cyclic + 400;
    setCyclic(valueToSet);

    // TODO: 400 should be 400 * contents.length
    if (valueToSet <= 400) {
      floator.current.style.transform = `translateX(` + (-1 * valueToSet) + `px)`;
    } else {
      floator.current.style.transform = `translateX(` + 400 + `px)`;
      setCyclic(-400);
    }
  };
  
  const backward = () => {
    const unit = 400;
    const valueToSet = cyclic - unit;
    setCyclic(valueToSet);
    
    // TODO: 400 should be 400 * contents.length
    if (-400 <= valueToSet) {
      floator.current.style.transform = `translateX(` + (-1 * valueToSet) + `px)`;
    } else {
      floator.current.style.transform = `translateX(` + -400 + `px)`;
      setCyclic(400);
    }
  };
  
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
  };

  useEffect(() => {
    console.log(props.children);
    try {
      setStyleForCurrent(giveStyle('floator'));
/*      
      silver.current.innerHTML = props.contents[props.contents.length - 1].html;
      gold.current.innerHTML = props.contents[currentIndex].html;
      const bronzeIndex = (props.contents.length !== 1) ? currentIndex + 1 : currentIndex;
      bronze.current.innerHTML = props.contents[bronzeIndex].html;
      timer = setInterval(doRoutine, 1000);
*/      
    } catch (e) {
    }
  }, []);

  return (
    <div>
      <style>
      {
        `
          .slot {
            border: 1px solid black;
            width: 400px;
            height: 225px;
          }
        `
      }
      </style>
      <div id='ground' style={{ position: 'relative', backgroundColor: `red`, width: `400px`, height: `225px` }}>
        <div ref={ floator } style={ styleForCurrent } >
          <div ref={ silver } className='slot'>{ props.contents[2].html }</div>
          <div ref={ gold } className='slot'>{ props.contents[0].html }</div>
          <div ref={ bronze } className='slot'>{ props.contents[1].html }</div>
        </div>
        <div style={ giveStyle('backwarder') } onClick={ (e) => { backward(); } } ><div style={{ height: '100px' }}></div><div>&lt;</div></div>
        <div style={ giveStyle('forwarder') } onClick={ (e) => { forward(); } } ><div style={{ height: '100px' }}></div><div>&gt;</div></div>
      </div>
    </div>
  );
};