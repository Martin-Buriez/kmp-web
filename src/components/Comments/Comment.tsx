import { Formik, Field, ErrorMessage, Form } from "formik";
import React, { useEffect } from "react";
import { getCommentByRessourceIdAndByCommentId, deleteCommentByRessourceIdAndByCommentId, putCommentByRessourceIdAndByCommentId } from "../../services/comments.service";
import PostType from "../../types/post.type";
import Navbar from "../Navbar";
import Comment from "./CreateNewComment";
import CommentList from "./CommentsList";
import CommentListType from "../../types/comment.type";

let Post: React.FC = () => {

    let [commentById, setCommentById] = React.useState<CommentListType>({} as CommentListType);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const [toggleUpdate, setToggleUpdate] = React.useState<boolean>(false);

    let url = window.location.pathname;
    let ressourceId = parseInt(url.substring(url.lastIndexOf('/') + 1));
    let commentId = 1

    useEffect(()=> {
      handleGetPostById();
    }, []);

    const handleToggleUpdate = () => {
      setToggleUpdate(!toggleUpdate);
    };

    const handleDeleteComment = React.useCallback(async () => {
      await deleteCommentByRessourceIdAndByCommentId(ressourceId, commentId);
    }, []);


    const handleUpdateComment = (formValue: { value: string }) => {
      const { value } = formValue;
  
      setMessage("");
      setLoading(true);
  
      putCommentByRessourceIdAndByCommentId(ressourceId, commentId, value).then(
        () => {
          console.log('updated')
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
          setLoading(false);
          setMessage(resMessage);
        }
      );
    };

    const handleGetPostById = React.useCallback(async () => {
      setCommentById(await getCommentByRessourceIdAndByCommentId(ressourceId, commentId));
    }, []);

    const { id, value } = commentById;

    const initialValues: {
      value: string;
    } = {
      value: value,
    };

    return (
      <>
        <div className="container">
          <p>
            <strong>id:</strong> {id? id : "Not available"}
          </p>
          <p>
            <strong>value:</strong> {value? value : "Not available"}
          </p>
        </div>
        <button onClick={handleDeleteComment}>Delete</button>
        <br/>
        <button onClick={handleToggleUpdate}>Update</button>
        {toggleUpdate && (
        <div className="col-md-12">
          <div className="card card-container">
            <Formik
              initialValues={initialValues}
              onSubmit={handleUpdateComment}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="value">value</label>
                  <Field name="value" type="text" className="form-control border-2	rounded-lg border-stone-500	" />
                  <ErrorMessage
                    name="value"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
    
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Update Comment</span>
                  </button>
                </div>

                {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
                )}
              </Form>
            </Formik>
          </div>
        </div>
        )}
      </>
    );
};
export default Post;