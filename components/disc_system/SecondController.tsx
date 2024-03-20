// @ts-nocheck

/**
 * 
 * 
 * 
 * 
 * 
 */
import React, { forwardRef, useImperativeHandle, useEffect, useState, useRef } from 'react';
import axios from 'axios';

import ToolBox from '../atoms/ToolBox';


export default forwardRef((props, ref) => {
  const textarea = useRef(null);
  const textareaForLeft = useRef(null);
  const textareaForTop = useRef(null);
  
  const [id, setId] = useState(-1);
  const [json, setJson] = useState(`[
  {
    "type": "Sail",
    "identifier": "id-",
    "left": 0,
    "top": 0,
    "contentsForFrontInner": "subject"
  }
]
`);
  const [name, setName] = useState('');
  const [resource, setResource] = useState('SailingShip');
  const [discs, setDiscs] = useState([]);
  const [selected, setSelected] = useState([]);
  
  const [left, setLeft] = useState('');
  const [top, setTop] = useState('');
  
  useImperativeHandle(ref, () => ({
    fetch: () => {
      setJson(JSON.stringify(props.getDiscs()));
    }
  }));
  
  useEffect(() => {
  }, [discs]);

  const apply = () => {
    try {
      const parsed = JSON.parse(textarea.current.value);
      props.applyDiscs({ value: textarea.current.value });
      setDiscs(parsed);
    } catch {
      alert('JSON is invalid!');
      return;
    }
  }

  const fetch = () => {
    setDiscs(props.getDiscs());
    setJson(JSON.stringify(props.getDiscs(), null, 2));
  };
  
  const isTableName = (candidate) => {
    const tableNames = ['bottles', 'sports', 'soms'];
    return tableNames.find(tableName => tableName === resource);
  };
  
  const resources = {
    'bottles': 'bottle',
    'sports': 'sport',
    'soms': 'som',
  };

  const fetchFromServer = async () => {
console.log('---- fetchFromServer begin ----');
    let resourceName = 'sailing_ships';
    let response;
    
    if (isTableName(resource)) resourceName = resource;

    if (resource === 'SailingShip') {
      response = await axios.get(`${props.api}${resourceName}/findById?id=${ id }`);
    } else {
      response = await axios.get(`${props.api}${resourceName}/findById?${resources[resource]}_id=${ id }&as=DiscSystem&dest=mysql`);
      response.data[0].json = JSON.parse(response.data[0].json);
console.log(response);
console.log('---- fetchFromServer end ----');
    }
    
    setDiscs(response.data[0].json);
    setJson(JSON.stringify(response.data[0].json, null, 2));
    setName(response.data[0].name);
    if ('resource' in response.data[0]) setResource(response.data[0].resource);
    apply();
  };
  
  const save = async () => {
    let params = new URLSearchParams();
    params.append('resource', resource);
    params.append('id', id);
    params.append('name', name);
    params.append('json', json);

    try {
      JSON.parse(json);
    } catch {
      alert('JSON is invalid!');
      return;
    }
    
    if (id !== -1) {
      if (!window.confirm('Do you want to update?')) return;
    }
    const resourceName = (isTableName(resource)) ? resource : 'sailing_ships';   
    const response = await axios.post(`${props.api}${resourceName}/save`, params);
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
      case 'nowrap':
        value = `<span style='white-space: nowrap;'>`;
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

  const applyTop = () => {
    const value = top;
    const nextDiscs = discs.map((disc) => {
      if (selected.find(v => v == disc.identifier)) disc.top = value;
      return disc;
    });
    setDiscs(nextDiscs);
    setJson(JSON.stringify(nextDiscs, null, 2));
  };

  const applyLeft = () => {
    const value = left;
    const nextDiscs = discs.map((disc) => {
      if (selected.find(v => v == disc.identifier)) disc.left = value;
      return disc;
    });
    setDiscs(nextDiscs);
    setJson(JSON.stringify(nextDiscs, null, 2));
  };
  
  const toggleSelected = (identifier) => {
    if (selected.find((v) => (v == identifier))) {
      setSelected(selected.filter(v => v != identifier));
    } else {
      selected.push(identifier);
    }
  };
  
  const toggleTextarea = () => {
    (parseInt(textarea.current.style.height) === 0) ? textarea.current.style.height = '775px' : textarea.current.style.height = '0px';
  };

  const loadSequence = async () => {
    const response = await axios.get(`${props.api}sailing_ships/findById?id=63`);
    setJson(JSON.stringify(response.data[0].json, null, 2));
    setName(response.data[0].name);
    setResource(response.data[0].resource);
    apply();
    setId(-1);
    setResource('Sequence');
    setName('');
  };

  return (
    <div>
      <div className={props.classes}>
        <div style={{ display: 'flex' }} >
          <div>
            <div onClick={toggleTextarea}>JSON:</div>
            <textarea ref={ textarea } cols='1000' rows='1000' style={{ lineHeight: '1.25', width: '500px', height: '775px', tabSize: '2', fontSize: '10pt' }} onChange={ (e) => { setJson(e.target.value);  } } onKeyDown={ (e) => { onTabKey(e); } } value={ json } onBlur={(e) => { apply(); }}></textarea><br />
          </div>
          <div>
            <input type='button' value='apply' onClick={ (e) => { apply(); } } />
            <input type='button' value='fetch' onClick={ (e) => { fetch(); } } />
            <input type='button' value='stringify' onClick={ (e) => { stringify(); } } /><br />
            <div>
              <div style={{ width: '5rem' }}>id:&nbsp;</div><input type='text' onChange={ (e) => { setId(e.target.value); } } value={ id } />
            </div>
            <div>
              <div style={{ width: '5rem' }}>name:&nbsp;</div><input type='text' onChange={ (e) => { setName(e.target.value); } } value={ name } />
            </div>
            <div>
              <div style={{ width: '5rem' }}>resource:&nbsp;</div><input type='text' onChange={ (e) => { setResource(e.target.value); } } value={ resource } /><br />
            </div>
            <div style={{ display: 'flex' }}>
              <input type='button' value='save' onClick={ (e) => { save(); } } />
              <div style={{ width: '130px' }}></div>
              <input type='button' value='load' onClick={ (e) => { fetchFromServer(); } } />
            </div>
            <br />
            <br />
            <br />
            <input type='button' value='new Sequence' onClick={loadSequence} />
            <ToolBox api={props.api} />
            <div style={{ height: '1vh' }}></div>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
            <div style={{ width: '10vw' }}>
            {
              discs.map((disc, index) => {
                return (
                  <div style={{ margin: '4px 4px' }}>
                    <div><input type='checkbox' value={disc.identifier} onClick={(e) => { toggleSelected(disc.identifier); }} />{disc.identifier}</div>
                  </div>
                )
              })
            }
            </div>
            <div>
              <div>
                <div style={{ width: '5rem' }}>top:&nbsp;</div>
                <input ref={textareaForTop} type='text' onChange={ (e) => { setTop(e.target.value); } } value={ top } /><input type='button' value='apply to json' onClick={ (e) => { applyTop() } } />
              </div>
              <div>
                <div style={{ width: '5rem' }}>left:&nbsp;</div>
                <input ref={textareaForLeft} type='text' onChange={ (e) => { setLeft(e.target.value); } } value={ left } /><input type='button' value='apply to json' onClick={ (e) => { applyLeft() } } />
              </div>
            </div>
        </div>
      </div>
    </div>
    
  );
});