import Redct from 'react';

const Ms = (props) => {
  const draw = () => {
    const drawCell = (tc, index) => {
//      if (props.fillList[tc] === index) return (<>■</>);
//      return (<span style={{ color: 'white' }}>□</span>);
      if (props.fillList[tc] === index) return (<div style={{ background: 'rgba(0, 0, 0, 0.5)', width: `${props.cellSize}px`, height: `${props.cellSize}px` }}></div>);
      return (<div style={{ background: 'white', width: `${props.cellSize}px`, height: `${props.cellSize}px` }}></div>);
    };

    const doms = [];

    for (let i = 0; i <= props.duration - 1; i++) {
      const at = [];
      for (let j = 0; j <= props.progresses - 1; j++) {
        switch (j) {
          case 0:
            at.push(<div style={{ borderLeft: 'solid 1px red', borderRight: 'solid 1px red' }}>{drawCell(i, j)}</div>);
            break;
          case props.progresses - 1:
            at.push(<div style={{ borderLeft: 'solid 1px lime', borderRight: 'solid 1px lime' }}>{drawCell(i, j)}</div>);
            break;
          case Math.ceil(props.progresses / 2) - 1:
            at.push(<div style={{ borderLeft: 'solid 1px black', borderRight: 'solid 1px black' }}>{drawCell(i, j)}</div>);
            break;
          default:
            at.push(<div style={{ }}>{drawCell(i, j)}</div>);
            break;
        }
      }
      doms.push(<div style={{ display: 'flex', height: `${props.cellSize + 0}px`, marginTop: '4px', marginBottom: '4px' }}>{at}</div>);
    }
    return (
      <>
        {doms}
      </>
    );
  };

  return (
    <div style={{ width: '100px', overflow: 'hidden', fontSize: '10px' }}>
    {
      draw()
    }
    </div>
  );
};

Ms.defaultProps = {
  progresses: 13,
  duration: 8,
  fillList: [6, 4, -1, 5, 6, 7, 1, 12,],
  cellSize: 6,
};

export default Ms;

