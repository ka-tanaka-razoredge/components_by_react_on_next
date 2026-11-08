import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

const TweetListView = dynamic(() => import('./TweetListView'));

type Props = {
  style?: any;
  refreshKey?: number;
  setModalVisible?: (value: React.SetStateAction<boolean>) => void;
  setAddressed?: (value: any) => void;
  onPostSuccess?: () => void;
  apiBaseUrl?: string;
  accessTokenKey?: string;
  tweetsById?: Record<number, Props['tweet']>;
  onImageClick?: (image: { src: string; alt: string }) => void;
  tweet: {
    tweetId: number;
    value: string;
  };
};

type TweetRelation = {
  subject: number;
};

const repliesPerPage = 5;

const Tweet = (props: Props) => {
  const apiBaseUrl = props.apiBaseUrl ?? 'https://razor-edge.net:3110';
  const accessTokenKey =
    props.accessTokenKey ?? 'my-twitter-for-razoredge_access-token';
  const [outgoingIds, setOutgoingIds] = useState<number[]>([]);
  const [incomingRelations, setIncomingRelations] = useState<
    TweetRelation[] | null
  >(null);
  const [incomingRelationCount, setIncomingRelationCount] = useState<
    number | null
  >(null);
  const [replies, setReplies] = useState<Props['tweet'][]>([]);
  const [repliesVisible, setRepliesVisible] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const handleContentClick = (event) => {
    if (!props.onImageClick) {
      return;
    }

    const image = (event.target as HTMLElement).closest('img');
    if (!(image instanceof HTMLImageElement)) {
      return;
    }

    event.preventDefault();
    props.onImageClick({
      src: image.currentSrc || image.src,
      alt: image.alt,
    });
  };
  const replyPages = replies.reduce<Props['tweet'][][]>(
    (pages, replyTweet, index) => {
      const pageIndex = Math.floor(index / repliesPerPage);
      if (!pages[pageIndex]) {
        pages[pageIndex] = [];
      }
      pages[pageIndex].push(replyTweet);
      return pages;
    },
    [],
  );

  useEffect(() => {
    const fetchOutgoing = async () => {
      const token = localStorage.getItem(accessTokenKey);
      if (!token) {
        return;
      }

      try {
        const response = await axios.get(
          `${apiBaseUrl}/tweet-relations/outgoing`,
          {
            params: {
              subject_id: props.tweet.tweetId,
              verb: 'refer',
            },
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setOutgoingIds(response.data.map((relation) => relation.object));
      } catch (error) {
        console.log(error);
      }
    };

    void fetchOutgoing();
  }, [accessTokenKey, apiBaseUrl, props.tweet.tweetId, props.refreshKey]);

  useEffect(() => {
    const fetchIncomingRelationCount = async () => {
      const token = localStorage.getItem(accessTokenKey);
      if (!token) {
        return;
      }

      try {
        const response = await axios.get(
          `${apiBaseUrl}/tweet-relations`,
          {
            params: { object: props.tweet.tweetId },
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setIncomingRelationCount(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };

    void fetchIncomingRelationCount();
  }, [accessTokenKey, apiBaseUrl, props.tweet.tweetId, props.refreshKey]);

  useEffect(() => {
    const fetchIncoming = async () => {
      const token = localStorage.getItem(accessTokenKey);
      if (!token) {
        return;
      }

      try {
        const response = await axios.get(
          `${apiBaseUrl}/tweet-relations/incoming`,
          {
            params: {
              object_id: props.tweet.tweetId,
              verb: 'refer',
            },
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setIncomingRelations(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    void fetchIncoming();
  }, [accessTokenKey, apiBaseUrl, props.tweet.tweetId, props.refreshKey]);

  const drawIndents = (tweet) => {
    if ('indents' in tweet) {
      const indents = Array(tweet.indents).fill(null);
      return (
        indents.map((v) => {
          return (<div style={{ backgroundColor: 'rgba(255, 255, 255, 1.0)', width: '1rem' }}></div>);
        })
      );
    }
  };

  const reply = () => {
    props.setModalVisible(true);
    props.setAddressed(props.tweet);
  };

  const showReplies = async () => {
    if (repliesVisible || replies.length > 0) {
      setRepliesVisible(false);
      setReplies([]);
      return;
    }

    const token = localStorage.getItem(accessTokenKey);
    if (!token) {
      return;
    }

    try {
      const fetchedReplies: Props['tweet'][] = [];
      let page = 1;

      while (true) {
        const relationsResponse = await axios.get(
          `${apiBaseUrl}/tweet-relations/incoming`,
          {
            params: {
              object_id: props.tweet.tweetId,
              verb: 'refer',
              page,
              limit: repliesPerPage,
            },
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const relations: TweetRelation[] = relationsResponse.data;
        if (page === 1) {
          setIncomingRelations(relations);
        }
        if (relations.length === 0) {
          break;
        }

        const replyTweets = relations
          .map((relation) => props.tweetsById?.[relation.subject])
          .filter(
            (tweet): tweet is Props['tweet'] =>
              tweet !== undefined,
          );
        if (replyTweets.length !== relations.length) {
          throw new Error('Some reply Tweets are not loaded');
        }
        fetchedReplies.push(
          ...replyTweets,
        );

        if (relations.length < repliesPerPage) {
          break;
        }
        page += 1;
      }

      setReplies(fetchedReplies);
      setRepliesVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const removeTweet = async () => {
    if (incomingRelationCount === null || incomingRelationCount > 0) {
      return;
    }

    if (!window.confirm('この Tweet と参照 relation を削除しますか？')) {
      return;
    }

    const token = localStorage.getItem(accessTokenKey);
    if (!token) {
      return;
    }

    setDeleting(true);
    try {
      await axios.delete(
        `${apiBaseUrl}/tweets/${props.tweet.tweetId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setDeleted(true);
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  };

  if (deleted) {
    return null;
  }

  return (
    <>
      <style>
      {
        `
          .container-for-replies {
            margin-top: 0.25rem;
            margin-left: 1rem;
          }
        `
      }
      </style>
      <div style={{ padding: '0.25rem 0.25rem', ...props.style }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            paddingRight: '1.25rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexWrap: 'wrap',
              minWidth: 0,
            }}
          >
            <div>id: </div>
            <div>{props.tweet.tweetId}</div>
            <div style={{ width: '0.25rem' }} />
            {outgoingIds.length > 0 && (
              <div>{`refer: [${outgoingIds.join(', ')}]`}</div>
            )}
          </div>
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1rem',
              height: '1rem',
              marginLeft: '0.25rem',
              padding: 0,
              lineHeight: 1,
              flexShrink: 0,
              position: 'absolute',
              top: '50%',
              right: 0,
              transform: 'translateY(-50%)',
            }}
            onClick={() => void removeTweet()}
            disabled={deleting || incomingRelationCount !== 0}
            title={
              incomingRelationCount === null
                ? '参照 relation を確認中です'
                : incomingRelationCount > 0
                  ? '他の Tweet から参照されているため削除できません'
                  : 'Tweet を削除'
            }
          >
            ×
          </button>
        </div>
        <div>
          <div style={{ display: 'flex', backgroundColor: 'white' }}>
            { drawIndents(props.tweet) }
            <div
              dangerouslySetInnerHTML={{ __html: props.tweet.value }}
              onClick={handleContentClick}
            ></div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button onClick={reply}>reply</button>
          <button
            onClick={() => void showReplies()}
            disabled={
              incomingRelations === null || incomingRelations.length === 0
            }
          >
            replies
          </button>
        </div>
        {repliesVisible && (
          <div className="container-for-replies">
            <TweetListView
              aggregate={replyPages}
              style={props.style}
              source="story science"
              refreshKey={props.refreshKey}
              onPostSuccess={props.onPostSuccess}
              apiBaseUrl={apiBaseUrl}
              accessTokenKey={accessTokenKey}
              tweetsById={props.tweetsById}
              onImageClick={props.onImageClick}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Tweet;
