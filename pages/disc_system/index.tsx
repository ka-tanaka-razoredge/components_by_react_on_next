import React, { useEffect, useRef, useState } from 'react';

//import { load } from '../../components/disc_system/data/sequence';
import DiscSystem from '../../components/disc_system/DiscSystem';
import Controller from '../../components/disc_system/Controller';
import ObjectBrowser from '../../components/disc_system/ObjectBrowser';
import Tank from '../../components/disc_system/Tank';

export default () => {
  //--------------------------------------------------------------------------------
  //
  //--------------------------------------------------------------------------------
  let timer = null;
  let counter = 0;
  let magazine = [];
  const doRoutine = () => {
    if (counter === Number.MAX_SAFE_INTEGER) counter = 0;
    switch (counter) {
      case 1:
//        load(tank);
        break;
      case 2:
        console.log(tank.current.getDiscs());
        objectBrowser.current.setAggregate(tank.current.getDiscs());
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
  useEffect(() => {
    timer = setInterval(doRoutine, 1000);
  }, []);

  const tank = useRef();
  const controller = useRef();
  const objectBrowser = useRef();

  const apply = (lop) => {
    tank.current.dispatchEvent(new CustomEvent('moveY', 
      { detail: {
        identifier: lop.identifier,
        value: lop.top
      }}
    ));
  };

  const pushDisc = (lop) => {
    tank.current.dispatchEvent(new CustomEvent('pushDisc', { detail: lop }));
    objectBrowser.current.setAggregate(tank.current.getDiscs());
  };
  
  const getDiscs = () => {
    return tank.current.getDiscs();
  };
  
  const applyDiscs = (lop) => {
    tank.current.clearAllDiscs();
    setTimeout(() => {
      tank.current.setAllDiscs(lop);
      objectBrowser.current.setAggregate(tank.current.getDiscs());
    }, 100);
  };

  return (
    <div>
      <ObjectBrowser
        ref={ objectBrowser }
        classes={ 'SilverGraduation' }
        apply={ apply }
        pushDisc={ pushDisc }
        style={{ position: 'absolute', border: '1px solid black', zIndex: 1100, left: '1210px', width: '500px', height: '1000px' }}
        
      />
      <Controller
        ref={ controller }
        classes='OliveGreenGraduation'
        applyDiscs={ applyDiscs }
        getDiscs={ getDiscs }
      />
      <Tank ref={ tank } />
    </div>
  );
}
