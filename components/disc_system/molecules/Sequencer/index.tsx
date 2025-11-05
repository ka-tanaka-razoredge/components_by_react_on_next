import React, { useEffect, useRef, useState } from 'react';

import RzSelect from '@/components/atoms/RzSelect';
import Tank from '@/components/disc_system/Tank';

const Sequencer = () => {
  const types = [
    {
      value: 'Disc',
    },
    {
      value: 'Dcosml',
    },
  ];
  const viewer = useRef();
  const [evidence, setEvidence] = useState([]);
  const [type, setType] = useState(types[0].value);
  const [count, setCount] = useState(4);
  const [rows, setRows] = useState(11);
  const [columns, setColumns] = useState(4);
  
  useEffect(() => {
console.log('useEffect: ', evidence);
    viewer.current.setAllDiscs({ value: JSON.stringify(evidence) });
  }, [evidence]);

  const onClick = (e) => {
    e.stopPropagation();
  };
  
  const onClickForTrigger = (e) => {
    let newEvidence;
    switch (type) {
      case 'Disc':
        newEvidence = [];
        for (let i = 0; i <= count - 1; i++) {
          let filler = {
            type: 'Disc',
            identifier: 'id-',
            top: i * 20,
            left: 0,
          };
          newEvidence.push(filler);
        }
        break;
      case 'Dcosml':
        newEvidence = [];
        
        for (let i = 0; i <= count - 1; i++) {
          let filler = {
            type: 'DiscForDcosml',
            identifier: 'id-',
            top: i * 20,
            left: 0,
            dcoml: [],
          };
          
          for (let j = 0; j <= rows - 1; j++) {
            let row = {
              id: `id-${j}`,
              character: '□',
              length: columns,
              color: 'black',
              indexes: [],
            };
            
            if (j === 0) {
              row.color = 'lime';
            }
            
            if (j === rows - 1) {
              row.color = 'red';
            }
            filler.dcoml.push(row);
          }
          newEvidence.push(filler);
        }
        break;
    }
//console.log(newEvidence);
    setEvidence(newEvidence);
    (async () => {
      await global.navigator.clipboard.writeText(JSON.stringify(newEvidence, null, 2));
    })();
  };
  
  const onChangeForSelect = (e) => {
    setType(e.target.value);
    // TODO: parametersをsetするviewを差し替える
  };

  return (
    <>
      <style>
      {
        `
          .sequencer {
            padding: 4px;
            background-color: rgba(255, 255, 255, 1.0);
            
            .controller {
              background-color: olive;
            }

            .viewer {
            }
          }
          
          .display-flex {
            display: flex;
            gap: 4px;
            
            input {
              width: 2rem;
            }
          }
        `
      }
      </style>
      <div className="sequencer" onClick={onClick}>
        <div className="controller">
          <div>
            <div>種類</div>
            <select onChange={onChangeForSelect}>
            {
              types.map((v) => {
                return (
                  <option value={v.value}>{v.value}</option>
                )
              })
            }
            </select>
            <div>枚数</div>
            <input type="text" onChange={ (e) => { setCount(e.target.value); } } value={count} />
            <div className="display-flex">
              <div>
                <div>行数</div>
                <input type="text" onChange={ (e) => { setRows(e.target.value); } } value={rows} />
              </div>
              <div>
                <div>列数</div>
                <input type="text" onChange={ (e) => { setColumns(e.target.value); } } value={columns} />
              </div>
            </div>
          </div>
          <button onClick={onClickForTrigger}>trigger</button>
        </div>
        <div className="viewer">
          <Tank ref={viewer} />
        </div>
      </div>
    </>
  );
};

export default Sequencer;
