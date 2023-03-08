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
      <div className="container mx-auto my-5 px-4 py-2 bg-gray-100 rounded-lg shadow-md">
        <p className="text-lg font-bold">
          {name || "Non disponible"} {lastName || "Non disponible"}
        </p>
        <p>
          <strong>Email :</strong> {email || "Non disponible"}
        </p>
        <p>
          <strong>Anniversaire :</strong> {birthday || "Non disponible"}
        </p>
        <p>
          <strong>Adresse :</strong> {address || "Non disponible"}
        </p>
        <p>
          <strong>Code postal :</strong> {zipCode || "Non disponible"}
        </p>
      </div>
      <label className="block my-3">
        <span className="text-gray-700 font-bold">Type de relation :</span>
        <select
          value={relation}
          onChange={handleSetRelation}
          className="ml-3 px-3 py-1 border border-gray-500 rounded-md"
        >
          <option value="connaissance">Connaissance</option>
          <option value="amis">Amis</option>
          <option value="famille">Famille</option>
        </select>
      </label>
      <button
        onClick={handlePostFriendRequest}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
      >
        Ajouter en tant que {relation}
      </button>
    </>
  );
};

export default Profile;
