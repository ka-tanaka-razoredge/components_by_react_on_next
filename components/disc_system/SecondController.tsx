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
    "contentsForFrontInner": ""
  }
]
`);
  const [name, setName] = useState('');
  const [resource, setResource] = useState('SailingShip');
  const [discs, setDiscs] = useState([]);
  const [selected, setSelected] = useState([]);
  
  const [left, setLeft] = useState('');
  const [top, setTop] = useState('');
  
  const [shouldSaveSlice, setShouldSaveSlice] = useState(false);
  const [slices, setSlices] = useState([]);
  const [tags, setTags] = useState([]);
  
  const [sliceIndex, setSliceIndex] = useState(0);
  const [discIndex, setDiscIndex] = useState(0);
  
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
      if (1 <= parsed.length && Array.isArray(parsed[0])) {
        props.applyDiscs({ value: JSON.stringify(parsed[discIndex]) });
      } else {
        props.applyDiscs({ value: textarea.current.value });
      }
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
  
  
  const resources = {
    'bottles': 'bottle',
    'bumps': 'bump',
    'sports': 'sport',
    'soms': 'som',
    'sailing_ship_slices': 'sailing_ship_slice',
  };

  const isTableName = (candidate) => {
    const tableNames = Object.keys(resources);
    return tableNames.find(tableName => tableName === candidate);
  };

  const fetchFromServer = async () => {
console.log('---- fetchFromServer begin ----');
    let resourceName = 'sailing_ships';
    let response;
    
    if (isTableName(resource)) resourceName = resource;
    if (resource === 'SailingShip' || resourceName === 'sailing_ships') {
      response = await axios.get(`${props.api}${resourceName}/findById?id=${ id }`);
    } else {
      response = await axios.get(`${props.api}${resourceName}/findById?${resources[resource]}_id=${ id }&as=DiscSystem&dest=mysql`);
console.log(response);
      response.data[0].json = JSON.parse(response.data[0].json);
console.log('---- fetchFromServer end ----');
    }
    
    setDiscs(response.data[0].json);
    setJson(JSON.stringify(response.data[0].json, null, 2));
    setName(response.data[0].name);
    if ('resource' in response.data[0]) setResource(response.data[0].resource);
    
    if (resource === 'SailingShip' || resourceName === 'sailing_ships') {
      if (id !== -1) {
        response = await axios.get(`${props.api}sailing_ship_slices/doListByJson?sailing_ship_id=${ id }`);
      }
      setSlices(response.data);
      
      if (id !== -1) {
        response = await axios.get(`${props.api}tags/doListByResourceId?resource=sailing_ships&id=${ id }`);
      }
      setTags(response.data);
      setDiscIndex(0);
    }
    
    apply();
  };
  
  const save = async () => {
    let params = new URLSearchParams();
    params.append('resource', resource);
    params.append('id', id);
    params.append('name', name);
    params.append('json', json);
    params.append('should_save_slice', shouldSaveSlice);
    tags.map(v => params.append('tags[]', v.id));

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
    
    console.log('response.data.updatedId: ', response.data.updatedId);
    
    setId(response.data.updatedId);
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
          "left": 0,
          "top": 90,
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
  
  const loadSlice = () => {
  };

  const fetchSlice = async (sliceId) => {
    let response;
    response = await axios.get(`${props.api}sailing_ship_slices/findById?id=${ sliceId }`);
    response.data[0].json = JSON.parse(response.data[0].json);
    setDiscs(response.data[0].json);
    setJson(JSON.stringify(response.data[0].json, null, 2));
    setName(response.data[0].name);
    if ('resource' in response.data[0]) setResource(response.data[0].resource);
    apply();
  };
  
  const addTag = async () => {
    let response;
    response = await axios.get(`${props.api}tags/retrieve?value=${document.getElementById('id-tag-you-will-add').value}`);
    const nextTags = tags.map((v) => { return v });
    nextTags.push(response.data[0]);
    setTags(nextTags);
    console.log(response);
  };
  const removeTag = async (tag) => {
    setTags(tags.filter((v) => (v !== tag)));
  };
  
  useEffect(() => {
    apply();
  }, [discIndex]);

  return (
    <>
      <style>
      {
        `
          .controller {
            .separator-1 {
              height: 4px;
            }

            .json {
              width: 500px;
              height: 775px;

              tab-size: 2;
              padding: 4px;

              font-size: 10pt;
              line-height: 1.25;
              
              margin-left: 4px;
            }

            .second-column {
              margin: 4px;

              .save-and-load {
                display: flex;
                width: 220px;

                .save {
                }

                .spare {
                  flex-grow: 1;
                }

                .load {
                }
              }
            }
          }
        `
      }
      </style>
      <div className="controller">
        <div className={props.classes}>
          <div style={{ display: 'flex' }} >
            <div>
              <div onClick={toggleTextarea}>JSON:</div>
              <textarea ref={ textarea } className="json" cols='1000' rows='1000' onChange={ (e) => { setJson(e.target.value);  } } onKeyDown={ (e) => { onTabKey(e); } } value={ json } onBlur={(e) => { apply(); }}></textarea><br />
            </div>
            <div className="second-column">
              <input type='button' value='apply' onClick={ (e) => { apply(); } } />
              <input type='button' value='fetch' onClick={ (e) => { fetch(); } } />
              <input type='button' value='stringify' onClick={ (e) => { stringify(); } } />
  <input type='button' value='load' onClick={ (e) => { fetchFromServer(); } } /><br />
              <select id="select-disc-index" onChange={(e) => { setDiscIndex(document.getElementById("select-disc-index").value); } }>
              {
                discs.map((v, index) => {
                  return (Array.isArray(v) || index === 0) ? (
                    <option key={index} value={index}>{index}</option>
                  ) : ''
                })
              }
              </select>
              <div>
                <div style={{ width: '5rem' }}>id:&nbsp;</div>
                <input type='text' onChange={ (e) => { console.log('e.target.value: ', e.target.value); setId(e.target.value); } } value={ id } />
              </div>
              <div>
                <div style={{ width: '5rem' }}>name:&nbsp;</div>
                <input type='text' onChange={ (e) => { setName(e.target.value); } } value={ name } />
              </div>
              <div>
                <div style={{ width: '5rem' }}><span title='Set table name when you want to access not sailing_ships.'>resource:&nbsp;</span></div>
                <input type='text' onChange={ (e) => { setResource(e.target.value); } } value={ resource } /><br />
              </div>
              <div className="separator-1"></div>
              <div className="save-and-load">
                <input type='button' value='save' onClick={ (e) => { save(); } } />
                <div className="spare"></div>
                <input type='button' value='load' onClick={ (e) => { fetchFromServer(); } } />
              </div>
              <div><input type='checkbox' id='should-save-slice' value={shouldSaveSlice} onClick={() => { setShouldSaveSlice(!shouldSaveSlice); }}  /><label for='should-save-slice'>shouldSaveSlice</label></div>
              <div>
                <input type='button' value='reverse' onClick={ (e) => { props.reverse(); } } />
              </div>
              <br />
              <input type='button' value='new Sequence' onClick={loadSequence} />
              <ToolBox api={props.api} />
              <div>
                tags:
                <div>
                  <input id='id-tag-you-will-add' type='text' />
                  <input type='button' value='add' onClick={ (e) => { addTag(); } } />
                </div>
                <div style={{ height: `${100}px`, overflow: 'scroll' }}>
                {
                  tags.map((v) => {
                    return (
                      <div style={{ display: 'flex', border: '1px solid black', hight: '10px', width: '200px' }}>
                        <div style={{ flex: 1 }}>{v.value}</div>
                        <div style={{ marginRight: '0px' }} onClick={ () => { removeTag(v); }}>×</div>
                      </div>
                    )
                  })
                }
                </div>
              </div>
              <div style={{ position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.5)', left: `${900}px`, top: `${800}px`, zIndex: 1100 }}>
                slices:
                <div style={{ height: `${100}px`, overflow: 'scroll' }}>
                {
                  (1 <= discs.length && Array.isArray(discs[0])) && discs.map((v, index) => {
                    return (
                      <div style={{ border: '1px solid black', hight: '10px', width: '200px' }} onClick={() => { setSliceIndex(index); props.applyDiscs({ value: JSON.stringify(discs[index]) }); }}>{index}</div>
                    )
                  })
                }
                </div>
              </div>
              <div>
                slices:
                <div style={{ height: `${100}px`, overflow: 'scroll' }}>
                {
                  slices.map((v) => {
                    return (
                      <div style={{ border: '1px solid black', hight: '10px', width: '200px' }} onClick={() => { fetchSlice(v.sailing_ship_slice_id); }}>{v.created_at}</div>
                    )
                  })
                }
                </div>
              </div>
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
    </>
  );
});
