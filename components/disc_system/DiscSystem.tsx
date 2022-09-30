import React, { useEffect, useRef, useState } from 'react';

import Tank from './Tank';

export default (props) => {
    const tank = useRef();
    const load = props.load;
    let timer;
    let counter = 0;
    let magazine = [];
    
    useEffect(() => {
        timer = setInterval(doRoutine, 1000);
    }, []);
    
    const doRoutine = () => {
        if (counter === Number.MAX_SAFE_INTEGER) counter = 0;
        switch (counter) {
            case 0:
                eval(load());
                break;
            default:
                if (1 <= magazine.length) {
                  let simultaneous = magazine.shift();
                  simultaneous.map((doIt) => {
                    doIt();
                  });
                }
                break;
        }
        counter++;
    };

    return (
        <div>
            <Tank ref={tank}></Tank>
        </div>
    );
}