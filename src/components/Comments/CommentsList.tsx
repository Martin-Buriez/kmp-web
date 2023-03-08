import React, { useEffect } from "react";
import { getCommentByRessourceId } from "../../services/comments.service";
import CommentListType from "../../types/comment.type";

let CommentList: React.FC = () => {

  let [comments, setComments] = React.useState<CommentListType[]>();

  useEffect(()=> {
    handleGetComments();
  }, []);

  let url = window.location.pathname;
  let postId = parseInt(url.substring(url.lastIndexOf('/') + 1));

  const handleGetComments = React.useCallback(async () => {
    try {
        setComments(await getCommentByRessourceId(postId))
    } catch (error) {
        console.error(error);
    }
  }, []);
  return (
    <>
      <br />
      {comments && comments.map(comment =>
        <div key={comment.id} className="border border-slate-500 p-2 my-2">
          <p className="font-semibold">{comment.user.name} {comment.user.lastName} a dit :</p>
          <p><a href={`/post/${postId}/comment/${comment.id}`}>{comment.value}</a></p>
        </div>
      )}
    </>
  );
  
};

export default CommentList;