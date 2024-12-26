/**
 * 
 */
import React, { useRef, useState } from 'react';
import Ml from './Ml';

export default (props) => {
  const contextMenu = useRef();
  const [aggregate, setAggregate] = useState([]);
  
  const onMouseOver = (e) => {
    // contextMenu.current.style.opacity = 1;
    // contextMenu.current.style.visibility = 'visible';
  };
  
  const onMouseLeave = () => {
    // contextMenu.current.style.opacity = 0;
    // contextMenu.current.style.visibility = 'collapse';
  };
  
  const drawCells = (cells) => {
    const doms = [];
    for (let i = 0; i <= cells.length - 1; i++) {
      if (!(cells.indexes && (cells.indexes.find((v) => v === i) !== undefined))) {
        doms.push(<div>{cells.character}</div>);
      } else {
        doms.push(<div style={{ color: 'blue' }}>■</div>);
      }
    }
    if (cells.length === 0) doms.push(<div>{cells.character}</div>);
    
    const color = (1 <= cells.length) ? cells.color : 'rgba(0, 0, 0, 0.0)';

    return (
      <div style={{ color: color, marginBottom: '-16px', display: 'flex' }}>
        {doms}
      </div>
    );
  };
  
  return (
    <div style={{ position: 'relative' }} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
{/*    
      <div ref={contextMenu} style={{ position: 'absolute', zIndex: '1200', border: '1px solid black', width: '100px', height: '50px', top: 0, left: '100px', opacity: 0, visibility: 'collapse' }}>
        dummy
      </div>
*/}
    {
      props.aggregate.map((v, index) => {
        return drawCells(v)
      })
    }
    </div>
  )
}