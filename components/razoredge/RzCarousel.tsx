// @ts-nocheck

import React, { useEffect, useState, useRef } from 'react';


export default (props) => {
  const floator = useRef<HTMLDivElement>();
  const [styleForCurrent, setStyleForCurrent] = useState({});
  const [cyclic, setCyclic] = useState(0);
  let currentIndex = 0;
  
  const forward = () => {
    const unit = 400;
    const valueToSet = cyclic + 400;
    setCyclic(valueToSet);

    if (valueToSet <= (unit * (props.contents.length - 1))) {
      floator.current.style.transform = `translateX(` + (-1 * valueToSet) + `px)`;
    } else {
      floator.current.style.transform = `translateX(` + 0 + `px)`;
      setCyclic(0);
    }
  };
  
  const backward = () => {
    const unit = 400;
    const valueToSet = cyclic - unit;
    setCyclic(valueToSet);
    
    if (cyclic === 0) {
      floator.current.style.transform = `translateX(` + (-1 * unit * (props.contents.length - 1)) + `px)`;
      setCyclic(unit * (props.contents.length - 1));
    } else {
      floator.current.style.transform = `translateX(` + (-1 * (cyclic - unit)) + `px)`;
      setCyclic(cyclic - unit);
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
      }
    }

    if (key === 'floator') {
      return {
        display: 'flex',
        position: `relative`,
        zIndex: 1090,
        top: `0px`,
        left: `0px`,
        // [silver, gold, bronze]
        width: `1200px`,
        height: `225px`,
        backgroundColor: `white`,
      }
    }
  };

  useEffect(() => {
    try {
      setStyleForCurrent(giveStyle('floator'));
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
      <div id='ground' style={{ position: 'relative', backgroundColor: `red`, width: `400px`, height: `225px`, overflow: 'hidden' }}>
        <div ref={ floator } style={ styleForCurrent } >
        {
          props.contents.map((contents) => {
            return (
              <div className='slot'>{contents.html}</div>
            )
          })
        }
        </div>
        <div style={ giveStyle('backwarder') } onClick={ (e) => { backward(); } } ><div style={{ height: '100px' }}></div><div>&lt;</div></div>
        <div style={ giveStyle('forwarder') } onClick={ (e) => { forward(); } } ><div style={{ height: '100px' }}></div><div>&gt;</div></div>
      </div>
    </div>
  );
};