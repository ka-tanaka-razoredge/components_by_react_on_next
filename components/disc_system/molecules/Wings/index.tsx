import React from 'react';
import Disc from '../../Disc';
import Cable from '../../Cable';
import Magazine from '../../Magazine';

// TODO: import Vector
class Vector {
  x: number;
  y: number;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export default ({
  identifier = '',
  top = 0,
  left = -100,
  width = 100,
  duration = 100,
  lw = `leftWing`,
  rw = `rightWing`,
}) => {
  
  return (
    <>
      <Magazine
        identifier={identifier}
        top={top}
        left={left}
        height={duration}
        width={width}
        discs={
          [
            [
              {
                type: "Disc",
                contentsForFrontInner: `${lw}`,
              },
              {
                type: 'Cable',
                identifier: 'id-00000101',
                top: 0,
                left: 0,
                bp: new Vector(width, width),
                ep: new Vector(10, 20),
                ex1: new Vector(width, width),
                allow: {
                  top: new Vector(0 + 10, 0 + 20),
                  l: new Vector(0 + 10, 10 + 20),
                  r: new Vector(10 + 10, 5 + 20),
                },
                isBottomOnly: true,
                contentsForBottomInner: ``,
                leans: `rotateX(90deg)`,
                transform: ``,
              },
/*              
              {
                type: 'Disc',
                isBottomOnly: true,
                identifier: 'id-00000700',
                top: 0, left: 0, width: width, height: duration,
                rows: Math.ceil(duration / 10) - 2,
                columns: Math.ceil(width / 10),
                idForGraph: 'id-g_10-',
                topBorder: 'lime',
                bottomBorder: 'red',
                parameterForGraphes: [
                ]
              },
*/              
              {
                type: "Disc",
                contentsForFrontInner: `${rw}`,
                top: duration - 20,
              }
            ]
          ]
        }
      />
    </>
  );
};
