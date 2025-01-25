import React, { useRef, useEffect, useState } from 'react';
import Disc from './Disc';
import DiscFor from './DiscFor';
import MetalTape from './MetalTape';
import Magazine from './Magazine';
import Sail from './Sail';
import Cube from './Cube';
import Carousel from './Carousel';
import Cable from './Cable';
import Ms from '../atoms/Ms';
import Matrix from '../rz_uml/atoms/Matrix';
import Cluster from '../rz_uml/atoms/Cluster';

export default (props: { identifier: string, [key: string]: any }, ref) => {
  const base = useRef(null);
  const joint = useRef(null);
  const back = useRef(null);
  const abdomen = useRef(null);

  const [discs, setDiscs] = useState([]);
  const [vertical, setVertical] = useState(false);
//DEL  let { tense, setTense } = useState(false);
  let t = false;

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
      setVertical(true);
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
  }
  
  useEffect(() => {
    if (vertical) {
      back.current.style.zIndex = null;
    } else {
      back.current.style.zIndex = 1000;
    }
  }, [vertical]);

  return (
    <>
      <style>
      {
        `
          .back {
            background-color: rgba(255, 0, 0, 1.0),
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
            height: 0 + 'px',
            transform: 'rotateX(0deg)'
          }}
        >
          {/*
            backgroundColorはzIndexがnullでない場合のみ有効
          */}
          <div
            ref={back}
            style={{
              transformStyle: 'preserve-3d',
              border: 'solid 1px green',
              backgroundColor: 'rgba(255, 255, 255, 1.0)',
              position: 'absolute',

              width: props.width + 'px',
              height: props.height + 'px',
              top: 0 + 'px',
              left: 0 + 'px',
            }}
          >
            {props.discs?.map((line, index) => {
              return line.map((disc, index) => {
                if ('type' in disc === false || disc.type === 'Disc') {
                  console.log(disc);
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
                } else if (disc.type === 'DiscForReadyMade') {
                  let doms = [];
                  if (disc.subType === 'Ms') {
                    doms.push(<Ms {...disc.ms} />);
                  } else if (disc.subType === 'Matrix') {
                    doms.push(<Matrix {...disc.matrix} />);
                  } else if (disc.subType === 'Cluster') {
                    doms.push(<Cluster {...disc.cluster} />);
                  }
                  
                  return (
                    <DiscFor
                      identifier={disc.identifier}
                      contentsForFrontInner={disc.contentsForFrontInner}
                      contentsForBottomInner={disc.contentsForBottomInner}
                      title={disc.title}
                      height={disc.height}
                      width={disc.width}
                      left={disc.left}
                      top={disc.top}
                      isReact={false}
  //                    isReact={isReact(disc)}
                      doIt={disc.doIt}
                      isBottomOnly={disc.isBottomOnly}
                      z={disc.z}
                      rotateY={disc.rotateY}
                      duration={disc.duration}
                      views={disc.views}
                    >
                      {doms||props.children}
                    </DiscFor>
                  )
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
                  console.log('disc: ', disc);
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
                  return (
                    <div></div>
                  )
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
                      return (
                        <div
                          className="dot"
                          style={{
                            top: v.top,
                            left: v.left,
                            width: `${100}px`
                          }}
                          dangerouslySetInnerHTML={{ __html: v.contentsForBottomOuter }}
                        >
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
