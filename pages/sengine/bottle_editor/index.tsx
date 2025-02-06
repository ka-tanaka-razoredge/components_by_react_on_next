import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import RzController from '@/components/disc_system/molecules/RzController/RzControllerForBottle';
import Zapper from '@/components/Zapper'
import Matrix from '@/components/bo/Matrix';
import TagListView from '@/components/TagListView';
import Tank from '@/components/disc_system/Tank';

export default () => {
  const tank = useRef(null);
  const previewWindow = useRef(null);
  const controller = useRef<{ api, applyDiscs, resource, json, setJson, setId, setName }>(null);
  const [complex, setComplex] = useState({ name: '', lineup: [], body: '', tags: [] });
  const [resource, setResource] = useState({ name: '', json: { subjects: [], vbards: [], replies: [] }, tags: [] });

  const [content, setContent] = useState('');
  const [isEditorVisible, setIsEditorVisible] = useState(false);

  useEffect(() => {
    document.getElementById('preview-window').addEventListener('show', (e) => {
      previewWindow.current.style.visibility = 'visible';
      previewWindow.current.innerHTML = e.detail.value;
    });
    document.getElementById('preview-window').addEventListener('hide', () => {
      previewWindow.current.style.visibility = 'collapse';
    });
  }, []);
  
  function zap(e, c) {
    (async () => {
      tank.current.clearAllDiscs();
      controller.current.setJson('');
      const response = await axios.get(`https://razor-edge.net/gold/bottles/findById?id=${c.bottle_id}`);
      setComplex(response.data[0]);
      controller.current.setId(c.bottle_id);
      controller.current.setName(c.name);
      if (response.data[0].body) {
        const discs = JSON.parse(response.data[0].body);
        tank.current.setAllDiscs({ value: JSON.stringify(discs) });
        controller.current.setJson(JSON.stringify(discs, null, 2));
      }
    })();
  };
  
  
  
  // const fetchPage = async (page, limit, offset) => {
  //   return await axios.get(`https://razor-edge.net/gold/bottles/doListByJson?page=${page}&limit=${limit}&offset=${offset}`);
  // };
  
  // const giveCount = async () => {
  //   const response = await axios.get('https://razor-edge.net/gold/bottles/giveCount');
  //   return Math.ceil(response.data.count / 10);
  // }

  return (
    <>
      <style>
      {
        `
          .bottle-editor {
            display: flex;
            border: 1px solid rgba(0, 0, 0, 1.0);
            
            .zapper {
              width: 300px;
              height: 900px;
              overflow: scroll;
            }
            
            .rep-tank {
              .tank_1 {
                height: 800px;
                width: 1100px;
              }
            }
            
            .controller_1 {
              border: 1px solid green;
            }
          }
        `
      }
      </style>
      <div className="bottle-editor">
        <div className="zapper">
          <Zapper bo={'bottles'} zap={zap} limit={100} height={900 - 36} width={300} />
        </div>
        <div className="rep-tank">
          <div id="preview-window" ref={previewWindow} style={{ visibility: 'collapse', position: 'absolute', zIndex: 2000, top: `${0}px`, left: `${850}px`, border: '1px solid black', backgroundColor: 'rgba(255, 255, 255, 0.9)', width: `${1920 * 0.4}px`, height: `${1080 * 0.4}px` }}></div>
          <div dangerouslySetInnerHTML={{ __html: complex.name }}></div>
          <div>
            tags:<br />
            <TagListView
              aggregate={complex.tags}
            />
          </div>
          <hr />
          <div className="tank_1">
            <Tank ref={tank} top={400} />
          </div>
          <table style={{ border: 1 }}>
          {
            complex.lineup.map((simultaneous) => {
              return (
                <tr>
                  <td>{simultaneous.index_number}</td>
                  <td>{simultaneous.body}</td>
                </tr>
              );
            })
          }
          </table>
        </div>
        <div className="controller_1">
          <RzController
            ref={controller}
            api={'https://razor-edge.net/gold'}
            applyDiscs={(value) => {
              tank.current.setAllDiscs({ value: value.value }); }
            }
            resource={'bottles'}
            json={``}
            rotate={(value) => { tank.current.rotate(value); }}
          />
        </div>
      </div>
    </>
  );
/*  
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ overflow: 'hidden', backgroundColor: 'olive', width: '25vw' }}>
        <RzController api={'https://razor-edge.net/gold/'} applyDiscs={() => {}} resource={'Matrix'} json={`{\n\t"subjects": [[""]], \n\t"vbards": [""], \n\t"replies": [[""]]\n}`} />
      </div>
      <div style={{ border: '1px solid black;', width: '25vw', height: '90vh' }} />
    </div>
  );
*/
};
