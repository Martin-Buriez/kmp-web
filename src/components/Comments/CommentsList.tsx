import React, { useEffect } from "react";
import { getCommentByRessourceId } from "../../services/comments.service";
import CommentListType from "../../types/comment.type";
import PostListType from "../../types/post.type";
import Navbar from "../Navbar";

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
      <br/>
      <button onClick={handleGetComments}>Get Comments</button>
      <table className="border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th className="border border-slate-600">Id</th>
                        <th className="border border-slate-600">Value</th>
                    </tr>
                </thead>
                <tbody>
                    {comments && comments.map(comment =>
                      <tr key={comment.id}>
                            <td className="border border-slate-700"><a href={`post/${comment.id}`}>{comment.id}</a></td>
                            <td className="border border-slate-700">{comment.value}</td>
                      </tr>
                  )}
                </tbody>
            </table>
    </>
  );
};

export default CommentList;