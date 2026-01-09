/**
 * 
 */
import React, { useRef, useState } from 'react';

export default (props) => {
  const fetchFromKeyword = (keyword) => {
    const fetchColor = () => {
      switch (keyword) {
        case 'red ocean':
          return 'red';
        case 'density partial':
          return 'red';
        default:
          return '';
      }
    };
    
    const create = (keyword) => {
      switch (keyword) {
        case 'ocean':
        case 'red ocean':
          return {
              character,
              length: 11,
              color,
              background,
          };
        default:
          return {}
      }
    };

    let reply;
    const character = (props.alias) ? props.alias : ``;
    let color = fetchColor();
    if (props.color) color = props.color;
    if (props.background && !props.color) color = 'rgba(0, 0, 0, 0.1)';
    let background = (props.background) ? props.background : '';

    switch (keyword) {
      case 'ocean':
      case 'red ocean':
        reply = [create(keyword), create(keyword), create(keyword), create(keyword), create(keyword)];
        break;
      case 'density partial':
        reply = [
          {
            character,
            length: 6,
            color,
          },
          {
            character,
            length: 4,
            color,
          },
          {
            character,
            length: 3,
            color,
          },
          {
            character,
            length: 4,
            color,
          },
          {
            character,
            length: 6,
            color,
          },
        ];
        break;
      case 'alternative':
        const surface = {
          length: 11,
          color: 'red',
          indexes: [
            1, 3, 5, 7, 9
          ],
          colorForIndexes: 'lime'
        };
        const back = {
          length: 11,
          color: 'red',
          indexes: [
            0, 2, 4, 6, 8, 10
          ],
          colorForIndexes: 'lime'
        };
        reply = [
          surface,
          back,
          surface,
          back,
          surface
        ]
        break;
      default:
        break;
    }
  
    // dcoml's mode changed when (props.name).
    // props.aggregate is indexes.
    for (const v of props.aggregate) {
      if (!reply[v.rowIndex]['indexes']) reply[v.rowIndex]['indexes'] = [];

      if (!v.view.background) {
        reply[v.rowIndex].indexes.push({
          index: v.columnIndex,
          color: v.view.color,
          alias: v.view.alias,
        });
      } else {
        if ('alias' in v.view) {
          // doms.push(<div style={{ backgroundColor: indexObject.backgroundColor||'', color: indexObject.color||''  }}>{indexObject.alias||''}</div>);
          reply[v.rowIndex].indexes.push({
            index: v.columnIndex,
            color: v.view.color,
            alias: v.view.alias,
            backgroundColor: v.view.background,
          // backgroundColor: 'blue',
          });
        } else {
          // doms.push(<div style={{ display: 'flex', margin: `0 ${1}px 0 ${1}px` }}><div style={{ background: indexObject.background||'', color: indexObject.color||'',  height: `${0.5}rem`, width: `${0.5}rem` }}></div></div>);
          reply[v.rowIndex].indexes.push({
            index: v.columnIndex,
            background: v.view.background,
          });
        }
      }
    }
    console.log('Dcosml.fetchByName: ', reply);
    return reply;
  };

  const contextMenu = useRef();
  const [aggregate, setAggregate] = useState((props.name) ? fetchFromKeyword(props.name) : props.aggregate || []);

  
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
      const margin = `${0.03}rem`;
      const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.4rem',
        lineHeight: 1,

        margin,
        background: ``,
        color: ``,
        height: `${0.5}rem`,
        width: `${0.5}rem`
      };

      // 有効なindexes
      if (cells.indexes && cells.indexes.length >= 1) {
        // indexesが定義されていてそれが配列だったら
        if (typeof cells.indexes[0] !== 'object') {
          if (!(cells.indexes && (cells.indexes.find((v) => v === i) !== undefined))) {
            doms.push(<div style={{ margin, border: cells.border||'', background: cells.background||cells.backgroundColor||cells.color||'', color: cells.color||'', height: `${0.5}rem`, width: `${0.5}rem` }}>{cells.character||''}</div>);
          } else {
            const indexObject = cells.indexes.find((v) => v === i);
            style.background =cells.colorForIndexes||indexObject.background||indexObject.backgroundColor||indexObject.color||'';
            style.color = indexObject.color||'',
            doms.push(<div style={style}>{indexObject.alias||''}</div>);
          }
        } else {
          if (!(cells.indexes && (cells.indexes?.find(obj => obj.index === i) !== undefined))) {
            doms.push(<div style={{ margin, border: cells.border||'', background: cells.background||cells.backgroundColor||cells.color||'', color: cells.color||'', height: `${0.5}rem`, width: `${0.5}rem` }}>{cells.character||''}</div>);
          } else {
            const indexObject = cells.indexes?.find(obj => obj.index === i);
            style.background = indexObject.background||indexObject.backgroundColor||indexObject.color||'';
            style.color = indexObject.color||'';
            doms.push(<div style={style}>{indexObject.alias||''}</div>);
          }
        }
      } else {
        doms.push(<div style={{ margin, border: cells.border||'', background: cells.background||cells.backgroundColor||cells.color||'', color: cells.color||'', height: `${0.5}rem`, width: `${0.5}rem` }}>{cells.character||''}</div>);
      }
    }

    if (cells.length === 0) doms.push(<div>{cells.character}</div>);
    const color = (1 <= cells.length) ? cells.color : 'rgba(0, 0, 0, 0.0)';
    return (
      <div className="law" style={{ color: color }}>
        {doms}
      </div>
    );
  };

