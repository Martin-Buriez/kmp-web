import React, { useEffect, useState, useCallback } from "react";
import { postFriendRequest } from "../../services/friends.service";
import { getUserInfosById } from "../../services/user.service";
import { Relation } from "../../types/relation.type";
import UserType from "../../types/user.type";
import Navbar from "../Navbar";

const Profile: React.FC = () => {
  const [userById, setUserById] = useState<UserType>({} as UserType);
  const [relation, setRelation] = useState<Relation>("connaissance");

  const url = window.location.pathname;
  const userId = parseInt(url.substring(url.lastIndexOf("/") + 1));

  useEffect(() => {
    handleGetUserById();
  }, []);

  const handleGetUserById = useCallback(async () => {
    setUserById(await getUserInfosById(userId));
  }, [userId]);

  const handleSetRelation = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRelation(event.target.value as Relation);
  };

  const handlePostFriendRequest = useCallback(async () => {
    await postFriendRequest(userId, relation);
  }, [userId, relation]);

  const { name, lastName, email, birthday, address, zipCode } = userById;

  return (
    <>
      <Navbar />
      <div className="container">
        <p>
          <strong>Name:</strong> {name || "Not available"}
        </p>
        <p>
          <strong>LastName:</strong> {lastName || "Not available"}
        </p>
        <p>
          <strong>Email:</strong> {email || "Not available"}
        </p>
        <p>
          <strong>Birthday:</strong> {birthday || "Not available"}
        </p>
        <p>
          <strong>Adress:</strong> {address || "Not available"}
        </p>
        <p>
          <strong>ZipCode:</strong> {zipCode || "Not available"}
        </p>
      </div>
      <label>
        Type de relation :
        <select value={relation} onChange={handleSetRelation}>
          <option value="connaissance">Connaissance</option>
          <option value="amis">Amis</option>
          <option value="famille">Famille</option>
        </select>
      </label>
      <br />
      <button onClick={handlePostFriendRequest}>Ajouter en tant que {relation}</button>
    </>
  );
};

export default Profile;