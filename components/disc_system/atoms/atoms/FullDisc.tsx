import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import useLongTap from '@/hooks/disc_system/long_tap';
import ContextMenu from '@/components/disc_system/molecules/ContextMenu/for_disc';

export default (props: { identifier: string, [key: string]: any }, ref) => {
  const base = useRef(null);
  const frontInner = useRef(null);
  const contextMenu = useRef(null);
  const [selected, setSelected] = useState(false);
  const {executeLongTap: execLt4ContextMenu} = useLongTap({
    refs: {
      client: base,
    },
    callBack: () => {
      contextMenu.current.show();
    },
    duration: 500,
  });

  useEffect(() => {
    execLt4ContextMenu();
    
    base.current.addEventListener('moveX', e => {
      moveX(e.detail.value);
    });
    base.current.addEventListener('moveY', e => {
      moveY(e.detail.value);
    });
    base.current.addEventListener('moveZ', e => {
      moveY(e.detail.value);
    });
    base.current.addEventListener('', (e) => {
      frontInner.current.style.transform = 'rotateX(180deg) rotateY(180deg)';
    });

    if (props.isBottomOnly) {
      base.current.style.border = null;
    }
    
    if (props.rows) {
      props.parameterForGraphes.map((v) => {
        // ex: id-graph_0-
        try {
          if (v.color) {
            if (v.color.indexOf('linear-gradient') !== -1) {
              document.getElementById(`${props.idForGraph}${v.row}-${v.column}`).style.background = v.color;
            } else {
              document.getElementById(`${props.idForGraph}${v.row}-${v.column}`).style.backgroundColor = v.color;
            }
          } else {
            document.getElementById(`${props.idForGraph}${v.row}-${v.column}`).style.border = v.border;
          }
        } catch (e) {
        }
      });
    }
  }, []);

  const moveX = value => {
    base.current.style.left = value + 'px';
  };

  const moveY = value => {
    base.current.style.top = value + 'px';
  };

  const moveZ = value => {
    base.current.style.transform = `translateZ(${value} + 'px')`;
  };
  
  const drawMs = () => {
    let buildContents;
    if (props.msView === 'frontInner') {
      buildContents = (rows=11, columns=11) => {
        let reply = '';
        reply += `<div style='width: ${10 * columns}px; transform: rotateX(180deg);'>`;
        for (let i = 0; i <= rows - 1; i++) {
          reply += `<div style='display: flex;'>`;
          for (let j = 0; j <= columns - 1; j++) {
            reply += `<div id='${props.idForGraph}${i}-${j}' style='border: 1px solid silver; width: ${10}px; height: ${10}px;'></div>`;
          }
          reply += `</div>`;

          if (i === 0) {
            reply += `<div style='border-top: 1px solid ${props.topBorder};'></div>`
          }
          if (i === rows - 2) {
            reply += `<div style='border-top: 1px solid ${props.bottomBorder};'></div>`
          }
        }
        reply += `</div>`;
        return reply;
      };
    } else {
      buildContents = (rows=11, columns=11) => {
        let reply = '';
        for (let i = 0; i <= rows - 1; i++) {
          reply += `<div style='display: flex; justify-content: center;'>`;
          reply += `<div style='display: flex;'>`;
          for (let j = 0; j <= columns - 1; j++) {
            reply += `<div id='${props.idForGraph}${i}-${j}' style='border: 1px solid silver; width: 10px; height: 10px; background-color: white;'></div>`;
            if (j === 0) {
              reply += `<div style="border: 1px solid ${props.bottomBorder};"></div>`
            }
            if (j === columns - 2) {
              reply += `<div style="border: 1px solid ${props.topBorder};"></div>`
            }
          }
          reply += `</div>`;
          reply += `</div>`;
        }
        return reply;
      };
    }

    return (
      <div dangerouslySetInnerHTML={{ __html: buildContents(props.rows, props.columns) }} />
    );
  };

  const drawBottom = () => {
    if (!props.isBottomOnly) {
    } else {
    }
  };

  const drawBottomInner = () => {
    if (props?.msView === 'frontInner') return ('　');

    if (!props.contentsForBottomInner && !props.rows) {
      return '　';
      //      return props.contentsForFrontInner;
    } else {
      if (!props.rows) {
        return (
          <div dangerouslySetInnerHTML={{ __html: props.contentsForBottomInner }} />
        );
      }
      return drawMs();
    }
  };
  
  const drawBottomOuter = () => {
    return (
      <div class="bottom-outer" dangerouslySetInnerHTML={{ __html: props.contentsForBottomOuter || props.contentsForBottomInner }} />
    );
  };

  const drawFront = () => {
    return (
      <>
        <style>
        {
          `
          `
        }
        </style>
        <div
          ref={frontInner}
          className="front-inner"
          style={{
            border: 'solid 1px silver',
            width: (props.width) ? props.width + 'px' : 100 + 'px',
            height: (props.height) ? props.height + 'px' : 50 + 'px',

            transform: (!props.isFromNow) ? 'rotateX(180deg)' : 'rotateX(180deg) rotateY(180deg)',
            
          }}
          dangerouslySetInnerHTML={{ __html: props.contentsForFrontInner }}
          title={props.t}
        />
      </>
    );
  };

  const drawBack = () => {
    return (
      <>
        <style>
        {
          `
            .back {
              position: absolute;
            }
            
            .back--inner {
              border: solid 1px silver;
              transform: rotateX(180deg) rotateY(180deg); 
            }

            .back--outer {
              border: solid 1px silver;
              transform: rotateX(180deg); 
            }
          `
        }
        </style>
        <div
          className="back back--inner"
          style={{
            width: `${props.width||100}px`,
            height: `${props.height||50}px`,
            top: `${props.duration||100}px}`,
          }}
          dangerouslySetInnerHTML={{ __html: props.contentsForBackInner }}
        />
        <div
          className="back back--outer"
          style={{
            width: `${props.width||100}px`,
            height: `${props.height||50}px`,
            top: `${props.duration||100}px}`,
          }}
          dangerouslySetInnerHTML={{ __html: props.contentsForBackOuter }}
        />
      </>
    );
  };
  
  const buildTransform = () => {
//    console.log('---- buildTransform begin ----');
    let reply = '';
    if (props.z) reply += `translateZ(${props.z}px) `;
    if (props.rotateY) reply += `rotateZ(${props.rotateY}deg) `;
    if (props.transform) reply += `${props.transform}`;
console.log(reply);
    return reply;
  };
  
  const onMouseOver = (e) => {
    const previewWindow = document.getElementById('preview-window');
    if (!previewWindow || !props.contents) return;
    previewWindow.dispatchEvent(new CustomEvent('show', { detail: { value: (props.contents) ? props.contents : '' } }));
  };

  const onMouseLeave = (e) => {
    const previewWindow = document.getElementById('preview-window');
    if (!previewWindow|| !props.contents) return;
    previewWindow.dispatchEvent(new CustomEvent('hide', { detail: { value: (props.contents) ? props.contents : '' } }));
  };

  return (
    <>
      <style>
      {
        `
          .tool-box-local {
            position: absolute;
            z-index: 1100;
            background-color: rgba(0, 0, 0, 0.5);
            top: 0px;
            left: 0px;
            transform: rotateX(180deg);
            height: 100px;
          }
          
          .bottom-outer {
            position: relative;
            boder: 1px solid rgb(0, 0, 0, 0.1);
            transform: rotateX(180deg); translateY(32px);
            top: -14px;
          }
          
          .ceiling-outer {
            position: absolute;
            border: 1px solid silver;
          }
          
          .left-side {
          }
        `
      }
      </style>
      <div
        ref={base}
        id={props.identifier}
        className="disc"
        style={{
          transformStyle: 'preserve-3d',
          border: '1px solid silver',
          height: (props.duration) ? props.duration : '1rem',
          width: (props.width) ? props.width + 'px' : 100 + 'px',
          top: props.top + 'px',
          left: props.left + 'px',
          position: 'absolute',
          transform: buildTransform(),
          pointerEvents: 'none',
          boxShadow: (props.isShadow) ? '10px 10px 5px rgba(0, 0, 0, 0.1)' : '',
        }}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        {drawBottomInner()}
        {/* drawBottomOuter() */}
        
        {/* ceiling */}
        <div
          className="ceiling-outer"
          style={{
            width: `${props.width}px`,
            height: `${props.duration}px`,
            top: 0,
            transform: `translateZ(${props.height}px)`,
          }}
          dangerouslySetInnerHTML={{ __html: props.contentsForCeilingOuter }}
        >
        </div>

        {/* shaft of bottom-front */}
        <div
          style={{
            position: 'absolute',
            width: (props.width) ? props.width + 'px' : 100 + 'px',
            top: '0px',
            height: '1px',
            transform: 'rotateX(90deg)'
          }}
        >
          {drawFront()}
        </div>

        {/* shaft of bottom-back */}
        <div
          style={{
            position: 'absolute',
            width: (props.width) ? props.width + 'px' : 100 + 'px',
            top: `${props.duration}px`,
            height: 0,
            transform: 'rotateX(90deg)'
          }}
        >
          {drawBack()}
        </div>
        
        {/* shaft of bottom-left */}
        
        <div
          style={{
            position: 'absolute',
            width: `${props.height}px`,
            top: 0,
            left: 0,
            height: 0,
            transformOrigin: 'left top',
            transform: 'rotateX(90deg) rotateY(90deg)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: `${props.height}px`,
              height: `${props.height}px`,
              transform: 'rotateX(-180deg)'
            }}
          >
          </div>
        </div>

        {/* shaft of bottom-right */}
        <div
          style={{
            position: 'absolute',
            width: `${props.height}px`,
            top: 0,
            left: `${props.width}px`,
            height: 0,
            transformOrigin: 'left top',
            transform: 'rotateX(90deg)  rotateY(90deg)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: `${props.height}px`,
              height: `${props.height}px`,
              transform: 'rotateX(180deg)'
            }}
          >
          </div>
        </div>
        
        <ContextMenu
          ref={contextMenu}
          base={base}
          frontInner={frontInner}
          width={props.width}
        />
      </div>
    </>
  );
};
