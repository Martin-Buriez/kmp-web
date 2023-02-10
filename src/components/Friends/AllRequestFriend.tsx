import React, { useEffect } from "react";
import { getFriends, getFriendsByRelation, getFriendsRequest, postAcceptFriendRequest, postFriendRequest } from "../../services/friends.service";
import CommentListType from "../../types/comment.type";

let CommentList: React.FC = () => {

  let [friends, setFriends] = React.useState();

  useEffect(()=> {
    handleGetFriends();
  }, []);

  let url = window.location.pathname;
  let postId = parseInt(url.substring(url.lastIndexOf('/') + 1));

  const handleGetFriends = React.useCallback(async () => {
    try {
        setFriends(await getFriends())
        console.log('friends', friends)
    } catch (error) {
        console.error(error);
    }
  }, []);

  const handleGetFriendsByRelation = React.useCallback(async () => {
    try {
        console.log(await getFriendsByRelation('Famille'))
    } catch (error) {
        console.error(error);
    }
  }, []);

  const handleGetFriendsRequest = React.useCallback(async () => {
    try {
        console.log(await getFriendsRequest())
    } catch (error) {
        console.error(error);
    }
  }, []);

  const userId = 1
  const relation = 'famille'

  const handlePostFriendRequest = React.useCallback(async () => {
    try {
        console.log(await postFriendRequest(userId, relation))
    } catch (error) {
        console.error(error);
    }
  }, []);

  const handlePostAcceptFriendRequest = React.useCallback(async () => {
    try {
        console.log(await postAcceptFriendRequest(userId, relation))
    } catch (error) {
        console.error(error);
    }
  }, []);
  return (
    <>
      <br/>
      <button onClick={handleGetFriends}>Get Friends</button>
      <br/>
      <button onClick={handleGetFriendsByRelation}>Get Friends By Relation</button>
      <br/>
      <button onClick={handleGetFriendsRequest}>Get Friends Request</button>
      <br/>
      <button onClick={handlePostFriendRequest}>Post Friends Request</button>
      <br/>
      <button onClick={handlePostAcceptFriendRequest}>Post Accept Friends Request</button>

    </>
  );
};

export default CommentList;