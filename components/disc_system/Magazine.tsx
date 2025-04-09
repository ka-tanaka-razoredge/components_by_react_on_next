import React, { useEffect, useRef, useState } from 'react';

import useDiscFactory from '@/hooks/disc_system/disc_factory';

import Disc from './Disc';
import DiscFor from './DiscFor';
import MetalTape from './MetalTape';
import Magazine from './Magazine';
import Sail from './Sail';
import Cube from './Cube';
import Carousel from './Carousel';
import Cable from './Cable';

export default (props: { identifier: string, [key: string]: any }, ref) => {
  const base = useRef(null);
  const joint = useRef(null);
  const back = useRef(null);
  const abdomen = useRef(null);

  const [discs, setDiscs] = useState([]);
  const [vertical, setVertical] = useState(false);
//DEL  let { tense, setTense } = useState(false);
  let t = false;
  
  const { createDisc } = useDiscFactory();

  useEffect(() => {
    base.current.addEventListener('moveX', e => {
      moveX(e.detail.value);
    });
    base.current.addEventListener('moveY', e => {
      moveY(e.detail.value);
    });

    base.current.addEventListener('dblclick', function(e) {
      if (t === false) {
        rotateX(90);
        t = true;
        setVertical(true);
      } else {
        rotateX(0);
        t = false;
        setVertical(false);
      }
    });

    joint.current.addEventListener('rotateX', e => {
      rotateX(e.detail.value);
    });

    rotateX(0);
    if (props.views) {
      rotateX(90);
//      joint.current.style.transform = 'rotateX(-90deg) translateY(-400px)';
      setVertical(true);
    }

    if (props.transformForTheJoint) {
      joint.current.style.transform = props.transformForTheJoint;
    }
  }, []);

  const moveX = value => {
    base.current.style.left = value + 'px';
  };
  const moveY = value => {
    base.current.style.top = value + 'px';
  };

  const rotateX = value => {
    joint.current.style.transform = 'rotateX(' + value + 'deg)';
  };
  
  const drawContentsForBack = () => {
      return (
        <div dangerouslySetInnerHTML={{ __html: props.contentsForFrontInner }}>
        </div>
      );
  };
  
  useEffect(() => {
    if (vertical) {
      back.current.style.zIndex = null;
    } else {
      back.current.style.zIndex = 1000;
    }
  }, [vertical]);
  
  function measureElementSize(html: string) {
    const tempElement = document.createElement("div");
    tempElement.style.position = "absolute"; // DOMに影響を与えない
    tempElement.style.visibility = "hidden"; // 見えないようにする
    tempElement.style.width = "auto";
    tempElement.style.height = "auto";
    tempElement.style.whiteSpace = "nowrap"; // 折り返しなしで測る
  
    tempElement.innerHTML = html;
  
    document.documentElement.appendChild(tempElement); // `body` ではなく `documentElement` に追加
    const size = tempElement.getBoundingClientRect();
    tempElement.remove(); // すぐに削除
  
    return { width: size.width, height: size.height };
  };

  const buildL = (html) => {
    let reply = {
      source: '',
      width: `20px`,
      width: `20px`,
      rep: '',
    };
    if (!html) return reply;

    const doc = new DOMParser().parseFromString(html, "text/html");
    let rep = doc.body.textContent.substr(0, 1);
    let width = measureElementSize(rep);
    
    reply = {
      source: doc.body.textContent,
      ...measureElementSize(doc.body.textContent),
      rep: rep,
    }
    return reply;
  };
  
  const toggleStrap = (id) => {
    const element = document.getElementById(id);  
    if (element.style.transform === 'rotateY(-90deg)') {
      element.style.transform = `rotateY(0deg)`;
    } else {
      element.style.transform = `rotateY(-90deg)`;
    }
  };

  return (
    <>
      <style>
      {
        `
          .back {
            // background-color: rgba(255, 0, 0, 1.0),
          }
          
          .abdomen {
            position: relative;
            background-color: rgba(255, 255, 255, 1.0);
            transform: rotateX(180deg);
            
            .line {
              position: relative;
            }

            .dot {
              position: absolute;
//              border: 1px solid rgba(0, 0, 0, 0.1);
            }
          }
          
          .form-L {
            perspective: 800px;
            perspective-origin: -300px -300px;
            
            .representer {
              border: 1px solid black;
              width: 20px;
              height: 20px;
              display: flex;
              text-align: center;
              justify-content: center;
              align-items: center;
            }

            .shaft {
              height: 20px;
              width: 1px;
              background-color: red;
              transform: rotateY(-90deg);
            }

            .strap {
              height: 1rem;
              width: 200px;
              height: 20px;
              display: flex;
              text-align: center;
              justify-content: center;
              align-items: center;
//              background-color: white;
            }
          }
        `
      }
      </style>
      <div
        ref={base}
        id={props.identifier}
        style={{
          transformStyle: 'preserve-3d',
  //        border: '1px solid blue',
          height: 10 + 'px',
          width: 100 + 'px',
          top: props.top + 'px',
          left: props.left + 'px',
          position: 'absolute'
        }}
      >
        { props.contentsForBottomInner && (props.contentsForBottomInner) }
        <div
          ref={joint}
          style={{
            transformStyle: 'preserve-3d',
            border: 'solid 1px red',
            position: 'absolute',
            top: 0 + 'px',
            height: `${1}px`,
          }}
        >
          {/*
            backgroundColorはzIndexがnullでない場合のみ有効
          */}
          <div
            ref={back}
            className="ba"
            style={{
              transformStyle: 'preserve-3d',
              border: 'solid 4px green',
              backgroundColor: 'rgba(255, 255, 255, 1.0)',
              position: 'absolute',
              width: `${props.width}px`,
              height: `${props.height}px`,
              top: 0 + 'px',
              left: 0 + 'px',
            }}
          >
            {props.discs?.map((line, index) => {
              return line.map((disc, index) => {
                if ('type' in disc === false || disc.type === 'Disc') {
//console.log(disc);
                  return (
                    <Disc
                      {...disc}
                      identifier={disc.identifier}
                      contentsForFrontInner={disc.contentsForFrontInner}
                      contentsForBottomInner={disc.contentsForBottomInner}
                      title={disc.title}
                      height={disc.height}
                      width={disc.width}
                      left={disc.left}
                      top={disc.top}
                      doIt={disc.doIt}
                      isBottomOnly={disc.isBottomOnly}
                      z={disc.z}
                      rotateY={disc.rotateY}
                      duration={disc.duration}
    
                      rows={disc.rows}
                      columns={disc.columns}
                      idForGraph={disc.idForGraph}
                      parameterForGraphes={disc.parameterForGraphes}
                      msView={disc.msView}
                      topBorder={disc.topBorder}
                      bottomBorder={disc.bottomBorder}
                    />
                  )
/*                  
                } else if (disc.type === 'Magazine') {
                  return (
                    <Magazine
                      identifier={disc.identifier}
                      contentsForFrontInner={disc.contentsForFrontInner}
                      discs={disc.discs}
                      top={disc.top}
                      left={disc.left}
                      height={disc.height}
                      width={disc.width}
                    />
                  )
*/
                } else if (disc.type === 'MetalTape') {
                  return (
                    <MetalTape
                      identifier={disc.identifier}
                      contentsForFrontInner={disc.contentsForFrontInner}
                      top={disc.top}
                      left={disc.left}
                      height={disc.height}
                    />
                  )
                } else if (disc.type === 'Sail') {
                  return (
                    <Sail
                      key={disc.identifier}
                      identifier={disc.identifier}
                      contentsForFrontInner={disc.contentsForFrontInner}
                      isBottomOnly={disc.isBottomOnly}
                      top={disc.top}
                      left={disc.left}
                      width={disc.width}
                      height={disc.height}
                      title={disc.title}
                      transform={disc.transform}
                      z={disc.z}
                    />
                  )
                } else if (disc.type === 'Cube') {
                  return (
                    <Cube
                      identifier={disc.identifier}
                      top={disc.top}
                      left={disc.left}
                      z={disc.z}
                    />
                  )
                } else if (disc.type === 'Carousel') {
                  return (
                    <Carousel
                      identifier={disc.identifier}
                      contentsForFrontInner={disc.contentsForFrontInner}
                      contentsForBottomInner={disc.contentsForBottomInner}
                      title={disc.title}
                      height={disc.height}
                      width={disc.width}
                      left={disc.left}
                      top={disc.top}
  //                    isReact={isReact(disc)}
                      doIt={disc.doIt}
                      isBottomOnly={disc.isBottomOnly}
                      z={disc.z}
                      contents={disc.contents}
                    />
                  )
                } else if (disc.type === 'Cable') {
                  return (
                    <Cable
                      identifier={disc.identifier}
                      contentsForFrontInner={disc.contentsForFrontInner}
                      contentsForBottomInner={disc.contentsForBottomInner}
                      title={disc.title}
                      height={disc.height}
                      width={disc.width}
                      left={disc.left}
                      top={disc.top}
  //                    isReact={isReact(disc)}
                      doIt={disc.doIt}
                      isBottomOnly={disc.isBottomOnly}
                      z={disc.z}
                      bp={disc.bp}
                      ep={disc.ep}
                      ex1={disc.ex1}
                      allow={disc.allow}
                      transform={disc.transform}
                      leans={disc.leans}
                    />
                  )
                } else {
                  return createDisc(disc)
                }
              })
            })}
            { drawContentsForBack() }
          </div>
          <div
            ref={abdomen}
            className="abdomen"
            style={{
              height: `${props.height}px`,
              width: `${props.width}px`
            }}
          >
            <div>
            {
              props.discs?.map((line, i) => {
                return (
                  <div className="line">
                  {
                    line.map((v, j) => {
                      let l = buildL(v.contentsForBottomOuter)
                      return (
                        <div
                          className="form-L"
                        >
                          <div
                            className="dot"
                            style={{
                              transformStyle: 'preserve-3d',
                              top: v.top,
                              left: v.left,
                              width: `${100}px`,
                              transform: (!v.z) ? '' : `translateX(${v.z * 0.25}px) translateY(${ (v.z) / 100 * 8 }px)`,
                              display: 'flex',
                            }}
                          >
                            <div
                              className="representer"
                              onClick={(e) => { toggleStrap(`${v.identifier}-starp-${i}-${j}`); }}
                              dangerouslySetInnerHTML={{ __html: l.rep }}
                            >
                            </div>
                            <div
                              key={`${v.identifier}-${i}-${j}`}
                              id={`${v.identifier}-starp-${i}-${j}`}
                              className="shaft"
                              style={{
                                transform: 'rotateY(-90deg)'
                              }}
                            >
                              <div className="strap" style={{ width: `${l.width}px` }}>
                                <div dangerouslySetInnerHTML={{ __html: v.contentsForBottomOuter }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  </div>
                );
              })
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
