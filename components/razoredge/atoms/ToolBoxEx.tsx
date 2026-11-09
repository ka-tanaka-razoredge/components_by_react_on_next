import React, { useState } from 'react';
import axios from 'axios';

import Modal from '@/components/razoredge/atoms/ModalEx';
import Sequencer from '@/components/disc_system/molecules/Sequencer';

export default (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onClickForSequential = () => {
    setModalVisible(!modalVisible);
  };

  const setData = async (lop={value: 'isBottomOnly'}) => {
    let value = '';
    switch (lop.value) {
      case 'dcoml':
        value = `  {
    "type": "DiscForDcoml",
    "identifier": "id-",
    "left": 100,
    "top": 0,
    "dcoml": [
      {
        "id": "first",
        "alias": "漲",
        "top": 0,
        "left": 0,
        "m": "\\\"killer\\\"",
        "l": "() => { }"
      }
    ]
  }
`;
        break;
      case 'magazine':
        value = ` {
    "type": "Magazine",
    "identifier": "gull",
    "contentsForFrontInner": "",
    "left": 0,
    "top": 0,
    "height": 100,
    "width": 100,
    "discs": [
      [
         {
            "type": "Sail",
            "identifier": "embodier",
            "contentsForFrontInner": [
              "<div style=\\"white-space: nowrap;\\">",
              "  <div>embodier</div>",
              "</div>"
            ],
            "top": 0,
            "left": 0
         },
         {
            "type": "Disc",
            "identifier": "embodier",
            "contentsForFrontInner": [
              "<div style=\\"white-space: nowrap;\\">",
              "  <div>embodier</div>",
              "</div>"
            ],
            "top": 80,
            "left": 0
         }
      ]
    ]
  }        
`;
        break;
      case 'isPastOrFuture':
        value = `  {
    "type": "PastOrFuture",
    "identifier": "id-",
    "top": 0,
    "left": 0,
    "height": 100,
    "width": 100,
    "isBottomOnly": true,
    "isPast": false,
    "contentsForBottomInner": "conjecture",
    "discs": [
      [
        {
          "type": "Disc",
          "top": 90,
          "left": 0,
          "isBottomOnly": true,
          "contentsForBottomInner": "rw"
        }
      ]
    ]
  }
`;
        break;
      case 'saltThenReap':
        value = `  {
    "type": "Disc",
    "identifier": "id-salt-",
    "top": 0,
    "left": 0,
    "contentsForFrontInner": "transfer(disturbance)"
  },
  {
    "type": "Disc",
    "identifier": "id-reap-",
    "top": 100,
    "left": 0,
    "contentsForFrontInner": "m4Dcoml"
  }
`;
        break;
      case 'sugarThen':
        value = `  {
    "type": "Disc",
    "identifier": "id-sugar-",
    "top": 0,
    "left": 0,
    "contentsForFrontInner": "lure implicitly"
  },
  {
    "type": "Disc",
    "identifier": "id-let-it-sit-",
    "top": 50,
    "left": 0,
    "contentsForFrontInner": "letItSit implicitly"
  },
  {
    "type": "Disc",
    "identifier": "id-reap-",
    "top": 100,
    "left": 0,
    "contentsForFrontInner": "m4Dcoml"
  }
`;
        break;
      case 'nowrap':
        value = `<span style='white-space: nowrap;'>`;
        break;
      case 'disc':
        value = `{
  "type": "Disc",
  "left": 0,
  "top": 0,
  "width": 300,
  "height": 100,
  "contentsForFrontInner": ""
}
`;
        break;
      case 'foundation':
        value = ` {
  "type": "Foundation",
  "identifier": "id-lane-",
  "top": 0,
  "left": 0,
  "discs": []
  }`;
        break;
      case 'bottle':
        value = ` {
    "type": "Foundation",
    "identifier": "id-lane-",
    "top": 420,
    "left": 0,
    "discs": [
      {
        "type": "Magazine",
        "identifier": "gull",
        "contentsForFrontInner": "",
        "contentsForBottomInner": "<div class=\\"nowrap\\">decorated</div>",
        "left": 0,
        "top": 0,
        "height": 40,
        "width": 40,
        "views": [
          "vertical"
        ],
        "discs": [
          [
            {
              "type": "Sail",
              "identifier": "embodier",
              "contentsForFrontInner": "e",
              "contentsForBottomOuter": "encoder",
              "duration": 100,
              "top": 0,
              "left": 0,
              "width": 20,
              "height": 20
            },
            {
              "type": "Sail",
              "identifier": "embodier",
              "contentsForFrontInner": "3",
              "contentsForBottomOuter": "3",
              "top": 20,
              "left": 0,
              "width": 20,
              "height": 20
            }
          ]
        ]
      }
    ]
}`;
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
            "      <div style='position: absolute; line-height: 0; top: 0; right: 1px; border: 1px solid lime; width: 8px; height: 8px;'></div>",
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
      default:
        value = `  {
    "type": "Disc",
    "left": 0,
    "top": 0,
    "isBottomOnly": true,
    "contentsForBottomInner": "dummy"
  }
`;
        break;
    }
    await global.navigator.clipboard.writeText(value);
  };
  
  const loadSequence = async () => {
    const response = await axios.get(`${props.api}sailing_ships/findById?id=63`);
/*    
    const response = await axios.get(`https://razor-edge.net/gold/sailing_ships/findById?id=63`);
    setJson(JSON.stringify(response.data[0].json, null, 2));
    setName(response.data[0].name);
    setResource(response.data[0].resource);
    apply();
    setId(-1);
    setResource('Sequence');
    setName('');
*/
    await global.navigator.clipboard.writeText(JSON.stringify(response.data[0].json, null, 2));
  };

  return (
    <>
      <style>
      {
        `
        `
      }
      </style>
      <div style={props.style || {}}>
        <input type='button' value='foundation' onClick={() => { setData({ value: 'foundation' }); }} /><br />
        <input type='button' value='Bottle' onClick={() => { setData({ value: 'bottle' }); }} /><br />
        <input type='button' value='Disc' onClick={() => { setData({ value: 'disc' }); }} /><br />
        <input type='button' value='Magazine' onClick={() => { setData({ value: 'magazine' }); }} /><br />
        <input type='button' value='Dcoml' onClick={() => { setData({ value: 'dcoml' }); }} /><br />
        <input type='button' value='Ms' onClick={() => { setData({ value: 'ms' }); }} /><br />
        <input type='button' value='new Sequence' onClick={loadSequence} />
        <input type='button' value='isBottomOnly' onClick={() => { setData({ value: '' }); }} /><br />
        <input type='button' value='PastOrFuture' onClick={() => { setData({ value: 'isPastOrFuture' }); }} />
        <input type='button' value='saltThenReap' onClick={() => { setData({ value: 'saltThenReap' }); }} />
        <input type='button' value='sugarThen' onClick={() => { setData({ value: 'sugarThen' }); }} /><br />
        <input type='button' value='nowrap' onClick={() => { setData({ value: 'nowrap' }); }} />
        <input type='button' value='sequential' onClick={onClickForSequential} />

        <Modal visible={modalVisible} setVisible={setModalVisible}>
          <Sequencer />
        </Modal>

      </div>
    </>
  );
};
