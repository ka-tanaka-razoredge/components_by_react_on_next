import React, { useEffect, useState } from 'react';

const styles = {
  '@keyframes drawLevel': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 }
  },
  contents: {
    animationName: 'drawLevel',
    animationDuration: '2s',
  }
};

const ProgressBar = (props) => {
  const [level, setLevel] = useState(props.level);
  const [unit, setUnit] = useState(parseInt(props.indicatorWidth) / props.fragments);

  return (
    <>
      <div style={{ borderRadius: '9999px', width: props.indicatorWidth, height: props.indicatorHeight, backgroundColor: props.color }}>
        <div className='level' style={{ borderRadius: '9999px', width: `${unit * level}px`, height: props.indicatorHeight, backgroundColor: 'blue' }} />
      </div>
      <div>{level}/{props.fragments}</div>
    </>
  );
};


ProgressBar.defaultProps = {
  fragments: 5,
  indicatorWidth: '100px',
  indicatorHeight: '10px',
  color: 'silver',
  level: 1,
};

export default ProgressBar;
