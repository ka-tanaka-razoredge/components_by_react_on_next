import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Launcher from '@/components/my_twitter/molecules/Launcher';
import Sender from '@/components/my_twitter/molecules/Sender';

type Props = {
  addressed?: any;
  onPostSuccess?: () => void;
  apiBaseUrl?: string;
  accessTokenKey?: string;
};

export default (props: Props) => {
  const router = useRouter();
  const apiBaseUrl = props.apiBaseUrl ?? 'https://razor-edge.net:3110';
  const accessTokenKey =
    props.accessTokenKey ?? 'my-twitter-for-razoredge_access-token';
  const [tweet, setTweet] = useState(null);
  const [posting, setPosting] = useState(false);
  const [postStatus, setPostStatus] = useState('');
  const [tagValue, setTagValue] = useState('');
  const [tagPosting, setTagPosting] = useState(false);
  const [tagStatus, setTagStatus] = useState('');

  const doIt = async (value, title) => {
    const normalizedTitle = title.trim();
    const normalizedTagValue = tagValue.trim();
    const queryTweetId = router.query.id;
    const tweetId =
      typeof queryTweetId === 'string' &&
      /^[1-9]\d*$/.test(queryTweetId)
        ? Number(queryTweetId)
        : undefined;
    const token = localStorage.getItem(accessTokenKey);
    if (!token) {
      router.replace('/');
      return;
    }

    setPosting(true);
    setPostStatus('');

    try {
      const tweetResponse = await axios({
        method: tweetId === undefined ? 'post' : 'patch',
        url:
          tweetId === undefined
            ? `${apiBaseUrl}/tweets`
            : `${apiBaseUrl}/tweets/${tweetId}`,
        data: {
          value,
          ...(normalizedTitle ? { title: normalizedTitle } : {}),
        },
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (tweetId === undefined && props.addressed?.tweetId) {
        await axios.post(
          `${apiBaseUrl}/tweet-relations`,
          {
            subject: tweetResponse.data.tweetId,
            object: props.addressed.tweetId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
      }

      if (normalizedTagValue && tweetId === undefined) {
        const tagResponse = await axios.post(
          `${apiBaseUrl}/tags`,
          { value: normalizedTagValue },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        await axios.post(
          `${apiBaseUrl}/tags-records`,
          {
            tag_id: tagResponse.data.id,
            table_name: 'tweets',
            record_id: tweetResponse.data.tweetId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          },
        );
        setTagValue('');
      }
      setPostStatus('posted');
      props.onPostSuccess?.();
    } catch (e) {
      console.log(e);
      setPostStatus('post failed');
    } finally {
      setPosting(false);
    }
  };

  return (
    <div>
      <div>{`I refer ${props.addressed?.tweetId}`}</div>
      <Launcher
        doIt={doIt}
        initialTitle={tweet?.title}
        initialValue={tweet?.value}
        posting={posting}
      />
      <Sender />
    </div>
  );
};
