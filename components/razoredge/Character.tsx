// @ts-nocheck

import React, {useImperativeHandle, useState, useRef} from 'react';
import YamlItem from './YamlItem';
import Accordion from './atoms/Accordion';
//import Chara from '../../types/Character';
import {Character as Chara} from './bo/Character';
import RzCarousel from './RzCarousel';
import Dcoml from './disc_system/Dcoml';

export default React.forwardRef((props, ref) => {
  const specialHolds = useRef();
  const pleasants = useRef();
  const unpleasants = useRef();
  
  const [contentsForDcomlsInCarousel, setContentsForDcomlsInCarousel] = useState([[]]);

  const [character, setCharacter] = useState({
    boilingPoint: ``,
    shs: [
      { subject: ``, represent: true },
    ],
    pleasants: [
      { subject: ``, represent: true },
    ],
    unpleasants: [
      { subject: ``, represent: true },
    ],
    yaml: '',
    dog: '',
  });

  useImperativeHandle(ref, () => ({
    setCharacter: (value) => {
      setCharacter(value);
      specialHolds.current.setAggregate(value.shs);
      pleasants.current.setAggregate(value.pleasants);
      unpleasants.current.setAggregate(value.unpleasants);
      
      const contents = [];
      Object.keys(value.dcomls).map((key) => {
        contents.push({ html: (<Dcoml aggregate={value.dcomls[key]} />) });
      });
console.log('---- begin ----');
console.log(contents);
console.log('---- end ----');
      setContentsForDcomlsInCarousel(contents);
    }
  }));
  
  return (
    <div>
      <style>
      {
        `
          .q {
            color: white;
            background-color: silver;
            width: 10rem;
          }
        `
      }
      </style>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '25vw' }}>
          {/* <img src={} /> */}
          {/* TODO: carousel */}
        </div>
        <div>
          <div dangerouslySetInnerHTML={{ __html: character.yaml }}>
          </div>
          <div style={{ height: '10px' }}></div>
          <div>
            <div style={{ display: 'flex' }}>
              <div className='q'>沸点</div>
              <div style={{ width: '10px' }}></div>
              <div>{character.boilingPoint}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '10rem' }}>拾えない捨て犬</div>
              <div style={{ width: '10px' }}></div>
              <div>{character.dog}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className='q'>特技</div>
              <Accordion ref={specialHolds} aggregate={character.shs} />
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '10rem' }}>得手</div>
              <Accordion ref={pleasants} aggregate={character.pleasants} />
            </div>
            <div style={{ display: 'flex' }}>
              <div className='q'>不得手</div>
              <div style={{ width: '10px' }}></div>
              <Accordion ref={unpleasants} aggregate={character.unpleasants} />
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '10rem' }}>マディソン郡の橋</div>
              <div style={{ width: '10px' }}></div>
              <div>{character.theBridgesOfMadisonCountry}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className='q'>Guest roleや被害者 roleにassignされたら</div>
              <div style={{ width: '10px' }}></div>
              <div>{character.qualified}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '10rem' }}>eel under the radar</div>
              <div style={{ width: '10px' }}></div>
              <div>{character.eelUnderTheRadar}</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div className='q' style={{ width: '10rem' }}>mdvs: 2 or moreの課題</div>
              <div style={{ width: '10px' }}></div>
              <div>{(character.mdvsTwoOrMore) ?? '' }</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '10rem' }}>著名人でもないのにFacebookの友人数が100以上</div>
              <div style={{ width: '10px' }}></div>
              <div>{(character.friend100Over) ?? ''}</div>
            </div>
          </div>
          <hr />
          <RzCarousel contents={contentsForDcomlsInCarousel}  />
          <hr />
          <div>{/* history */}
            <div>summary</div>
            <div style={{ marginLeft: '10px'}} dangerouslySetInnerHTML={{ __html: character.summary }}></div>
          </div>
        </div>        
      </div>{/* the end of flex */}
    </div>
  );
});
