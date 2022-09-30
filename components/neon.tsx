import React, { useState, useMemo, useEffect } from 'react';

const Neon = () => {

    const [timer, setTimer] = useState(null);
    const [content, setContent] = useState('ooJudgement << ooGame_1');
    const [magazine, setMagazine] = useState([]);
    
    const [left, setLeft] = useState(0);

    const leftWithPx = useMemo(() => { return left + 'px'; }, [left]);   

    function doRoutine() {
        try {
            if (1 <= magazine.length) {
                console.log(magazine);
                let simultaneous = magazine.shift();
                simultaneous.map(doIt => {
                    console.log(doIt);
                    doIt();
                });
                console.log(left);
                console.log(document.getElementById('cursor'));
            }
        } catch (e) {
            console.log(e);
        }
    };
    
    function doIt() {
        magazine.push([() => {
            setLeft(0);
        }]);
        magazine.push([() => {
            setLeft(10);
        }]);
        magazine.push([() => {
            setLeft(20);
        }]);
        magazine.push([() => {
            setLeft(30);
        }]);
    };
    
    useEffect(() => {
        setTimeout(() => {
            console.log('---- setTimeout ----');
            if (timer) {
                clearInterval(timer);
                console.log('---- clearInterval ----');
            }
            setTimer(setInterval(() => { doRoutine(); }, 1000)); },
            1000
        );
    }, []);
    
    
    return (
        <div style={{position: 'relative'}}>
            <div id='cursor' style={{position: 'absolute', left: `${ leftWithPx }` , top: 0, zIndex: 1100, background: 'red'}}>&ensp;</div>
            <div style={{position: 'absolute', left: 0, top: 0, zIndex: 1110}} onClick={ doIt }>content</div>
        </div>
    );
}

export default Neon;