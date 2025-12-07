import React from 'react';
import RzSelect from '../../../atoms/RzSelect';

export default ({
  subject = '株',
  blades = [
    '!逆説',
    '逆説'
  ],
}) => {
  return (
    <div>
      <style>
      {
        `
          .blade {
            margin-left: 1rem;
            margin-right: 1rem;
          }
        `
      }
      </style>
      <div><div dangerouslySetInnerHTML={{ __html: subject  }}></div></div>
      <div className="blade">
        <RzSelect options={blades.map((v) => v)} />
{/*      
        <select>
        {
          blades.map((blade, index) => {
            return (
              <option key={index} value={index} style={blade.style} dangerouslySetInnerHTML={{ __html: blade.value }}></option>
            )
          })
        }
        </select>
*/}        
      </div>
    </div>
  );
};
