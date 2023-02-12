import React, { useEffect } from "react";
import { getFriends, getFriendsByRelation, getFriendsRequest, postAcceptFriendRequest, postFriendRequest } from "../../services/friends.service";
import { Relation } from "../../types/relation.type";

let FriendsRequestList: React.FC = () => {

  let [friendsRequests, setFriendsRequests] = React.useState<any[]>([]);

  useEffect(()=> {
    handleGetFriendsRequest();
  }, []);

  const handleGetFriendsRequest = React.useCallback(async () => {
    try {
        console.log(await getFriendsRequest())
        setFriendsRequests(await getFriendsRequest())
    } catch (error) {
        console.error(error);
    }
  }, []);

  const handlePostAcceptFriendRequest = React.useCallback(async (userId: number, relation: Relation) => {
    console.log(userId, relation)
    try {
        setFriendsRequests(await postAcceptFriendRequest(userId , relation))
    } catch (error) {
        console.error(error);
    }
  }, []);

  return (
    <>
        <table className="border-collapse border border-slate-500">
            <thead>
                <tr>
                    <th className="border border-slate-600">User</th>
                    <th className="border border-slate-600">Relation</th>
                    <th className="border border-slate-600">Accept</th>
                    <th className="border border-slate-600">Refuse</th>
                </tr>
            </thead>
            <tbody>
                {friendsRequests && friendsRequests.map(friendsRequest =>
                  <tr key={friendsRequest.id}>
                        <td className="border border-slate-700"><a href={`post/${friendsRequest.user.id}`}>{friendsRequest.user.name}</a></td>
                        <td className="border border-slate-700">{friendsRequest.relation}</td>
                        <td className="border border-slate-700"><button onClick={() => handlePostAcceptFriendRequest(friendsRequest.user.id, friendsRequest.relation)}>Accept</button></td>
                        <td className="border border-slate-700">Refuse</td>
                  </tr>
              )}
            </tbody>
            </table>
        <button onClick={handleGetFriendsRequest}>Get Friends Request</button>
    </>
  );
};

export default FriendsRequestList;