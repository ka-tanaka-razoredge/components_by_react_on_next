import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default (props: { identifier: string, [key: string]: any }, ref) => {
  const base = useRef(null);
  const frontInner = useRef(null);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
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
            document.getElementById(`${props.idForGraph}${v.row}-${v.column}`).style.backgroundColor = v.color;
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
      <div class="bottle-outer" dangerouslySetInnerHTML={{ __html: props.contentsForBottomOuter || props.contentsForBottomInner }} />
    );
  };

  const drawFront = () => {
    const buildTransform = () => {
      let reply = 'rotateX(-90deg) translateY(-25px) translateZ(-50px)';
      if (props.height && props.width) {
        if (props.width === 400 && props.height === 225) reply = 'rotateX(-90deg) translateX(20px) translateY(-100px) translateZ(-160px)';
      }
      return reply;
    };

    if (!props.isBottomOnly) {
      let t = 'title' in props ? props.title : '';
      
      if (props?.msView === 'frontInner') {
        return drawMs();
      }

      if (('isReact' in props == false) || props?.isReact === false) {
        return (
          <>
            <div
              ref={frontInner}
              className="front-inner"
              style={{
                border: 'solid 1px lime',
                width: (props.width) ? props.width + 'px' : 100 + 'px',
                height: (props.height) ? props.height + 'px' : 50 + 'px',

                transform: (!props.isFromNow) ? 'rotateX(180deg)' : 'rotateX(180deg) rotateY(180deg)',
                
              }}
              dangerouslySetInnerHTML={{ __html: props.contentsForFrontInner }}
              title={t}
            />
{/*            
            <div className="tool-box">園</div>
*/}            
{/*
            <div
              style={{
                position: 'absolute',
                zIndex: -1,
                top: 0,
                border: 'solid 1px lime',
                backgroundColor: 'white',
                width: (props.width) ? props.width + 'px' : 100 + 'px',
                height: (props.height) ? props.height + 'px' : 50 + 'px',
                transform: 'rotateX(180deg) rotateY(180deg)'
              }}
              dangerouslySetInnerHTML={{ __html: props.contentsForFrontInner }}
              title={t}
            />
*/}            
          </>
        );
      } else {
        console.log(props);
        return(
          <div
            style={{
              border: 'solid 1px red',
              width: (props.width) ? props.width + 'px' : 100 + 'px',
              height: (props.height) ? props.height + 'px' : 50 + 'px',
              transform: 'rotateX(180deg)'
            }}
            title={t}
          >
            { props.doIt() }
          </div>
        );        
      }
    } else {
      return null;
    }
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
          
          .bottle-outer {
            position: relative;
            boder: 1px solid rgb(0, 0, 0, 0.1);
            transform: rotateX(180deg); translateY(32px);
            top: -14px;
          }
          
        `
      }
      </style>
      <div
        ref={base}
        id={props.identifier}
        className="disc bottom-inner"
        style={{
          transformStyle: 'preserve-3d',
          border: '1px solid orange',
          height: (props.duration) ? props.duration : '1rem',
          width: (props.width) ? props.width + 'px' : 100 + 'px',
          top: props.top + 'px',
          left: props.left + 'px',
          position: 'absolute',
          transform: buildTransform(),
        }}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        {drawBottomInner()}
        {drawBottomOuter()}
        {/* shaft */}
        <div
          style={{
            position: 'absolute',
            width: (props.width) ? props.width + 'px' : 100 + 'px',
            top: '0px',
            height: '1px',
            transform: 'rotateX(90deg)'
          }}>
            {drawFront()}
        </div>
      </div>
    </>
  );
};
