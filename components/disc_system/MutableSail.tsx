import React, { useEffect, useRef, useState } from 'react';

export default (props) => {
  const refForMs = useRef();
  const [ooMutableSail, setOoMutableSail] = useState({
      current: {
          x: 100,
          y: 0
      },
      red: 0,
      center: 100,
      green: 200,
      rd: 250,
  });
  let current = {x: 100, y: 0};
  let rd = 250;
  let context = null;
  
  
  useEffect(() => {
//        context = document.getElementById('the-canvas').getContext('2d');
      context = refForMs.current.getContext('2d');
      drawBaselines({current: {x: 100, y: 0}, red: 0, center: props.center, green: props.green, rd: props.height });
      
      props.trajectory.map((v) => {
        drawMs({current: {x: v.x, y: v.y}, red: 0, center: props.center, green: props.green, rd: props.height })
      });
  }, []);
  
  const drawCursol = (lop) => {
    context.setLineDash([1, 0]);
    context.beginPath();
    context.strokeStyle = 'rgba(0, 0, 0, 1.0)';
    if (parseInt(lop.y) !== 0) {
        context.arc(parseInt(lop.x), parseInt(lop.y), 2, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    } else {
        context.arc(lop.x, 2, 2, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
    }
    
    context.closePath();
    context.stroke();
  };

  const drawBaselines = (lop) => {
    context.setLineDash([2, 2]);
    context.setLineDash([2, 2]);

    context.strokeStyle = 'rgba(255, 0, 0, 1.0)';
    context.beginPath();
    context.moveTo(lop.red, lop.current.y);
    context.lineTo(lop.red, lop.rd);
    context.stroke();
    context.closePath();

    context.strokeStyle = 'rgba(0, 255, 0, 1.0)';
    context.beginPath();
    context.moveTo(lop.green, lop.current.y);
    context.lineTo(lop.green, lop.rd);
    context.stroke();
    context.closePath();
    
    context.strokeStyle = 'rgba(0, 0, 0, 1.0)';
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(lop.green, 0);
    context.stroke();
    context.closePath();

    context.strokeStyle = 'rgba(0, 0, 0, 1.0)';
    context.beginPath();
    context.moveTo(lop.center, lop.current.y);
    context.lineTo(lop.center, lop.rd);
    context.stroke();
    context.closePath();

    context.strokeStyle = 'rgba(0, 0, 0, 1.0)';
    context.beginPath();
    context.moveTo(0, lop.rd);
    context.lineTo(lop.green, lop.rd);
    context.stroke();
    context.closePath();
  };
  
  const drawMs = (lop) => {
    drawCursol(lop.current);

    context.setLineDash([1, 0]);
    context.strokeStyle = 'rgba(255, 0, 0, 1.0)';
    context.fillStyle = 'rgba(255, 0, 0, 1.0)';
    context.beginPath();
    context.moveTo(lop.current.x, lop.current.y);
    context.lineTo(lop.red, lop.rd);
//        context.lineTo(lop.current.x, lop.rd);
    context.stroke();
    context.closePath();

    context.strokeStyle = 'rgba(0, 255, 0, 1.0)';
    context.fillStyle = 'rgba(0, 255, 0, 1.0)';
    context.beginPath();
    context.moveTo(lop.current.x, lop.current.y);
    context.lineTo(lop.green, lop.rd);
//        context.lineTo(lop.current.x, lop.rd);
    context.stroke();
    context.closePath();
    
    context.strokeStyle = 'rgba(255, 255, 0, 1.0)';
    context.fillStyle = 'rgba(0, 255, 0, 1.0)';
    context.beginPath();
    context.moveTo(lop.current.x, lop.current.y);
    context.lineTo(lop.current.x, lop.rd);
    context.stroke();
    context.closePath();
  };
  
  const handleApply = (e) => {
//        context.clearRect(0, 0, refForMs.current.width, refForMs.current.height);

    ooMutableSail.current.x = current.x;
    ooMutableSail.current.y = current.y;
    ooMutableSail.rd = rd;
    setOoMutableSail(ooMutableSail);
    drawMs(ooMutableSail);
    drawCursol({x: 200, y: 200});
  };
  return (
    <div style={{ top: props.top, left: props.left, width: props.width, height: props.height, position: 'absolute' }}>
        <canvas id='the-canvas' width={ props.width } height={ props.height } ref={ refForMs }>
        </canvas>
    </div>
  );
}