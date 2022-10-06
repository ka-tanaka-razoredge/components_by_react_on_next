import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';

import Disc from './Disc';
import MetalTape from './MetalTape';
import Magazine from './Magazine';
//import MagazineB from './Magazine_b';
import Sail from './Sail';
//import Cube from './Cube';
import Timecode from './Timecode';


export default React.forwardRef((props: { identifier: string }, ref) => {
  //const base = useRef(null);
  const [initialized, setInitialized] = useState(false);
  const [discs, setDiscs] = useState([]);
  const discsRef = useRef(discs);
  const loRef = [];
  const setDiscEx = (discs) => {
    discsRef.current = discs;
    setDiscs(discs);
  };
  const [context, setContext] = useState(null);

  // useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    if (initialized === false) {
      // TODO: removeEventListener
      ref.current.addEventListener('pushDisc', (e) => {
        pushDisc(e.detail);
        console.log(e.detail);

        context.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        context.beginPath();
        context.moveTo(e.detail.left, 0);
        context.lineTo(e.detail.left, 800);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.moveTo(e.detail.left + e.detail.width, 0);
        context.lineTo(e.detail.left + e.detail.width, 800);
        context.stroke();
        context.closePath();
      });

      ref.current.addEventListener('forwardCurrentIndex', (e) => {
        forwardCurrentIndex(e.detail);
      });

      ref.current.addEventListener('moveY', (e) => {
        return moveY(e.detail);
      });

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
    }
    //    ref.current.style.tranform = 'rotateY(45deg) rotateX(45deg)';
  }, []);

  const pushDisc = (lop = { identifier }) => {
    console.log('---- pushDisc ----');
    setDiscEx(discsRef.current.concat(lop));
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
    return discsRef.current.find((disc) => disc.identifier === lop.identifier);
  };

  const forwardCurrentIndex = (lop) => {
    loRef[0].current.forwardCurrentIndex(lop.value);
  };

  for (let i = 0; i <= 100 - 1; i++) {
    loRef.push(useRef(null));
  }

  return (
    <div
      ref={ref}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1600 + 'px',
        border: '1px solid red',
        width: 800 + 'px',
        height: 450 + 'px',
        position: 'relative',
        left: 50 + 'px',
        transform: 'rotateY(40deg) rotateX(60deg)',
      }}
    >
      <canvas id="tank-canvas" width={800} height={400}></canvas>
      {discsRef.current.map((disc: { identifier }, index) => {
        if (discsRef.current.indexOf(disc.identifier) == -1) {
          if ('type' in disc === false || disc.type === 'Disc') {
            return (
              <Disc
                identifier={disc.identifier}
                contentsForFrontInner={disc.contentsForFrontInner}
                contentsForBottomInner={disc.contentsForBottomInner}
                title={disc.title}
                height={disc.height}
                width={disc.width}
              />
            );
          } else if (disc.type === 'Sail') {
            return (
              <Sail
                identifier={disc.identifier}
                contentsForFrontInner={disc.contentsForFrontInner}
                title={disc.title}
                top={disc.top}
                left={disc.left}
                height={disc.height}
                width={disc.width}
              />
            );
          } else if (disc.type === 'Cube') {
            return (
              <div></div>
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
  );
});