/*
  const drawCells = (cells) => {
console.log('Dcosml.drawCells: ', cells);
    const doms = [];
    for (let i = 0; i <= cells.length - 1; i++) {
      // indexesが定義されていてそれが配列だったら
      if (cells.indexes && cells.indexes.length >= 1 && typeof cells.indexes[0] !== 'object') {
        if (!(cells.indexes && (cells.indexes.find((v) => v === i) !== undefined))) {
          if (!cells.background) {
            // default
//MUT            doms.push(<div>{cells.character}</div>);
            doms.push(<div style={{ display: 'flex', margin: `0 ${0.3}px 0 ${1}px` }}><div style={{ border: cells.border||'', background: cells.background||cells.backgroundColor||cells.color||'', color: cells.color||'', height: `${0.5}rem`, width: `${0.5}rem` }}>{cells.character||''}</div></div>);
          } else {
            doms.push(<div style={{ display: 'flex', margin: `0 ${0.3}px 0 ${1}px` }}><div style={{ background: cells.background||cells.backgroundColor||'', color: cells.color||'', height: `${0.5}rem`, width: `${0.5}rem` }}>{cells.character||''}</div></div>);
          }
//DEL          doms.push(<div>{cells.character}</div>);
        } else {
//MUT          doms.push(<div style={{ color: 'blue' }}>■</div>);
          doms.push(<div style={{ display: 'flex', margin: `0 ${0.3}px 0 ${1}px` }}><div style={{ background: cells.colorForIndexes||'blue', color: cells.color||'', height: `${0.5}rem`, width: `${0.5}rem` }}>{cells.character||''}</div></div>);
        }
      } else {
        if (!(cells.indexes && (cells.indexes?.find(obj => obj.index === i) !== undefined))) {
          if (!cells.background) {

            // default
//MUT            doms.push(<div>{cells.character}</div>);
            doms.push(<div style={{ display: 'flex', margin: `0 ${0.3}px 0 ${1}px` }}><div style={{ background: cells.background||cells.backgroundColor||'', color: cells.color||'', height: `${0.5}rem`, width: `${0.5}rem` }}>{cells.character||''}</div></div>);
          } else {
            doms.push(<div style={{ display: 'flex', margin: `0 ${0.3}px 0 ${1}px` }}><div style={{ background: cells.background||cells.backgroundColor||'', color: cells.color||'', height: `${0.5}rem`, width: `${0.5}rem` }}>{cells.character||''}</div></div>);
          }
        } else {
          const indexObject = cells.indexes?.find(obj => obj.index === i);
//console.log('indexObject@Dcosml.drawCells: ', indexObject);          
          if ('class' in indexObject) {
            const cssClass = `${indexObject.class}`;
            doms.push(<div className={cssClass}>{indexObject.alias||''}</div>);
          } else {
            if ('alias' in indexObject) {
//              doms.push(<div style={{ background: indexObject.backgroundColor||indexObject.background||'', color: indexObject.color||''  }}>{indexObject.alias||''}</div>);
              doms.push(<div style={{ display: 'flex', margin: `0 ${0.3}px 0 ${1}px` }}><div style={{ lineHeight: `${0.5}rem`, display: 'flex', justifyContent: 'center', alignItems: 'center', background: indexObject.backgroundColor||indexObject.background||'', color: indexObject.color||'', height: `${0.5}rem`, width: `${0.5}rem` }}>{indexObject.alias||''}</div></div>);
console.log('case 5: ', cells);
            } else {
console.log('case 6: ', cells);

              doms.push(<div style={{ display: 'flex', margin: `0 ${0.3}px 0 ${1}px` }}><div style={{ background: indexObject.background||'', color: indexObject.color||'',  height: `${0.5}rem`, width: `${0.5}rem` }}></div></div>);
            }
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
*/  
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
//            align-items: baseline;

            line-height: 0.75;
//            background-color: pink;
            font-size: 12px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
          }
          
          .law {
            display: flex;
            font-size: 12px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
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
        aggregate.map((v, index) => {
          return drawCells(v)
        })
      }
    </div>
    </>
  )
}
