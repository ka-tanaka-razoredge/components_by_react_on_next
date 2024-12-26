import React, {useState} from 'react';

export default (props) => {
//const Ofar = (props) => {
  return (
    <div style={{ position: 'relative', margin: '2px 0px' }}  onClick={props.onClick}>
      <div style={{ position: 'relative', width: '480px', height: '250px', border: '1px solid red', left: 0, top: '1rem', zIndex: 1000 }}>
        <div style={{ position: 'relative', left: 0, top: 0 }}><b>name: </b></div>
        <div style={{ position: 'absolute', left: 60, top: 0 }} dangerouslySetInnerHTML={{ __html: props.name }}></div>
        <div style={{ position: 'relative', left: 0, top: 0 }} dangerouslySetInnerHTML={{ __html: props.sail }} />
        <div style={{ position: 'relative', left: 0, top: '0.2rem' }} dangerouslySetInnerHTML={{ __html: props.lw }} />
        <div style={{ position: 'absolute', left: '4rem', top: '8rem' }} dangerouslySetInnerHTML={{ __html: props.rw }} />
        <div style={{ position: 'absolute', left: '14rem', top: '6.5rem' }} dangerouslySetInnerHTML={{ __html: props.rig }} />
      </div>
      <div style={{ position: 'absolute', left: 0, top: '1rem', zIndex: 900, marginTop: '22px' }}>
        <img src='/next/sengine/oil_field.png' />
      </div>
    </div>
  );
};

/*
export default () => {
  return (
    <Ofar sail='oilField' lw='left wing' rw='right wing' rig='rig' />
  );
};
*/