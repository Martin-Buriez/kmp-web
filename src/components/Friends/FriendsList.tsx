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
        <table className="border-collapse border border-slate-500">
            <thead>
                <tr>
                    <th className="border border-slate-600">User</th>
                    <th className="border border-slate-600">Relation</th>
                </tr>
            </thead>
            <tbody>
                {friends && friends.map(friends =>
                  <tr key={friends.id}>
                        <td className="border border-slate-700"><a href={`post/${friends.friend.name}`}>{friends.friend.name}</a></td>
                        <td className="border border-slate-700">{friends.relation}</td>
                  </tr>
              )}
            </tbody>
            </table>
        <button onClick={handleGetFriendsRequest}>Get Friends Request</button>
    </>
  );
};

export default FriendsRequestList;