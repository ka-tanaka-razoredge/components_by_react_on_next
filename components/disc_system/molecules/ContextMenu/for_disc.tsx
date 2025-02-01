/**
 * useImperativeHandleを用いている: forwardRef で受け取った ref は useImperativeHandle で定義したオブジェクト に置き換えられる
 */
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import useLongTap from '@/hooks/disc_system/long_tap';

export default forwardRef((props, ref) => {
  const contextMenu = useRef();
  useImperativeHandle(ref, () => {
    return {
      show: () => {
        contextMenu.current.style.visibility = 'visible';
      }
    };
  });

  const closeContextMenu = () => {
    contextMenu.current.style.visibility = 'collapse';
  };

  const toggleDisc = () => {
    if (props.frontInner.current.style.width !== '500px') {
//    if (frontInner.current.style.width.parseInt() === props.width.parseInt()) {
      props.frontInner.current.style.width = `${500}px`;
    } else {
      props.frontInner.current.style.width = `${props.width || 100}px`;
    }
  }

  return (
    <>
      <style>
      {
        `
          .context-menu {
            display: flex;
            visibility: collapse;
            background-color: rgba(255, 255, 255, 0.9);
            transform: rotateX(-90deg) translateY(-70px) translateX(-20px);
            
            height: 16px;
            width: 100px;

            .close-box {
              border: 1px solid rgba(0, 0, 0, 1.0);
            }
          }
        `
      }
      </style>
      <div
        ref={contextMenu}
        className="context-menu"
      >
        <div className="close-box">&#x21A9;&#xFE0F;</div>
        <div className="close-box" onClick={toggleDisc}>＞</div>
        <div className="close-box" onClick={closeContextMenu}>✕</div>
      </div>
    </>
  );
});