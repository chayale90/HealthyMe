import React, { useEffect, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { toast } from 'react-toastify';
import { API_URL, doApiGet } from '../../../../../services/apiService';
import CheckUserActiveComp from '../../../../auth/checkComps/checkUserActiveComp';
import UserLikeItem from './userLikeItem';
import LoadingComp from '../../../../general_comps/loadingComp';

export default function UsersLikesList({ foodID }) {
  // const { userIdFollowers } = useSelector(myStore => myStore.dialogSlice);

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    loadMore()
  }, [hasNextPage])


  const loadMore = async () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);
    try {
      let url = API_URL + `/foods/usersLikesFood/${foodID}?page=${page}`;
      let resp = await doApiGet(url);
      // console.log(resp.data);
      setItems([...items, ...resp.data]);
      setHasNextPage(resp.data.length == 0);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
      console.log(err);
      toast.error("there problem ,try again later");
    }
  };

  const { sentryRef } = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: '0px 600px 0px 0px',
  });

  return (
    <div>
      <CheckUserActiveComp />
      {items.map((item, i) => {
        return (
          <UserLikeItem key={item._id} index={i} item={item} />
        )
      })}
      {(loading) && (
        <div ref={sentryRef}>
          <LoadingComp minHeight="100px" size="40px" />
        </div>
      )}
    </div>
  );
};