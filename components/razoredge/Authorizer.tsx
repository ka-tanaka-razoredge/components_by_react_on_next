import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    (async () => {
      const r = await axios.get(`https://razor-edge.net/gold/meta/`);
      if (r.data.status === 200) setLoggedIn(true);
    })();
  }, []);
  
  return (
    <div>
    {
      loggedIn && (
        <>
          {props.children}
        </>
      )
    }
    </div>
  );
};
