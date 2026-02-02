// @ts-nocheck

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

class Vector {
  x: Number;
  y: Number;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default (props, ref) => {
  const base = useRef(null);
  const frontInner = useRef(null);
  const canvas = useRef();
  let context;
  
  const { 'isBottomVisible': isBottomVisible = false } = props;
  
  const calcDiagonalAndAngle = (w, h) => {
    const diagonal = Math.sqrt(w * w + h * h);      // 対角線の長さ
    const radian = Math.atan(h / w);                // ラジアンで角度
    const degree = radian * (180 / Math.PI);         // 度に変換
    return { diagonal, degree };
  };
  
  const calcVector = (source, degree) => {
    const radians = ((90 - degree) * Math.PI) / 180; // 度をラジアンに変換
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
  
    const x = source.x * cos - source.y * sin;
    const y = source.x * sin + source.y * cos;
  
    return { x, y };
  };

  function rotateAroundT(t, l, r, angle) {
    // t を原点にして l と r を回転させる
    const lRel = { x: l.x - t.x, y: l.y - t.y };
    const rRel = { x: r.x - t.x, y: r.y - t.y };
  
    // l と r を回転
    const lRot = calcVector(lRel, angle);
    const rRot = calcVector(rRel, angle);
  
    // 回転後, t を加えて元の座標に戻す
    const lNew = { x: lRot.x + t.x, y: lRot.y + t.y };
    const rNew = { x: rRot.x + t.x, y: rRot.y + t.y };
  
    return {l: lNew, r: rNew};
  };

  const buildTransform = () => {
//    console.log('---- buildTransform begin ----');
    let reply = '';
    if (props.z) reply += `translateZ(${props.z}px) `;
    if (props.rotateY) reply += `rotateZ(${props.rotateY}deg) `;
    if (props.transform) reply += `${props.transform}`;
//console.log(reply);
    return reply;
  };

  useEffect(() => {
    context = canvas.current.getContext('2d');
    context.clearRect(0, 0, props.width, props.height);


    let bp, ep, ex1: Vector;
    let allow: { top: Vector, l: Vector, r: Vector }; 

    switch (props.subType) {
      case 'gliss.':
        const diagonalAndDegree = calcDiagonalAndAngle(props.width, props.height);

        bp = { x: 0, y: props.height };
        ep = { x: props.width, y: 0 };
        ex1 = { x: bp.x, y: bp.y };
        
        const memento = rotateAroundT({ x: 0, y: props.height }, { x: -3, y: props.height - 10 }, { x: 3, y: props.height - 10 }, diagonalAndDegree.degree);

        allow = {
          top: {
            x: 0,
            y: props.height
          },
          l: {
            ...memento.l
          },
          r: {
            ...memento.r
          }
        }
        
        context.beginPath();
        context.arc(bp.x, bp.y, 2, 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.closePath();
        context.fill();

        context.setLineDash([2, 2]);
        context.beginPath();
        context.moveTo(bp.x, bp.y);
        
        context.quadraticCurveTo(ex1.x, ex1.y, ep.x, ep.y);
        context.stroke();
        context.closePath();
        context.setLineDash([]);
        
        context.beginPath();
        context.arc(allow.top.x, allow.top.y, 4, 0, 4 * Math.PI);
        context.fillStyle = 'red';
        context.closePath();
        context.fill();

        context.beginPath();
        context.moveTo(allow.top.x, allow.top.y);
        context.lineTo(allow.l.x, allow.l.y);
        
        context.moveTo(allow.top.x, allow.top.y);
        context.lineTo(allow.r.x, allow.r.y);
//        context.lineTo(allow.l.x, allow.l.y);
        
        context.fillStyle = 'rgb(255, 255, 255)';
        context.fill();
        context.stroke();
        context.closePath();
        
        if (!isBottomVisible) {
          base.current.style.border = null;
        }
        frontInner.current.style.transform = ``;
        break;
      default:
console.log(isBottomVisible);
context.beginPath();
context.arc(props.bp.x, props.bp.y, 2, 0, 2 * Math.PI);
context.fillStyle = 'red';
context.closePath();
context.fill();
    
    // TODO: props.isLineDash
    context.setLineDash([2, 2]);
    context.beginPath();
    context.moveTo(props.bp.x, props.bp.y);
//    context.moveTo(props.bp.x, props.bp.y);

    if (props.ex1) {
      context.quadraticCurveTo(props.ex1.x, props.ex1.y, props.ep.x, props.ep.y);
    } else {
      context.quadraticCurveTo(props.ep.x, props.ep.y, props.ep.x, props.ep.y);
    }
    context.stroke();
    context.closePath();
    context.setLineDash([]);
    
    context.beginPath();
//    context.translate(props.width / 2, props.height / 2);
//    context.rotate((90 * Math.PI) / 180);
    context.moveTo(props.allow.top.x, props.allow.top.y);
//    context.moveTo(props.bp.x, props.bp.y);
    context.lineTo(props.allow.l.x, props.allow.l.y);
    context.moveTo(props.allow.top.x, props.allow.top.y);
    context.lineTo(props.allow.r.x, props.allow.r.y);
    context.lineTo(props.allow.l.x, props.allow.l.y);
    // TODO: props.allow.fillStyle
    context.fillStyle = 'rgb(255, 255, 255)';
    context.fill();
    context.stroke();
    context.closePath();
    
    if (!isBottomVisible) {
      base.current.style.border = null;
    }
    
    if (props.leans) {
      frontInner.current.style.transform += `${props.leans} translateY(-100px)`;
    }
    
      break;
    }
    
    base.current.addEventListener('moveX', e => {
      moveX(e.detail.value);
    });
    base.current.addEventListener('moveY', e => {
      moveY(e.detail.value);
    });
    base.current.addEventListener('moveZ', e => {
      moveY(e.detail.value);
    });
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

    if (isBottomVisible) {
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
        height: `${10}px`,
        width: (props.width) ? `${props.width}px` : `${100}px`,
        top: `${props.top}px`,
        left: `${props.left}px`,
        position: 'absolute',
        transform: buildTransform()
      }}
    >
      {drawBottomInner()}
      <div
        ref={frontInner}
        style={{
//border: '1px solid green',
          position: 'absolute',
          width: (props.width) ? `${props.width}px` : `${100}px`,
          top: `${0}px`,
          height: `${1}px`,
          transform: 'rotateX(90deg)'
        }}>
        <canvas ref={canvas} /* style={{ border: '1px solid black' }} */ width={`${props.width}px`} height={`${props.height}px`} />
      </div>
    </div>
  );
};
