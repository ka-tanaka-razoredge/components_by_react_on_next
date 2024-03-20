import React, { useState } from 'react';

export default (props) => {
  const [width, setWidth] = useState((props.singleton.width) ? `auto` : `1rem`);
  const [overflow, setOverflow] = useState((props.singleton.width) ? `visible` : `hidden`);

  const showListenerView = () => {
    document.getElementById(props.singleton.id).style.visibility = 'visible';
  };
  
  const hideListenerView = () => {
    document.getElementById(props.singleton.id).style.visibility = 'collapse';
  };

  const toggle = () => {
    if (width === 'auto') {
      setWidth(`1rem`);
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
    <div style={{ position: 'absolute', top: props.singleton.top, left: props.singleton.left, border: 'solid 1px black', height: '22px', width: width, overflow: overflow, opacity: fetchOpacity() }}>
      <div><span style={ props.singleton.style } onClick={ (e) => { toggle(); } }>{ props.singleton.alias }</span>: &#123; {drawM()}{ props.singleton.m }, <span onMouseEnter={ (e) => { showListenerView();  } }>l</span> &#125;</div>
      <div id={ props.singleton.id } style={{ position: 'relative', color: 'lime', backgroundColor: 'rgba(0, 0, 0, 1.0)', visibility: 'collapse', top: '-25px', left: props.singleton.m.length + 3.5 + 'rem', width: '500px', zIndex: 1100 }} onClick={ (e) => { hideListenerView(); } }>
        <div dangerouslySetInnerHTML={{ __html: props.singleton.l }}></div>
      </div>
    </div>
  )
}