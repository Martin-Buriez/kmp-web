import React, { useEffect } from "react";
import { useState } from "react";
import { getCurrentUserInfos } from "../../services/user.service";
import UserType from "../../types/user.type";
import UserActivityList from "../Activity/UserActivityList";
import FriendsList from "../Friends/FriendsList";
import FriendsRequestList from "../Friends/FriendsRequestList";
import Navbar from "../Navbar";

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
      <Navbar />
      <div className="container">
        <p>
          <strong>Name:</strong> {name? name : "Not available"}
        </p>
        <p>
          <strong>LastName:</strong> {lastName? lastName : "Not available"}
        </p>
        <p>
          <strong>Email:</strong> {email? email : "Not available"}
        </p>
        <p>
          <strong>Birthday:</strong> {birthday? birthday : "Not available"}
        </p>
        <p>
          <strong>Adress:</strong> {address? address : "Not available"}
        </p>
        <p>
          <strong>ZipCode:</strong> {zipCode? zipCode : "Not available"}
        </p>
      </div>
      <FriendsRequestList/>
      <FriendsList/>
      <UserActivityList/>
    </>
  );
};
export default Profile;