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
        setFriendsRequests(await getFriendsRequest())
    } catch (error) {
        console.error(error);
    }
  }, []);

  const handlePostAcceptFriendRequest = React.useCallback(async (userId: number, relation: Relation) => {
    try {
        setFriendsRequests(await postAcceptFriendRequest(userId , relation))
    } catch (error) {
        console.error(error);
    }
  }, []);

  return (
    <>
      {friendsRequests &&
        friendsRequests.map((friendsRequest) => (
          <div key={friendsRequest.id} className="border border-slate-500 p-4 my-4">
            <div>
              <span className="font-bold">Utilisateur : </span>
              {friendsRequest.user.name} {friendsRequest.user.lastName}
            </div>
            <div>
              <span className="font-bold">Relation : </span>
              {friendsRequest.relation}
            </div>
            <div className="mt-2 flex">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
                onClick={() =>
                  handlePostAcceptFriendRequest(
                    friendsRequest.user.id,
                    friendsRequest.relation
                  )
                }
              >
                Accepter
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Refuser
              </button>
            </div>
          </div>
        ))}
    </>
  );
  
};

export default FriendsRequestList;