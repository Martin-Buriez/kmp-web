import React, { useEffect } from "react";
import { getCurrentUser } from "../../services/auth.service";
import { getCurrentUserInfos } from "../../services/user.service";
import UserType from "../../types/user.type";
import UserActivityList from "../Activity/UserActivityList";
import FriendsList from "../Friends/FriendsList";
import FriendsRequestList from "../Friends/FriendsRequestList";

let Profile: React.FC = () => {

  let [currentUser, setCurrentUser] = React.useState<UserType>({} as UserType);

  useEffect(()=> {
    handleGetUser();
  }, []);

  const handleGetUser = React.useCallback(async () => {
    setCurrentUser(await getCurrentUserInfos());
  }, []);

  const { name, lastName, email, birthday, address, zipCode} = currentUser;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6">Mon profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-b md:border-b-0 md:border-r pb-4 md:pr-4">
              <h2 className="text-lg font-bold mb-2">Informations personnelles</h2>
              <p>
                <strong>Prénom :</strong> {name? name : "Not available"}
              </p>
              <p>
                <strong>Nom :</strong> {lastName? lastName : "Not available"}
              </p>
              <p>
                <strong>Email :</strong> {email? email : "Not available"}
              </p>
              <p>
                <strong>Anniversaire :</strong> {birthday? birthday : "Not available"}
              </p>
            </div>
            <div className="pt-4 md:pl-4">
              <h2 className="text-lg font-bold mb-2">Informations d'adresse</h2>
              <p>
                <strong>Adresse :</strong> {address? address : "Not available"}
              </p>
              <p>
                <strong>Code postal :</strong> {zipCode? zipCode : "Not available"}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <FriendsList/>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <FriendsRequestList/>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <UserActivityList/>
        </div>
      </div>
    </>
  );
};
export default Profile;
