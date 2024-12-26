// @ts-nocheck

import React, { useEffect, useState, useRef } from 'react';
import Tank from './disc_system/Tank';

export default (props) => {
  const body = useRef();
  const summary = useRef();
  const sailingShip = useRef();
  const tank = useRef();

  const toggle = () => {
    (parseInt(body.current.style.height) === 0) ? body.current.style.height = 'auto' : body.current.style.height = '0px';
    toggleSummary();
    toggleIt();
  }
  
  const toggleSummary = () => (parseInt(summary.current.style.height) === 0) ? summary.current.style.height = 'auto' : summary.current.style.height = '0px';
  const toggleIt = () => (parseInt(sailingShip.current.style.height) === 0) ? sailingShip.current.style.height = 'auto' : sailingShip.current.style.height = '0px';
  
  useEffect(() => {
    tank.current.setAllDiscs({ value: JSON.stringify(props.singleton.sequence) });
  });
  return (
    <div>
      <div onClick={(e) => { toggle(); }} dangerouslySetInnerHTML={{ __html: props.singleton.name }}></div>
      <div ref={body} style={{ overflow: 'hidden', height: '0px' }}>
        <div onClick={(e) => { toggleSummary(); }} style={{ marginLeft: '1rem' }}>summary:</div>
        <div ref={summary} style={{ marginLeft: '2rem', overflow: 'hidden', height: '0px' }} dangerouslySetInnerHTML={{ __html: props.singleton.summary }}></div>
        <div onClick={(e) => { toggleIt(); }} style={{ marginLeft: '1rem' }}>sequence:</div>
        <div ref={sailingShip} style={{ overflow: 'hidden', height: '0px' }}>
          <Tank ref={tank} />
        </div>
      </div>
    </div>
  );
};