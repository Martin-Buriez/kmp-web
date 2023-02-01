import React, { useEffect } from "react";
import { getUserInfos } from "../../services/user-service";
import UserType from "../../types/user.type";
import Navbar from "../Navbar";

const Profile: React.FC = () => {
  let currentUser: UserType = {
    name: "",
    lastName: "",
    birthday: "",
    address: "",
    zipCode: "",
    email: "",
    password: ""
  };
  useEffect(() => {
    currentUser = getUserInfos() as any;
    console.log('currentUser', currentUser);
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.name}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Name:</strong> {currentUser.name}
        </p>
        <p>
          <strong>LastName:</strong> {currentUser.lastName}
        </p>
        <p>
          <strong>Email:</strong> {currentUser.email}
        </p>
        <p>
          <strong>Birthday:</strong> {currentUser.birthday}
        </p>
        <p>
          <strong>Adress:</strong> {currentUser.address}
        </p>
        <p>
          <strong>ZipCode:</strong> {currentUser.zipCode}
        </p>
      </div>
    </>
  );
};
export default Profile;