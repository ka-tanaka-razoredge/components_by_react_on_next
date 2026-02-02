import Disc from '@/components/disc_system/Disc';

export default (props) => {
  const buildTransform = () => {
//    console.log('---- buildTransform begin ----');
    let reply = '';
    if (props.z) reply += `translateZ(${props.z}px) `;
    if (props.rotateY) reply += `rotateZ(${props.rotateY}deg) `;
    if (props.transform) reply += `${props.transform}`;
//console.log(reply);
    return reply;
  };

  const drawBottomInner = () => {
    return (
      <>
        <Disc
          left={0}
          contentsForFrontInner={props.alias}
          duration={props.duration}
          width={16}
          height={props.height}
          style={{
            padding: `${4}px`,
            border: 'none'
          }}
        />
        <Disc
          left={16}
          width={200}
          height={props.height}
          contentsForFrontInner={props.contentsForFrontInner}
          duration={1}
          style={{
            border: `${1}px solid silver`
          }}
        />
        <Disc
          left={16 + 200 + 4}
          duration={1}
          height={props.height}
          contentsForFrontInner={props.message}
          style={{
            border: 'none'
          }}
        />
      </>
    );
  };

  const drawFrontInner = () => {
    return (
      <div
        style={{
          border: `1px solid rgba(0, 0, 0, 0.1)`,
          height: `${props.height}px`,
          width: `${16 + 200 + 4 + 100}px`
        }}
      >
      </div>
    );
  };

  return (
    <>
      <style>
      {
        `
        `
      }
      </style>
      <div
        className="disc"
        style={{
          transformStyle: 'preserve-3d',
          perspective: `${1600}px`,
          border: (!props.isFrontOnly) ? '1px solid orange' : '',
          height: `${1}px`,
          width: (props.width) ? `${props.width}px` : `${1}rem`,
          top: `${props.top}px`,
          left: `${props.left}px`,
          position: 'absolute',
          transform: buildTransform(),
          boxShadow: (props.isShadow) ? '10px 5px 5px rgba(0, 0, 0, 0.1)' : '',
        }}
      >
        {drawBottomInner()}
        {/* drawBottomOuter() */}
        {/* shaft */}
        <div
          style={{
            position: 'absolute',
            width: (props.width) ? `${props.width}px` : `${100}px`,
            top: `${0}px`,
            height: `${1}px`,
            transform: 'rotateX(90deg)',
          }}
        >
          {drawFrontInner()}
        </div>
      </div>
    </>
  );
};
