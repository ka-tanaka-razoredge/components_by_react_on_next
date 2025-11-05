import { useState } from 'react';

export default ({ comingIfs, firstY, secondY }) => {
  const [ifs, setIfs] = useState(comingIfs);

  return (
    <>
      <style>
      {
        `
          .upper {
            height: 0.5rem;
            background-color: rgba(0, 0, 0, 0.1);
          }

          .middle {
            display: flex;
          }
          
          .lefty {
            width: 1rem;
            height: 3rem;
            background-color: rgba(0, 0, 0, 0.1);
          }
          
          .righty {
            width: 1rem;
            height: 3rem;
            background-color: rgba(0, 0, 0, 0.1);
          }

          .lower {
            height: 0.5rem;
            background-color: rgba(0, 0, 0, 0.1);
          }
          
          .floater {
            animation: spin 2s linear infinite;
          }
          
          @keyframes spin {
            0% {
              transform: translateY(var(--first-y));
            }
            100% {
              transform: translateY(var(--second-y));
            }
          }
        `
      }
      </style>
      <div>
        <div className="upper"></div>
        <div className="middle">
          <div className="lefty"></div>
          <div style={{ flex: 1, height: `${3}rem`, overflow: 'hidden' }}>
            <div
              className="floater"
              style={{ '--first-y': `${firstY}rem`, '--second-y': `${secondY}rem` }}
            >
            {
              ifs.reverse().map((v) => {
                return (
                  <div dangerouslySetInnerHTML={{ __html: v }}>
                  </div>
                )
              })
            }
            </div>
          </div>
          <div className="righty"></div>
        </div>
        <div className="lower"></div>
      </div>
    </>
  );

};
