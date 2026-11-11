import React, { useState, useEffect } from "react";

import Modal from "@/components/razoredge/atoms/Modal";
import Tweet from "@/components/my_twitter/molecules/Tweet";
import Editor from "@/components/my_twitter/organisms/Editor";

type Props = {
  aggregate?: any;
  style?: any;
  source?: string;
  refreshKey?: number;
  onPostSuccess?: () => void;
  apiBaseUrl?: string;
  accessTokenKey?: string;
  tweetsById?: Record<number, any>;
  relationsBySubject?: Record<number, TweetRelation>;
  onImageClick?: (image: { src: string; alt: string }) => void;
};

type TweetRelation = {
  id: number;
  subject: number;
  object: number;
  verb: string;
  index: number | null;
};

const collectTweetsById = (items: any, tweetsById: Record<number, any>) => {
  if (!Array.isArray(items)) {
    return;
  }

  items.forEach((item) => {
    if (Array.isArray(item)) {
      collectTweetsById(item, tweetsById);
    } else if (typeof item?.tweetId === "number") {
      tweetsById[item.tweetId] = item;
    }
  });
};

export default (props: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [aggregate, setAggregate] = useState(
    Array.isArray(props.aggregate[0]) ? props.aggregate[0] : props.aggregate
  );
  const [pageNumber, setPageNumber] = useState(0);
  const [addressed, setAddressed] = useState(null);
  const tweetsById = props.tweetsById ?? {};
  if (!props.tweetsById) {
    collectTweetsById(props.aggregate, tweetsById);
  }

  useEffect(() => {
    setAggregate(
      Array.isArray(props.aggregate[0])
        ? props.aggregate[pageNumber] ?? []
        : props.aggregate
    );
  }, [pageNumber, props.aggregate]);

  const drawIndents = (tweet) => {
    if ("indents" in tweet) {
      const indents = Array(tweet.indents).fill(null);
      return indents.map((v) => {
        return (
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 1.0)",
              width: "1rem",
            }}
          ></div>
        );
      });
    }
  };

  const showReply = () => {};

  const doReply = () => {};

  const handlePostSuccess = () => {
    setModalVisible(false);
    props.onPostSuccess?.();
  };

  return (
    <>
      <style>
        {`
          .tweet-list-view {
            .item {
              display: flex;
            }
            
            .content {
              flex: 1;
            }
          }

          .editor-container {
            width: 1000px;
          }
        `}
      </style>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <div className="editor-container">
          <Editor
            addressed={addressed}
            onPostSuccess={handlePostSuccess}
            apiBaseUrl={props.apiBaseUrl}
            accessTokenKey={props.accessTokenKey}
          />
        </div>
      </Modal>
      <div className="tweet-list-view">
        <div
          style={{
            display: "flex",
            position: "sticky",
            top: 0,
            zIndex: 1,
            backgroundColor: "white",
          }}
        >
          <div
            onClick={(e) => {
              if (0 < pageNumber) setPageNumber(pageNumber - 1);
            }}
          >
            &lt;
          </div>
          <div style={{ width: "1rem" }}></div>
          <div
            onClick={(e) => {
              if (pageNumber < props.aggregate.length - 1)
                setPageNumber(pageNumber + 1);
            }}
          >
            &gt;
          </div>
        </div>
        {aggregate.map((v, index) => {
          if (!props.source) {
            return (
              <div
                style={{ border: `${1}px solid silver`, margin: `${0.25}rem` }}
              >
                {v.caption && (
                  <div style={{ display: "flex", margin: `${0.25}rem` }}>
                    <div dangerouslySetInnerHTML={{ __html: v.caption }}></div>
                  </div>
                )}
                <div
                  key={index}
                  className="item"
                  className="item"
                  style={{ ...props.style }}
                >
                  {drawIndents(v)}
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: v.value }}
                  ></div>
                </div>
              </div>
            );
          } else {
            return (
              <Tweet
                key={v.tweetId}
                tweet={v}
                style={props.style}
                refreshKey={props.refreshKey}
                setModalVisible={setModalVisible}
                setAddressed={setAddressed}
                onPostSuccess={props.onPostSuccess}
                apiBaseUrl={props.apiBaseUrl}
                accessTokenKey={props.accessTokenKey}
                tweetsById={tweetsById}
                relation={props.relationsBySubject?.[v.tweetId]}
                onImageClick={props.onImageClick}
              />
            );
          }
        })}
      </div>
    </>
  );
};
