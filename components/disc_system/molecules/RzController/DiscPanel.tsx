/**
 * cf. components/atoms/ToolBox
 */
import React, { useEffect, useRef } from 'react';

export default ({
  id = '',
}) => {
  const base = useRef();
  useEffect(() => {
    base.current.addEventListener('done mouseover', () => {
      base.current.style.visibility = 'visible';
    });
  }, []);
  
  const onCloseButton = (e) => {
    base.current.style.visibility = 'collapse';
  };
  
  const copyToClipBoard = async (what) => {
    if ((typeof window !== "undefined" && window.navigator && window.navigator.clipboard) === false) return;

    let value;
    switch (what) {
      case 'iceFire':
        value = `<svg viewBox='0 0 24 24' style='width:1.5rem;height:1.5rem' role='presentation'><path d='M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z' style='fill:blue'>`;
        break;
      case 'disc':
        value = JSON.stringify({
          type: 'Disc',
          identifier: 'id-',
          left: 0,
          top: 0,
          contentsForFrontInner: '',
        }, null, '\t');
        break;
      case 'ofar':
        value = JSON.stringify([
          {
            type: 'Magazine',
            identifier: 'id-',
            left: 0,
            top: 0,
            width: 20 + 20 + (100 * 3),
            height: 400,
            views: ['vertical'],
            contentsForBottomInner: `luBottle_1`,
            discs: [
              [
                {
                  type: `Disc`,
                  identifier: `id-`,
                  top: 0,
                  contentsForBottomOuter: `<div style='white-space: nowrap;'>標的</div>`,
                }
              ]
            ]
          },
          {
            type: 'Magazine',
            identifier: 'id-',
            left: 20 + 20 + (100 * 3) + 20,
            top: 0,
            width: 20 + 20 + (100 * 3),
            height: 400,
            views: ['vertical'],
            contentsForBottomInner: ``,
            discs: [
              [
                {
                  type: `Disc`,
                  identifier: `id-`,
                  top: 0,
                  contentsForBottomOuter: `<div style='white-space: nowrap;'>『簀巻きにする, フクロ』</div>`,
                }
              ]
            ]
          },
        ], null, '\t');
        break;
      case 'matrix':
        value = JSON.stringify({
          type: "DiscForReadyMade",
          top: 0,
          subType: "Matrix",
          views: { frontInner: true },
          matrix: {
            subjects: [ "一知", "全知" ],
            topic: "object",
            replies: [ "賞", "罰" ]
          }
        }, null, '\t');
        break;
      case 'magazine':
        value = JSON.stringify({
          type: "Magazine",
          top: 0,
          height: 400,
          width: 800,
          views: ['vertical'],
          discs: [
            [
              {
                type: 'Disc',
                identifier: 'id-disc-on-magazine-',
                left: 0,
                top: 0,
                contentsForFrontInner: '',
              },
              {
                type: 'Disc',
                identifier: 'id-disc-on-magazine-marble',
                left: 780,
                top: 380,
                contentsForFrontInner: '',
                contentsForBottomOuter: 'marble',
              }
            ]
          ]
        }, null, '\t');
        break;
      case 'ms':
        value = JSON.stringify({
          type: "Disc",
          left: 60,
          top: 0,
          z: 0,
          duration: 1,
          transform: "rotateZ(90deg) translateX(50px)",
          contentsForFrontInner: [
            "<div>",
            "  <div style='display: flex;'>",
            "    <div style='display: flex; height: 8px; width: 100px;'>",
            "      <div style='position: absolute; line-height: 0; top: 0; right: 1px; border: 1px solid lime; lime; width: 8px; height: 8px;'></div>",
            "    </div>",
            "  </div>",
            "  <div style='display: flex;'>",
            "    <div style='height: 1px; width: 100px; background-color: lime;'></div>",
            "  </div>",
            "  <div style='display: flex;'>",
            "    <div style='position: relative; height: 28px; width: 100px;'>",
            "      <div style='position: absolute; line-height: 0; top: 20px; left: 0; border: 1px solid black; width: 8px; height: 8px;'></div>",
            "      <div style='position: absolute; line-height: 0; top: 16px; left: 8px; border: 1px solid black; width: 8px; height: 8px;'></div>",
            "      <div style='position: absolute; line-height: 0; top: 12px; left: 16px; border: 1px solid black; width: 8px; height: 8px;'></div>",
            "      <div style='position: absolute; line-height: 0; top: 8px; left: 24px; border: 1px solid black; width: 8px; height: 8px;'></div>",
            "      <div style='position: absolute; line-height: 0; top: 8px; left: 32px; border: 1px solid black; width: 8px; height: 8px;'></div>",
            "      <div style='position: absolute; line-height: 0; top: 8px; left: 40px; border: 1px solid black; width: 8px; height: 8px;'></div>",
            "      <div style='position: absolute; line-height: 0; top: 8px; left: 48px; border: 1px solid black; width: 8px; height: 8px;'></div>",
            "      <div style='position: absolute; line-height: 0; top: 8px; left: 56px; border: 1px solid black; width: 8px; height: 8px;'></div>",
            "      <div style='position: absolute; line-height: 0; top: 8px; left: 62px; border: 1px solid black; width: 8px; height: 8px;'></div>",
            "      <div style='position: absolute; line-height: 0; top: 4px; left: 70px; border: 1px solid black; width: 8px; height: 8px;'></div>",
            "      <div style='position: absolute; line-height: 0; top: px; left: 78px; border: 1px solid black; width: 8px; height: 8px;'></div>",
            "    </div>",
            "  </div>",
            "  <div style='display: flex;'>",
            "    <div style='height: 1px; width: 100px; background-color: red;'></div>",
            "  </div>",
            "  <div style='display: flex;'>",
            "    <div style='position: relative; display: flex; height: 8px; width: 100px;'>",
            "      <div id='red' style='position: absolute; line-height: 0p; top: 1px; right: 1px; width: 8px; height: 8px; border: 1px solid red;'></div>",
            "    </div>",
            "  </div>",
            "</div>"
          ]
        }, null, '\t');
        break;
    }
    await global.navigator.clipboard.writeText(value);
  }
  
  return (
    <>
      <style>
      {
        `
          .ground {
            position: relative;
            z-index: 1100;
            visibility: collapse;
            border: 1px solid black;
            top: ${-100}px;
            left: ${0}px;
            
            background-color: rgba(200, 200, 200, 1.0);
            
            height: 100px;
            width: 500px;
          }

          .listview {
            display: flex;
            gap: 4px;
          }

          .button-for-discs {
            border: 1px solid black;
            background-color: white;
          }
        `
      }
      </style>
      <div ref={base} id={id} className="ground">
        <div onClick={onCloseButton}>✕</div>
        <div className="listview">
          <div className="button-for-discs" onClick={() => { copyToClipBoard('ofar'); }}>
            Ofar
          </div>
          <div className="button-for-discs" onClick={() => { copyToClipBoard('disc'); }}>
            Disc
          </div>
          <div className="button-for-discs" onClick={() => { copyToClipBoard('matrix'); }}>
            Matrix
          </div>
          <div className="button-for-discs" onClick={() => { copyToClipBoard('iceFire'); }}>
            Sail
          </div>
          <div className="button-for-discs" onClick={() => { copyToClipBoard('magazine'); }}>
            Magazine
          </div>
          <div className="button-for-discs" onClick={() => { copyToClipBoard('iceFire'); }}>
            <div dangerouslySetInnerHTML={{ __html: `<svg viewBox='0 0 24 24' style='width:1.5rem;height:1.5rem' role='presentation'><path d='M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2M14.5 17.5C14.22 17.74 13.76 18 13.4 18.1C12.28 18.5 11.16 17.94 10.5 17.28C11.69 17 12.4 16.12 12.61 15.23C12.78 14.43 12.46 13.77 12.33 13C12.21 12.26 12.23 11.63 12.5 10.94C12.69 11.32 12.89 11.7 13.13 12C13.9 13 15.11 13.44 15.37 14.8C15.41 14.94 15.43 15.08 15.43 15.23C15.46 16.05 15.1 16.95 14.5 17.5H14.5Z' style='fill:blue'>`}} />
          </div>
        </div>
      </div>
    </>
  );
};
