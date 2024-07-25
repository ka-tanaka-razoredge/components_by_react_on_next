import React, { useEffect, useState } from 'react';

export  type RzTableParameters = {
  horizontalKeys: string[];
  verticalKeys: string[];
  records: any[][];
  // 幅
  // 高さ
};

export const RzTable = (props: RzTableParameters) => {
  const [header, setHeader] = useState(props.verticalKeys);
  const [verticalKeys, setVerticalKeys] = useState(props.verticalKeys);
  const [records, setRecords] = useState(props.records);

  const drawHeader = (header) => {
    return (
      <tr>
      {
        header.map((v, i) => {
          return (<td>{ v }</td>)
        })
      }
      </tr>
    );
  };
  
  const drawRecord = (headlesses, index) => {
    return (
      <tr>
        <td dangerouslySetInnerHTML={{ __html: verticalKeys[index] }}></td>
        {
          headlesses.map((v, i) => {
            return (<td dangerouslySetInnerHTML={{ __html: v }}></td>)
          })
        }
      </tr>
    );
  };

  return (
    <div>
      <table>
        { drawHeader(props.horizontalKeys) }
        { verticalKeys.map((v, i) => drawRecord(records[i], i)) }
      </table>
    </div>
  );
};