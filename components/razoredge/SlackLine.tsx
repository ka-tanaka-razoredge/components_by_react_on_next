import React, { useEffect, useState, useRef } from 'react';

export default (props) => {
  let magazine = [];
  let timer = null;
  
  const widthForVn = 21;
  // 40 * duration
  const duration = 5;
  const r = useRef(null); 
  const [isHolden, setIsHolden] = useState(true);
  const resize = (e) => {
    let simultaneous;
    const v = (props.width - widthForVn) / duration;
    if (isHolden) {
      for (let i = 0; i <= duration - 1; i++) {
        simultaneous = [
          () => { r.current.style.width = parseInt(r.current.style.width) + v + 'px'; },
        ];
        magazine.push(simultaneous);
      }
      setIsHolden(false);
    } else {
      for (let i = 0; i <= duration - 1; i++) {
        simultaneous = [
          () => { r.current.style.width = parseInt(r.current.style.width) - v + 'px'; },
        ];
        magazine.push(simultaneous);
      }
      magazine.push([() => { r.current.style.width = widthForVn + 'px'; }]);
      setIsHolden(true);
    }
    timer = setInterval(doRoutine, 40);
  };
  
  const doRoutine = () => {
    if (magazine.length >= 1) {
      const simultaneous = magazine.shift();
      simultaneous.map((doIt) => {
        doIt();
      });
    }
    if (magazine.length === 0) clearInterval(timer);
  };
  
  return (
    <div ref={r} style={{ height: widthForVn + 'px', width: widthForVn + 'px', overflow: 'hidden' }} onClick={(e) => { resize(e); }}>
      { props.vn }: { props.line }
    </div>
  );
}