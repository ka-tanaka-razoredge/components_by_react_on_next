import React, { useState } from 'react';
import Ml from './Ml';

export default (props) => {
  const [aggregate, setAggregate] = useState(
    [
      {
        id: `first`,
        alias: '浹',
        style: { color: 'red', backgroundColor: 'black' },
        m: '\"\"',
        l:
`<pre><code>(m) => {
  throw new CustomEvent("sudden death");
}</pre></code>
          `
      },
      {
        id: `second`,
        alias: '漲',
        style: {},
        m: '\"冗長なメッセージを入れてみました\"',
        l:
`<pre><code>(m) => {
  bloom();
}</pre></code>
          `
      }
    ]
  );
  
  return (
    <div>
    {
      props.aggregate.map((v, index) => {
        return (
          <Ml singleton={ v } />
        )
      })
    }
    </div>
  )
}