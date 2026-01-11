import React, { useState } from 'react';

export default (props) => {
  const defaultWidth = `${0.9}rem`;
  const [width, setWidth] = useState((props.singleton.width) ? `auto` : defaultWidth);
  const [overflow, setOverflow] = useState((props.singleton.width) ? `visible` : `hidden`);

  const showListenerView = () => {
    document.getElementById(props.singleton.id).style.visibility = 'visible';
  };
  
  const hideListenerView = () => {
    document.getElementById(props.singleton.id).style.visibility = 'collapse';
  };

  const toggle = () => {
    if (width === 'auto') {
      setWidth(defaultWidth);
      setOverflow(`hidden`);
      hideListenerView();
    } else {
      setWidth(`auto`);
      setOverflow(`visible`);
    }
  };
  
  const drawM = () => {
    return (1 <= props.singleton?.m.length) ? `m: ` : 'm';
  };
  
  const fetchOpacity = () => {
    return (props.singleton?.opacity) ? props.singleton.opacity : 1.0;
  };

  return (
    <>
      <style>
      {
        `
          .message-listener {
            position: absolute;
            border: solid 1px black;
          }

          .nowrap {
            white-space: nowrap;
display: flex;
          }
          
          .alias-and-ml {
            display: flex;
            line-height: 1;
          }
          
          .alias {
            font-size: 11pt;
          }
        `
      }
      </style>
      <div
        className="message-listener"
        style={{ top: props.singleton.top, left: props.singleton.left, height: `${1}rem`, width: width, overflow: overflow, opacity: fetchOpacity() }}
      >
        <div className="alias-and-ml">
          <div className="nowrap">
            <span className="alias" style={ props.singleton.style } onClick={ (e) => { toggle(); } }>{ `${props.singleton.alias}` }</span>: &#123; {drawM()}{ props.singleton.m }, <span onMouseEnter={ (e) => { showListenerView();  } }>l</span>&nbsp;&#125;
          </div>
          <div
            id={ props.singleton.id }
            style={{ position: 'relative', color: 'lime', backgroundColor: 'rgba(0, 0, 0, 1.0)', visibility: 'collapse', left: `${3.5}rem`, width: '500px', zIndex: 1100 }}
            onClick={ (e) => { hideListenerView(); } }
          >
            <div dangerouslySetInnerHTML={{ __html: props.singleton.l }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
