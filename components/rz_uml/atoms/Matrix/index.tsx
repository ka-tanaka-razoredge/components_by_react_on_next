import React from 'react';

type Props = {
  subjects: [],
  topic: any,
  replies: [],
};

export default (props) => {
  const {
    subjects,
    topic,
    replies,
    topics,
    vbards,
  } = props;

  const drawTopics = () => {
    if (topic) { // TODO: I will remove
      if (!Array.isArray(topic)) {
        return (
          <div className="cell" style={{ textAlign: 'center' }}>
            <div dangerouslySetInnerHTML={{ __html: topic }}></div>
          </div>
        );
      } else {
        return topic.map((v, index) => {
          return (
            <div className="cell" style={{ textAlign: 'center' }}>
              <div dangerouslySetInnerHTML={{ __html: v }}></div>
            </div>
          )
        });
      }
    } else if (topics) {
      if (!Array.isArray(topics)) {
        // TODO: I will remove
        return (
          <div className="cell" style={{ textAlign: 'center' }}>
            <div dangerouslySetInnerHTML={{ __html: topics }}></div>
          </div>
        );
      } else {
        return topics.map((v, index) => {
          return (
            <div className="cell" style={{ textAlign: 'center' }}>
              <div dangerouslySetInnerHTML={{ __html: v }}></div>
            </div>
          )
        });
      }
    } else {
        return vbards.map((v, index) => {
          return (
            <div className="cell" style={{ textAlign: 'center' }}>
              <div dangerouslySetInnerHTML={{ __html: v }}></div>
            </div>
          );
        });
    }
  };

  return (
    <div>
      <style>
      {
        `
          .cell {
            border: 1px solid black;
            flex: 1;
          }
          
          .mother-board {
            width: 250px;
          }
        `
      }
      </style>
      <div className="mother-board">
        <div style={{ display: 'flex' }}>
        {
          subjects.map((subject, index) => {
            return (
              <div key={index} className="cell">
                <div dangerouslySetInnerHTML={{ __html: subject }}></div>
              </div>
            )
          })
        }
        </div>
        
        <div style={{ display: 'flex' }}>
        {
          drawTopics()
        }
        </div>

        <div style={{ display: 'flex' }}>
        {
          replies.map((reply, index) => {
            return (
              <div key={index} className="cell">
                <div dangerouslySetInnerHTML={{ __html: reply }}></div>
              </div>
            )
          })
        }
        </div>
      </div>
    </div>
  );
};
