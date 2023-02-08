import React, { useEffect } from "react";
import { useState } from "react";
import { getRessourceById } from "../../services/ressources.service";
import { getUserInfosById } from "../../services/user.service";
import PostType from "../../types/post.type";
import UserType from "../../types/user.type";
import Navbar from "../Navbar";

let Post: React.FC = () => {

    let [postById, setPostById] = React.useState<PostType>({} as PostType);

    let url = window.location.pathname;
    let postId = parseInt(url.substring(url.lastIndexOf('/') + 1));

    useEffect(()=> {
      handleGetPostById();
    }, []);

    const handleGetPostById = React.useCallback(async () => {
      setPostById(await getRessourceById(postId));
      console.log(getRessourceById(postId))
    }, []);

    const { id, access, value, comments, catalogue} = postById;

    return (
      <>
        <Navbar />
        
        <div className="container">
          <p>
            <strong>id:</strong> {id? id : "Not available"}
          </p>
          <p>
            <strong>access:</strong> {access? access : "Not available"}
          </p>
          <p>
            <strong>value:</strong> {value? value : "Not available"}
          </p>
          <p>
            <strong>comments:</strong> {comments? comments : "Not available"}
          </p>
        </div>
      </>
    );
};
export default Post;