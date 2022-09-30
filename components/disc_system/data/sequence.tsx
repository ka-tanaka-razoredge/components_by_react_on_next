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
    // timecodes
    //--------------------------------------------------------------------------------
    tank.current.dispatchEvent(
      new CustomEvent('pushDisc', {
        detail: {
          identifier: 'tc_00000015',
          type: 'Timecode',
          contentsForBottomInner: '明',
          top: -5,
          left: 15,
          width: 100,
          height: 75,
        }
      })
    );

    tank.current.dispatchEvent(
      new CustomEvent('pushDisc', {
        detail: {
          identifier: 'tc_00000020',
          type: 'Timecode',
          contentsForBottomInner: '大',
          top: 10,
          left: 15,
          width: 100,
          height: 75,
        }
      })
    );

    tank.current.dispatchEvent(
      new CustomEvent('pushDisc', {
        detail: {
          identifier: 'tc_00000100',
          type: 'Timecode',
          contentsForBottomInner: '昭',
          top: 300 - 20,
          left: 15,
          width: 100,
          height: 75,
        }
      })
    );

    tank.current.dispatchEvent(
      new CustomEvent('pushDisc', {
        detail: {
          identifier: 'tc_00000110',
          type: 'Timecode',
          contentsForBottomInner: '平',
          top: 300,
          left: 15,
          width: 100,
          height: 75,
        }
      })
    );

    //--------------------------------------------------------------------------------
    // sails
    //--------------------------------------------------------------------------------

    tank.current.dispatchEvent(
      new CustomEvent('pushDisc', {
        detail: {
          identifier: 'agents',
          type: 'Sail',
          contentsForFrontInner: 'agents',
          top: 0,
          left: audience,
          width: 500,
          height: 75,
        }
      })
    );

    tank.current.dispatchEvent(
      new CustomEvent('pushDisc', {
        detail: {
          identifier: 'ukemochi',
          type: 'Sail',
          contentsForFrontInner: 'dcoml',
          top: 0,
          left: dcoml,
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
          identifier: 'uke_0100',
          contentsForFrontInner: 'And',
          top: 0,
          left: audience
        }
      })
    );

    tank.current.dispatchEvent(
      new CustomEvent('pushDisc', {
        detail: {
          identifier: 'uke_0200',
          contentsForFrontInner: 'Mon',
          top: 300,
          left: audience
        }
      })
    );

    tank.current.dispatchEvent(
      new CustomEvent('pushDisc', {
        detail: {
          identifier: 'uke_0300',
          contentsForFrontInner: 'Del',
          top: 330,
          left: audience
        }
      })
    );

    tank.current.dispatchEvent(
      new CustomEvent('pushDisc', {
        detail: {
          identifier: 'cover',
          contentsForFrontInner: "",
          top: 0,
          left: dcoml
        }
      })
    );

    tank.current.dispatchEvent(
      new CustomEvent('pushDisc', {
        detail: {
          identifier: 'tc_0_a',
          contentsForFrontInner: "[漲, 濺]",
          contentsForBottomInner: "bloom()",
          top: 300,
          left: dcoml
        }
      })
    );

    tank.current.dispatchEvent(
      new CustomEvent('pushDisc', {
        detail: {
          identifier: 'dcoml_0300',
          contentsForFrontInner: '',
          contentsForBottomInner: '',
          top: 330,
          left: dcoml
        }
      })
    );

    //--------------------------------------------------------------------------------
    // hands
    //--------------------------------------------------------------------------------
/*    
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
*/
  `;
}
