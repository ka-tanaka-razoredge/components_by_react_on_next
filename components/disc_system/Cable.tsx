import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

class Vector {
  x: float;
  y: float;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default (props: { identifier: string, bp: Vector, ep: Vector, ex1: Vector, ex2: Vector, allow: { top: Vector, l: Vector, r: Vector } }, ref) => {
  const base = useRef(null);
  const canvas = useRef();
  let context;

  useEffect(() => {
    context = canvas.current.getContext('2d');
    context.clearRect(0, 0, props.width, props.height);
    context.beginPath();
    context.moveTo(props.bp.x, props.bp.y);
//    context.moveTo(props.bp.x, props.bp.y);
    context.quadraticCurveTo(props.ex1.x, props.ex1.y, props.ep.x, props.ep.y);
    context.stroke();
    context.closePath();
    
    context.beginPath();
//    context.translate(props.width / 2, props.height / 2);
//    context.rotate((90 * Math.PI) / 180);
    context.moveTo(props.allow.top.x, props.allow.top.y);
//    context.moveTo(props.bp.x, props.bp.y);
    context.lineTo(props.allow.l.x, props.allow.l.y);
    context.moveTo(props.allow.top.x, props.allow.top.y);
    context.lineTo(props.allow.r.x, props.allow.r.y);
    context.lineTo(props.allow.l.x, props.allow.l.y);
    context.fill();
    context.closePath();
    
    base.current.addEventListener('moveX', e => {
      moveX(e.detail.value);
    });
    base.current.addEventListener('moveY', e => {
      moveY(e.detail.value);
    });
    base.current.addEventListener('moveZ', e => {
      moveY(e.detail.value);
    });

    if (props.isBottomOnly) {
      base.current.style.border = null;
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

  const drawBottom = () => {
    if (!props.isBottomOnly) {
    } else {
    }
  };

  const drawBottomInner = () => {
    if (!props.contentsForBottomInner) {
      return '　';
      //      return props.contentsForFrontInner;
    } else {
      return props.contentsForBottomInner;
    }
  };

  const drawFront = () => {
    console.log('---- drawFront begin ----');
    if (context) {
      console.log(context);
      context.clearRect(0, 0, props.width, props.height);
      context.beginPath();
      context.moveTo(0, 0);
      context.quadraticCurveTo(0, 100, 100, 100);
      context.stroke();
      context.closePath();
    }
      console.log('---- drawFront end ----');

    const buildTransform = () => {
      let reply = 'rotateX(-90deg) translateY(-25px) translateZ(-50px)';
      if (props.height && props.width) {
        if (props.width === 400 && props.height === 225) reply = 'rotateX(-90deg) translateX(20px) translateY(-100px) translateZ(-160px)';
      }
      return reply;
    };

    if (!props.isBottomOnly) {
      let t = 'title' in props ? props.title : '';
      if (('isReact' in props == false) || props?.isReact === false) {
        return (
          <div
            style={{
              border: 'solid 1px lime',
              width: (props.width) ? props.width + 'px' : 100 + 'px',
              height: (props.height) ? props.height + 'px' : 50 + 'px',
              transform: 'rotateX(180deg)'
            }}
            dangerouslySetInnerHTML={{ __html: props.contentsForFrontInner }}
            title={t}
          />
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
  
  return (
    <div
      ref={base}
      id={props.identifier}
      style={{
        transformStyle: 'preserve-3d',
        border: '1px solid orange',
        height: 10 + 'px',
        width: (props.width) ? props.width + 'px' : 100 + 'px',
        top: props.top + 'px',
        left: props.left + 'px',
        position: 'absolute',
        transform: (props.z) ? `translateZ(${props.z}px)` : ''
      }}
    >
      {drawBottomInner()}
      <div
        style={{
          position: 'absolute',
          width: (props.width) ? props.width + 'px' : 100 + 'px',
          top: '0px',
          height: '1px',
          transform: 'rotateX(90deg)'
        }}>
        <canvas ref={canvas} width={props.width + 'px'} height={props.height + 'px'} />
      </div>
    </div>
  );
};
