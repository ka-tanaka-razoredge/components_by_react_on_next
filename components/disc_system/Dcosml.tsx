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
//console.log('Dcosml.drawCells: ', cells);
    const doms = [];
    for (let i = 0; i <= cells.length - 1; i++) {
      
      if (cells.indexes && cells.indexes.length >= 1 && typeof cells.indexes[0] !== 'object') {
        if (!(cells.indexes && (cells.indexes.find((v) => v === i) !== undefined))) {
          doms.push(<div>{cells.character}</div>);
        } else {
          doms.push(<div style={{ color: 'blue' }}>■</div>);
        }
      } else {
        if (!(cells.indexes && (cells.indexes?.find(obj => obj.index === i) !== undefined))) {
          doms.push(<div>{cells.character}</div>);
        } else {
          const indexObject = cells.indexes?.find(obj => obj.index === i);
//console.log('indexObject@Dcosml.drawCells: ', indexObject);          
          if ('class' in indexObject) {
            const cssClass = `${indexObject.class}`;
            doms.push(<div className={cssClass}>{indexObject.alias||''}</div>);
          } else {
            doms.push(<div style={{ backgroundColor: indexObject.backgroundColor||'', color: indexObject.color||''  }}>{indexObject.alias||''}</div>);
          }
        }
      }
    }
    if (cells.length === 0) doms.push(<div>{cells.character}</div>);
    
    const color = (1 <= cells.length) ? cells.color : 'rgba(0, 0, 0, 0.0)';

    return (
      <div className="row" style={{ color: color }}>
        {doms}
      </div>
    );
  };
  
  return (
    <>
      <style>
      {
        `
          .cell {
            height: 0.5rem;
            width: 0.5rem;
          }

          .rz-gold {
            height: 0.5rem;
            width: 0.5rem;
            background: var(--gold);
            color: black;
          }

          .dcoml {
//            background-color: pink;
            white-space: nowrap;
          }
          
          .row {
            display: flex;
            align-items: baseline;

            line-height: 0.5;
//            background-color: pink;
          }
        `
      }
      </style>
      <div
        className="dcoml"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
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
    </>
  )
}
