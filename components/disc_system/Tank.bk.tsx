// @ts-nocheck

import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';

import Disc from './Disc';
import MetalTape from './MetalTape';
import Magazine from './Magazine';
//import MagazineB from './Magazine_b';
import Sail from './Sail';
import Cube from './Cube';
import Timecode from './Timecode';
import DiscForDcoml from './DiscForDcoml';
import MutableSail from './MutableSail';
import Cable from './Cable';
import Carousel from './Carousel';


export default React.forwardRef((props: { identifier: string, [key: string]: any }, ref) => {
  //const base = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [discs, setDiscs] = useState([]);
  const loRef = [];
  const [context, setContext] = useState(null);
  let width = (props?.width) ? props.width : 800;
  let height = (props?.height) ? props.height : 400;
  let left = (props?.left) ? props.left : 50;

  // useImperativeHandle(ref, () => ({}));
  
  useEffect(() => {
    if ('discs' in props && 1 <= props.discs.length) setDiscs(props.discs);

    // TODO: removeEventListener
    ref.current.addEventListener('pushDisc', (e) => {
      pushDisc(e.detail);
      console.log(e.detail);

      context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      context.beginPath();
      context.moveTo(e.detail.left, 0);
      context.lineTo(e.detail.left, width);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.moveTo(e.detail.left + e.detail.width, 0);
      context.lineTo(e.detail.left + e.detail.width, width);
      context.stroke();
      context.closePath();
    });

    ref.current.addEventListener('forwardCurrentIndex', (e) => {
      forwardCurrentIndex(e.detail);
    });

    ref.current.addEventListener('moveY', (e) => {
      return moveY(e.detail);
    });
    //--------------------------------------------------------------------------------
    // begin ooRef provider only
    //--------------------------------------------------------------------------------
    ref.current.getDiscs = () => {
      return discs;
    };
    
    ref.current.setDisc = (value) => {
    };
    
    ref.current.clearAllDiscs = () => {
      setDiscs([]);
    };
    
    ref.current.setAllDiscs = (lop) => {
      console.log(JSON.parse(lop.value, null, 2));
      setDiscs(JSON.parse(lop.value));
    };
    
    ref.current.removeDisc = (identifier) => {
      const discsToSet = discs.filter((v) => { if (v.identifier !== identifier) { return v; } });
      setDiscs(discsToSet);
    };
    
    ref.current.quadraticCurveTo = (lop: { beginVector: Vector, imaginaryVectorFirst: Vector, endVector: Vector }) => {
      console.log('---- quadraticCurveTo begin ----');
      let context = document.getElementById('fore-canvas').getContext('2d');
      console.log(context);
      try {
        context.beginPath();
        context.moveTo(lop.beginVector.x, lop.beginVector.y);
        context.quadraticCurveTo(lop.imaginaryVectorFirst.x, lop.imaginaryVectorFirst.y, lop.endVector.x, lop.endVector.y);
        context.stroke();
      } catch (e) {
      } finally {
        console.log('---- quadraticCurveTo end ----');
      }
    };
    
    ref.current.drawText = (lop) => {
      let context = document.getElementById('fore-canvas').getContext('2d');
      context.fillText(lop.text, lop.x, lop.y);
    };

    ref.current.drawFilledTriangle= (lop: { top: Vector, left: Vector, right: Vector }) => {
      let context = document.getElementById('fore-canvas').getContext('2d');
      context.beginPath();
      context.moveTo(lop.top.x, lop.top.y);
      context.lineTo(lop.left.x, lop.left.y);
      context.lineTo(lop.right.x, lop.right.y);
      context.lineTo(lop.top.x, lop.y);
      context.fill();
    };
    
    //--------------------------------------------------------------------------------
    // end
    //--------------------------------------------------------------------------------

    const canvas = document.getElementById('tank-canvas');
    console.log('---- useEffect ----');
    console.log(canvas);
    const context = canvas.getContext('2d');
    console.log(context);
    context.beginPath();
    context.moveTo(10, 10);
    context.lineTo(10, 100);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(5, 90);
    context.lineTo(10, 100);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(15, 90);
    context.lineTo(10, 100);
    context.stroke();
    context.closePath();
    context.fillText('t', 15, 15);
    setContext(context);
//    ref.current.style.tranform = 'rotateY(45deg) rotateX(45deg)';
  }, []);

  const pushDisc = (lop = { identifier }) => {
    setDiscs(discs.concat(lop));
    setTimeout(() => {
      document.getElementById(lop.identifier).dispatchEvent(
        new CustomEvent('moveX', {
          detail: {
            value: lop.left,
          },
        })
      );
      document.getElementById(lop.identifier).dispatchEvent(
        new CustomEvent('moveY', {
          detail: {
            value: lop.top,
          },
        })
      );

      if ('z' in lop) {
        document.getElementById(lop.identifier).dispatchEvent(
          new CustomEvent('moveZ', {
            detail: {
              value: lop.z,
            },
          })
        );
      }
    }, 1);
  };

  const moveY = (lop) => {
    console.log('---- moveY ----');
    const disc = document.getElementById(lop.identifier);
    //    const disc = giveDisc({ identifier: lop.identifier });
    disc.dispatchEvent(
      new CustomEvent('moveY', {
        detail: {
          value: lop.value,
        },
      })
    );
  };

  const giveDisc = (lop) => {
    console.log('---- giveDisc ----');
    return discs.find((disc) => disc.identifier === lop.identifier);
  };
  
  const isReact = (disc) => {
    return (disc?.isReact) ? disc.isReact : false;
  }

  const forwardCurrentIndex = (lop) => {
    loRef[0].current.forwardCurrentIndex(lop.value);
  };

  for (let i = 0; i <= 100 - 1; i++) {
    loRef.push(useRef(null));
  }

  return (
    <div style={{ position: 'relative' }}>
      {
        props.foreCanvas && (<div style={{ position: 'absolute', backgroundColor: 'rgba(200, 200, 200, 0.1)', width: '50vw', height: '100vh', zIndex: 1000, left: 0, top: 0 }}>
          <canvas id='fore-canvas' width={width} height={height}></canvas>
        </div>)
      }
      <div
        ref={ref}
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1600 + 'px',
          border: '1px solid red',
          width: width + 'px',
          height: height + 'px',
          position: 'relative',
          left: left + 'px',
          transform: 'rotateY(40deg) rotateX(60deg)',
        }}
      >
        <canvas id="tank-canvas" width={width} height={height}></canvas>
        {discs.map((disc: { identifier }, index) => {
          if (discs.indexOf(disc.identifier) == -1) {
            if ('type' in disc === false || disc.type === 'Disc') {
              return (
                <Disc
                  identifier={disc.identifier}
                  contentsForFrontInner={disc.contentsForFrontInner}
                  contentsForBottomInner={disc.contentsForBottomInner}
                  title={disc.title}
                  height={disc.height}
                  width={disc.width}
                  left={disc.left}
                  top={disc.top}
                  isReact={isReact(disc)}
                  doIt={disc.doIt}
                  isBottomOnly={disc.isBottomOnly}
                  z={disc.z}
                />
              );
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
                  isReact={isReact(disc)}
                  doIt={disc.doIt}
                  isBottomOnly={disc.isBottomOnly}
                  z={disc.z}
                  bp={disc.bp}
                  ep={disc.ep}
                  ex1={disc.ex1}
                  allow={disc.allow}
                />
              );
            } else if (disc.type === 'Sail') {
              return (
                <Sail
                  key={disc.identifier}
                  identifier={disc.identifier}
                  contentsForFrontInner={disc.contentsForFrontInner}
                  title={disc.title}
                  top={disc.top}
                  left={disc.left}
                  height={disc.height}
                  width={disc.width}
                  z={disc.z}
                  transform={disc.transform}
                />
              );
            } else if (disc.type === 'Cube') {
              return (
                <Cube
                  identifier={disc.identifier}
                  //                contentsForFrontInner={disc.contentsForFrontInner}
                  //                title={disc.title}
                  top={disc.top}
                  left={disc.left}
                  z={disc.z}
                />
              );
            } else if (disc.type === 'MetalTape') {
              return (
                <MetalTape
                  identifier={disc.identifier}
                  contentsForFrontInner={disc.contentsForFrontInner}
                  top={disc.top}
                  left={disc.left}
                  height={disc.height}
                />
              );
            } else if (disc.type === 'Timecode') {
              return (
                <Timecode
                  identifier={disc.identifier}
                  contentsForBottomInner={disc.contentsForBottomInner}
                  top={disc.top}
                  left={disc.left}
                  height={disc.height}
                />
              );
            } else if (disc.type === 'DiscForDcoml') {
              return (
                <DiscForDcoml
                  identifier={disc.identifier}
                  height={disc.height}
                  width={disc.width}
                  left={disc.left}
                  top={disc.top}
                  dcoml={disc.dcoml}
                />
              )
            } else if (disc.type === 'MutableSail') {
              return (
                <MutableSail
                  identifier={disc.identifier}
                  height={disc.height}
                  width={disc.width}
                  left={disc.left}
                  top={disc.top}
                  trajectory={disc.trajectory}
                  center={disc.center}
                  red={disc.red}
                  green={disc.green}
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
                  isReact={isReact(disc)}
                  doIt={disc.doIt}
                  isBottomOnly={disc.isBottomOnly}
                  z={disc.z}
                  contents={disc.contents}
                />
              )
            } else {
              return (
                <Magazine
                  ref={loRef[index]}
                  identifier={disc.identifier}
                  contentsForFrontInner={disc.contentsForFrontInner}
                  contentsForBottomInner={disc.contentsForBottomInner}
                  discs={disc.discs}
                  top={disc.top}
                  left={disc.left}
                  height={disc.height}
                  width={disc.width}
                />
              );
            }
          }
        })}
      </div>
    </div>
  );
});
