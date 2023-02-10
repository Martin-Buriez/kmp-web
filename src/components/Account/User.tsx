import React, { useEffect } from "react";
import { postFriendRequest } from "../../services/friends.service";
import { getUserInfosById } from "../../services/user.service";
import UserType from "../../types/user.type";
import Navbar from "../Navbar";

let Profile: React.FC = () => {

    let [userById, setUserById] = React.useState<UserType>({} as UserType);

    let url = window.location.pathname;
    let userId = parseInt(url.substring(url.lastIndexOf('/') + 1));

    let relation = 'Famille'

    useEffect(()=> {
      handleGetUserById();
    }, []);

    const handleGetUserById = React.useCallback(async () => {
      setUserById(await getUserInfosById(userId));
    }, []);

    const handlePostFriendRequest = React.useCallback(async () => {
      await postFriendRequest(userId, relation)
    }, []);

    const { name, lastName, email, birthday, address, zipCode} = userById;

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
        <button onClick={handlePostFriendRequest}>Add friend</button>
      </>
    );
};
export default Profile;