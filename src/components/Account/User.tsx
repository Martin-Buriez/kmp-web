import React, { useEffect } from "react";
import { getUserInfosById } from "../../services/user.service";
import UserType from "../../types/user.type";
import Navbar from "../Navbar";

let Profile: React.FC = () => {

    let [userById, setUserById] = React.useState<UserType>({} as UserType);

    let url = window.location.pathname;
    let userId = parseInt(url.substring(url.lastIndexOf('/') + 1));

    useEffect(()=> {
      handleGetUserById();
    }, []);

    const handleGetUserById = React.useCallback(async () => {
      setUserById(await getUserInfosById(userId));
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
      </>
    );
};
export default Profile;