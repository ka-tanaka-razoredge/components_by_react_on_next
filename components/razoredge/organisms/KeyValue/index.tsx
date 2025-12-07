import React, { useEffect, useState } from 'react';
import Carousel from '../../../components/Carousel';

export default () => {
  const [messageMaps, setMessageMaps] = useState({
    'default': [
      { key: `ありがた迷惑`, value: `` },
      { key: `売り言葉/* ゼビウス */`, value: `` },
      { key: `煽て|尻馬`, value: `` },
      { key: `ボケable`, value: `` },
      { key: `ツッコミable`, value: `` },
    ],
    anger: [
      { key: `ありがた迷惑`, value: `` },
      { key: `売り言葉/* ゼビウス */`, value: `` },
      { key: `煽て|尻馬`, value: `` },
      { key: `ボケable`, value: `` },
      { key: `ツッコミable`, value: `` },
    ],
  });
  
  useEffect(() => {
  }, []);
  
  const renderPage = (key, value) => {
    return (
      <>
      </>
    );
  };

  return (
    <>
      <div className='container-for-character-designer'>
        <div className='key-region'>
          ありがた迷惑
        </div>
        <div className='value-region'>
          <input style={{ width: '100%'}} type='text' />
        </div>
      </div>

      <div className='container-for-character-designer'>
        <div className='key-region'>
          売り言葉/* ゼビウス */
        </div>
        
        <div className='value-region'>
          <input style={{ width: '100%'}} type='text' />
        </div>
        
        <div className='key-region'>
          煽て|尻馬
        </div>
        <div className='value-region'>
          <input style={{ width: '100%'}} type='text' />
        </div>
        
        <div className='key-region'>
          ボケable
        </div>
        
        <div className='value-region'>
          <input style={{ width: '100%'}} type='text' />
        </div>
        
        <div className='key-region'>
          ツッコミable
        </div>
        <div className='value-region'>
          <input style={{ width: '100%'}} type='text' />
        </div>
      </div>
    </>
  );
};
