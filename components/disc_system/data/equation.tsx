export function load() {
  return `
    const audience = 100;
    const bloom = 210;
    const som = 320;
    const ukemochi = 430;
    const detonator = 540;
    const dcoml = 650;
    const oilField = 800;
    const rig = 900;

    //--------------------------------------------------------------------------------
    // sails
    //--------------------------------------------------------------------------------
    tank.current.dispatchEvent(
      new CustomEvent('pushDisc', {
        detail: {
          identifier: 'sail_rig',
          type: 'Sail',
          contentsForFrontInner: 'rig',
          top: 0,
          left: 10,
          width: 100,
          height: 75,
        }
      })
    );
    
    //--------------------------------------------------------------------------------
    // discs
    //--------------------------------------------------------------------------------
    tank.current.dispatchEvent(
      new CustomEvent('pushDisc', {
        detail: {
          identifier: 'tc_0_a',
          contentsForFrontInner: "rw",
          top: 0,
          left: bloom
        }
      })
    );

    //--------------------------------------------------------------------------------
    // 
    //--------------------------------------------------------------------------------
    
    magazine.push([
      () => {
        tank.current.dispatchEvent(
          new CustomEvent('pushDisc', {
            detail: {
              identifier: 'hand_sex_a',
              contentsForFrontInner: 'flighted',
              top: 100,
              left: 300,
              height: 100,
              type: 'MetalTape',
            }
          })
        );
      }
    ]);

  `;
}
