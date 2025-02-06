import React, {useRef, useState} from 'react';

export default (props) => {
  const body = useRef();
  const toggle = () => {
    if (body.current.style.visibility === 'collapse') {
      body.current.style.visibility = 'visible';
      body.current.style.height = 'auto';
    } else {
      body.current.style.visibility = 'collapse';
      body.current.style.height = 0;
    }
  };
  
  return (
    <>
      <style>
      {
        `
          .ofar {
            position: relative;
            margin: 4px;
            
            .ofar__body {
              position: relative;
              margin: 2px 0;
              visibility: collapse;
              height: 0;
            }
            
            .oil-field {
              position: relative;
              left: 8px;
              top: 18px;
            }
            
            .rig {
              position: absolute;
              left: 14rem;
              top: 6.5rem;
            }
          }
        `
      }
      </style>
      <div className="ofar">
        <div onClick={toggle}>{props.name}</div>
        {/* styleを設定しないと初回が空振り */}
        <div ref={body} className="ofar__body" style={{ visibility: 'collapse', height: 0 }}  onClick={props.onClick}>
          <div style={{ position: 'relative', width: '480px', height: '250px', border: '1px solid red', margin: '0 4px', left: 0, top: `${0}px`, zIndex: 1000 }}>
            <div className="oil-field" dangerouslySetInnerHTML={{ __html: props.sail }} />
            <div style={{ position: 'relative', left: 0, top: '1rem' }} dangerouslySetInnerHTML={{ __html: props.lw }} />
            <div style={{ position: 'absolute', left: '4rem', top: '8rem' }} dangerouslySetInnerHTML={{ __html: props.rw }} />
            <div className="rig" dangerouslySetInnerHTML={{ __html: props.rig }} />
          </div>
          <div style={{ position: 'absolute', left: 0, top: `${-10}px`, zIndex: 900, marginTop: '22px', padding: `${8}px` }}>
            <img src='/next/sengine/oil_field.png' />
          </div>
        </div>
      </div>
    </>
  );
};

/*
export default () => {
  return (
    <Ofar sail='oilField' lw='left wing' rw='right wing' rig='rig' />
  );
};
*/