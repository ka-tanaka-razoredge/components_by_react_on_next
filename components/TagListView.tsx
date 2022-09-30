import React, { useState } from 'react';
import Tag from './Tag';

export default (props) => {
  const [aggregate, setAggregate] = useState(props.aggregate);
  return (
    <div style={{ display: 'flex' }}>
    {
      aggregate.map((v) => {
        return (
          <Tag value={ v.value } />
        )
      })
    }
    </div>
  )
}