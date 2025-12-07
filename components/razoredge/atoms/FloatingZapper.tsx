import React, { useRef } from 'react';

export default (props, ref) => {
  const contents = useRef(null);
  
  const onPointerMove = (e) => {
    if (e.buttons) {
      contents.current.style.left = contents.current.offsetLeft + e.movementX + 'px';
      contents.current.style.top = contents.current.offsetTop + e.movementY + 'px';
      contents.current.setPointerCapture(e.pointerId);
    }
  };

  return (
    <div ref={contents} onPointerMove={onPointerMove} style={{ position: 'absolute', zIndex: 1000, width: `${1600}px`, height: `${900}px`, top: `${28}px`, left: `${1200}px`, backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
      {props.children}
    </div>
  );
};
