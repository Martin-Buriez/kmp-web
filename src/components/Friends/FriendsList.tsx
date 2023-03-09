import React, { useEffect } from "react";
import { getFriends } from "../../services/friends.service";

let FriendsRequestList: React.FC = () => {

  let [friends, setFriends] = React.useState<any[]>([]);

  useEffect(()=> {
    handleGetFriendsRequest();
  }, []);

  const handleGetFriendsRequest = React.useCallback(async () => {
    try {
        setFriends(await getFriends())
    } catch (error) {
        console.error(error);
    }
  }, []);

  return (
    <>
      {friends && friends.map(friend => (
        <div key={friend.id} className="border border-slate-500 p-2 mb-2">
          <div className="font-semibold">Utilisateur : <a href={`post/${friend.friend.name}`}>{friend.friend.name}</a></div>
          <div className="font-semibold">Relation : {friend.relation}</div>
        </div>
      ))}
    </>
  );
  
};

export default FriendsRequestList;