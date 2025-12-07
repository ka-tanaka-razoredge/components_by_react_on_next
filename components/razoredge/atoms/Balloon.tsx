import React from 'react';

const Balloon = (props) => {
/*    
    <div className="c-balloon -btn-left">
      <div className="c-balloon__body -speaking" style={{ padding: `8px 24px` }}>
        <div className="c-balloon__text">
          <div dangerouslySetInnerHTML={{ __html: props.text }}></div>
          <span className="c-balloon__shapes">
            <span className="c-balloon__before"></span>
            <span className="c-balloon__after"></span>
          </span>
        </div>
      </div>
    </div>
*/
  return (
    <div className="c-balloon__body -speaking" style={{ padding: `8px 24px` }}>
      <div className="c-balloon__text">
        <div dangerouslySetInnerHTML={{ __html: props.text }}></div>
        <span className="c-balloon__shapes">
          <span className="c-balloon__before"></span>
          <span className="c-balloon__after"></span>
        </span>
      </div>
    </div>
  );
};

Balloon.defaultProps = {
  text: `八方塞がりの夜が来そうな夕暮れ<br />ふっと銃爪引きそうになる`
};

export default Balloon;