import React, { useRef, useEffect } from 'react';

export default (props: { identifier: string }, ref) => {
  const base = useRef(null);

  useEffect(() => {
    base.current.addEventListener('moveX', e => {
      moveX(e.detail.value);
    });
    base.current.addEventListener('moveY', e => {
      moveY(e.detail.value);
    });
  });

  const moveX = value => {
    base.current.style.left = value + 'px';
  };
  const moveY = value => {
    base.current.style.top = value + 'px';
  };

  return (
    <div
      ref={base}
      id={props.identifier}
      style={{
        transformStyle: 'preserve-3d',
        backgroundColor: 'orange',
        height: props.height + 'px',
        width: 2 + 'px',
        top: props.top + 'px',
        left: props.left + 'px',
        position: 'absolute'
      }}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          border: 'solid 1px lime',
          position: 'absolute',
          width: 100 + 'px',
          height: 50 + 'px',
          top: props.height,
          transform:
            'translateY(-20px) rotateX(-90deg) translateY(-30px) translateX(-5px)'
        }}
      >
        <div
          dangerouslySetInnerHTML={{ __html: props.contentsForFrontInner }}
        />
      </div>
    </div>
  );
};
