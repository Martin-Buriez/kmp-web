import React from "react";
import { getCurrentUser } from "../../services/auth.service";
import Navbar from "../Navbar";

const Profile: React.FC = () => {
  const currentUser = getCurrentUser();
  console.log('currentUser', currentUser);

  return (
    <>
      <Navbar />
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
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