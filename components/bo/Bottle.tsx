// @ts-nocheck

import React from 'react';


export default (props) => {
  return (
    <div>
      { props.name }:
      <table border='1' style={{ width: props.width }}>
        <tr>
          <th>t</th>
          {
            props.sails.map((sail) => {
              return (<th>{ sail }</th>)
            })
          }
        </tr>
        {
          props.lineup.map((simultaneous) => {
            return (
              <tr>
                <td></td>
                {
                  simultaneous.map((v) => {
                    return (<td>{v}</td>)
                  })
                }
              </tr>
            )
          })
        }
      </table>
    </div>
  );
}
