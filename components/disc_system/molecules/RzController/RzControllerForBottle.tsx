// @ts-nocheck

import React, { forwardRef, useImperativeHandle, useState, useRef } from 'react';
import axios from 'axios';

import Editor from "@monaco-editor/react";

import DiscPanel from '@/components/disc_system/molecules/RzController/DiscPanel';
import ToolBox from '@/components/atoms/ToolBox';

/**
 * 
 * 
 * 
 */
export default forwardRef((props: { api, applyDiscs, json, resource, rotate }, ref) => {
  const [editorInstance, setEditorInstance] = useState(null);
  const onEditorMount = (editor, monaco) => {
    editor.onDidBlurEditorText(() => {
      apply(editor.getValue());
    });
    setEditorInstance(editor);
  };

  const defaultJson = JSON.stringify([
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
            contentsForBottomOuter: `<div style='white-space: nowrap;'>意味ある他者に対する制裁</div>`,
          }
        ]
      ]
    },
  ], null, '\t');

  const [json, setJson] = useState(props.json || defaultJson);
//  const [json, setJson] = useState((props.json) ? props.json : '');
  const [id, setId] = useState(-1);
  const [name, setName] = useState('');
  const [resource, setResource] = useState(props.resource);
  const textarea = useRef(null);
  const discPanel = useRef();
  const [emojis, ] = useState([
    '&#x1F512;',
    '&#x1F37E;',
    '&#x1F9CA;',
    '&#x2622;&#xFE0F',
    '&#x1F4A3;',
    '&#x26A1;',
    '&#x1F525;',
    '&#x1F6AC;',
    '&#x1F48E;',
    '&#x1F3B0;',
    '&#x1F3B2;',
    '&#x1F4AB;',
    '&#x1F9E9;',
    '&#x1F9F1;',
    '&#x1F390;',
    '&#x26F5;',
    '&#x1F6A8;',
  ]);
  
  useImperativeHandle(ref, () => ({
    fetch: () => {
      setJson(JSON.stringify(props.getDiscs()));
    },
    setJson: (value) => {
      setJson(value);
    },
    setId: (value) => {
      setId(value);
    },
    setName: (value) => {
      setName(value);
    }
  }));

  const apply = (parsable='[]') => {
//  const apply = () => {
    try {
      const parsed = JSON.parse(parsable);
      if (1 <= parsed.length && Array.isArray(parsed[0])) {
        props.applyDiscs({ value: JSON.stringify(parsed[discIndex]) });
      } else {
        props.applyDiscs({ value: parsable });
      }
    } catch (e) {
      console.log(e);
      alert('JSON is invalid!');
      return;
    }
/*
    try {
      JSON.parse(textarea.current.value);
    } catch {
      alert('JSON is invalid!');
      return;
    }
    props.applyDiscs({ value: textarea.current.value });
*/
  };

  const fetch = () => {
    console.log(props.getDiscs());
    setJson(JSON.stringify(props.getDiscs(), null, 2));
  };
  
  const stringify = () => {
    textarea.current.value = JSON.stringify(eval(textarea.current.value));
  };
  
  const fetchFromServer = async (resource) => {
    const response = await axios.get((resource) ? `${props.api}/${resource}/findById?id=${ id }` : `${props.api}/sailing_ships/findById?id=${ id }`);
    if (resource === 'bottles') {
      setJson(response.data[0].body);
      setResource(resource);
    } else {
      setJson(JSON.stringify(response.data[0].json, null, 2));
      setResource(response.data[0].resource);
    }
    setName(response.data[0].name);
    apply();
  };

  const save = async () => {
    let params = new URLSearchParams();
    params.append('resource', resource);
    params.append('id', id);
    params.append('name', name);
    params.append('json', json);
//    params.append('json', encodeURIComponent(json));

    try {
      if (json.length >= 1) JSON.parse(json);      
    } catch {
      alert('JSON is invalid!');
      return;
    }
    
    if (id !== -1) {
      if (!window.confirm('Do you want to update?')) return;
    }
    
    const dictionary = {
      'Matrix': 'matrices',
    };
    let r = resource;
    if (dictionary[resource]) r = dictionary[resource];
    
    const response = await axios.post(`${props.api}/${r}/save`, params);
    alert(JSON.stringify(response));
  };

  function onTabKey( e, obj ){
    obj = textarea.current;
  
  	// タブキーが押された時以外は即リターン
  	if( e.keyCode!=9 ){ return; }
  
  	// タブキーを押したときのデフォルトの挙動を止める
  	e.preventDefault();
  
  	// 現在のカーソルの位置と、カーソルの左右の文字列を取得しておく
  	var cursorPosition = obj.selectionStart;
  	var cursorLeft     = obj.value.substr( 0, cursorPosition );
  	var cursorRight    = obj.value.substr( cursorPosition, obj.value.length );
  
  	// テキストエリアの中身を、
  	// 「取得しておいたカーソルの左側」+「タブ」+「取得しておいたカーソルの右側」
  	// という状態にする。
  	obj.value = cursorLeft+"\t"+cursorRight;
  
  	// カーソルの位置を入力したタブの後ろにする
  	obj.selectionEnd = cursorPosition+1;
  }

  const setData = async (lop={value: 'isBottomOnly'}) => {
    let value = '';
    switch (lop.value) {
      case 'Disc':
        value = `  {
    "type": "Disc",
    "identifier": "id-",
    "top": 0,
    "left": 0,
    "contentsForFrontInner": "dummy"
  }
`;
        break;
      case 'isPastOrFuture':
        value = ` {
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
      case 'nowrap':
        value = `<span style='white-space: nowrap;'>`;
        break;
      case 'wideSail':
        value = `  {
    "type": "Sail",
    "identifier": "id-",
    "duration": 200,
    "top": 0,
    "left": 0,
    "width": 400,
    "height": 100,
    "contentsForFrontInner": "ooBottle"
  },
  {
    "type": "Sail",
    "identifier": "id-",
    "top": 0,
    "left": 0,
    "contentsForFrontInner": "capsule-1"
  },
  {
    "type": "Disc",
    "identifier": "id-",
    "top": 0,
    "left": 0,
    "contentsForFrontInner": "capsule-1"
  },
  {
    "type": "Sail",
    "identifier": "id-",
    "top": 0,
    "left": 100,
    "contentsForFrontInner": "capsule-2"
  },
  {
    "type": "Disc",
    "identifier": "id-",
    "top": 0,
    "left": 100,
    "contentsForFrontInner": "capsule-1"
  },
  {
    "type": "Sail",
    "identifier": "id-",
    "top": 0,
    "left": 200,
    "contentsForFrontInner": "capsule-3"
  },
  {
    "type": "Disc",
    "identifier": "id-",
    "top": 0,
    "left": 200,
    "contentsForFrontInner": "capsule-1"
  },
  {
    "type": "Sail",
    "identifier": "id-",
    "top": 0,
    "left": 300,
    "contentsForFrontInner": "capsule-4"
  },
  {
    "type": "Disc",
    "identifier": "id-",
    "top": 0,
    "left": 300,
    "contentsForFrontInner": "capsule-1"
  }
`;
        break;
      case 'carousel':
        value = `{"type":"Carousel","identifier":"id-00000100","top":0,"left":0,"height":50,"width":100,"contents":[{"html":"This is HTML"},{"html":"That is HTML"}]}`;
        break;
      case 'sail':
        value = `  {
    "type": "Sail",
    "identifier": "id-",
    "top": 0,
    "left": 0,
    "contentsForFrontInner": "subject"
  },
`;
        break;
      default:
        value = ` {
    "type": "Disc",
    "top": 0,
    "left": 0,
    "isBottomOnly": true,
    "contentsForBottomInner": "dummy"
  }
`;
        break;
    }
    await global.navigator.clipboard.writeText(value);
  };
  
  const onMouseOver = () => {
    document.getElementById('discPanel').dispatchEvent(new CustomEvent('done mouseover', {}));
//    discPanel.current.dispatchEvent(new CustomEvent('done mouseover', {}));    
  };
  
  const rotateTank = () => {
    props.rotate(`rotateZ(180deg)`);
  };

  return (
    <div>
      <style>
      {
        `
          .controller {
            width: 700px;
            padding: 0.25rem;
            background-color: orange;
            
            .vs--separator {
              height: 0.25rem;
            }
            
            .panache {
            }

            .shandy-gaff {
              width: 492px;
              margin: 4px;
              
              display: flex;
              flex-wrap: wrap;
              align-content: flex-start;
              overflow: scroll;
              gap: 4px;

              background-color: rgba(255, 255, 255, 1.0);
            }

            .red-eye {
            }

            .mint-beer {
              .json {
                width: 492px;
                height: 250px;
                margin: 4px;
                tab-size: 2;
                font-size: 10pt;
                line-height: 1.5;
            }
          }
        `
      }
      </style>
      <div className={`controller ${props.classes}`}>
        <div className="mint-beer">
          JSON:<br />
{/*          
          <textarea ref={ textarea } className="json" cols='1000' rows='1000' onChange={ (e) => { setJson(e.target.value);  } } onKeyDown={ (e) => { onTabKey(e); } } value={ json } onBlur={(e) => { apply(); }}></textarea><br />
*/}          
          <div style={{ height: `${500}px`, width: `100%` }}>
            <Editor
              ref={textarea}
              height="100%"
              defaultLanguage="javascript"
              value={json}
              onMount={onEditorMount}
              onChange={(value) => setJson(value ?? "")}
              options={{
                folding: true,          // 折り畳み有効
                lineNumbers: "on",      // 行番号表示
                minimap: { enabled: false }, // ミニマップ非表示
              }}
            />
          </div>
          <div className="vs--separator"></div>
          <input type='button' value='apply' onClick={ (e) => { apply(); } } />
          <input type='button' value='fetch' onClick={ (e) => { fetch(); } } />
          <input type='button' value='stringify' onClick={ (e) => { stringify(); } } /><br />
          <div className="vs--separator"></div>
          id:&nbsp;<input type='text' onChange={ (e) => { setId(e.target.value); } } value={ id } />
          name:&nbsp;<input type='text' onChange={ (e) => { setName(e.target.value); } } value={ name } />
          resource:&nbsp;<input type='text' onChange={ (e) => { setResource(e.target.value); } } value={ resource } /><br />
          <button onClick={rotateTank}>Tank &gt;&gt;= rotate</button><br />
          <br />
          <div className="panache">
            <div className="">
              <input type='button' value='save' onClick={ (e) => { save(); } } /><br />
            </div>
          </div>
        </div>
        
        <div className="shandy-gaff">
        {
          emojis.map((v, i) => {
            return (
              <div key={i} style={{ display: 'flex' }}>
                <div dangerouslySetInnerHTML={{ __html: v }}></div>
                <div>{v}</div>
              </div>
            )
          })
        }
        </div>

        <div className="red-eye">
          <div className="">
            <input type='button' value='load' onClick={ (e) => { fetchFromServer(props.resource); } } />
          </div>
          <ToolBox />
{/*          
          <input type='button' value='Disc' onClick={ (e) => { setData({ value: 'Disc' }) } } />
          <input type='button' value='Disc bottom only' onClick={ (e) => { setData({ value: '' }) } } />
          <input type='button' value='isPastOrFuture' onClick={ (e) => { setData({ value: 'isPastOrFuture' }) } } />
          <input type='button' value='nowrap' onClick={ (e) => { setData({ value: 'nowrap' }) } } />
          <input type='button' value='wide Sail' onClick={ (e) => { setData({ value: 'wideSail' }) } } />
          <input type='button' value='Carousel' onClick={ (e) => { setData({ value: 'carousel' }) } } />
          <input type='button' value='Sail' onClick={ (e) => { setData({ value: 'sail' }) } } />
*/}          
          <div onMouseOver={onMouseOver} style={{ width: `${2}rem` }}>
            「領域」
            <DiscPanel ref={discPanel} id={`discPanel`} top={100} left={100}  />
          </div>
        </div>
      </div>
    </div>
  )
})