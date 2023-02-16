import { Formik, Field, ErrorMessage, Form } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCommentByRessourceIdAndByCommentId, deleteCommentByRessourceIdAndByCommentId, putCommentByRessourceIdAndByCommentId } from "../../services/comments.service";
import CommentListType from "../../types/comment.type";
import { GrEdit, GrTrash } from "react-icons/gr";


let Post: React.FC = () => {

    let [commentById, setCommentById] = React.useState<CommentListType>({} as CommentListType);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const [toggleUpdate, setToggleUpdate] = React.useState<boolean>(false);
    const navigate = useNavigate();

    let url = window.location.pathname;
    let commentId = parseInt(url.substring(url.lastIndexOf('/') + 1));
    let ressourceId = parseInt(url.substring(url.indexOf('post/') + 5));
    console.log('commentId', commentId, 'ressourceId', ressourceId)

    useEffect(()=> {
      handleGetPostById();
    }, []);

    const handleToggleUpdate = () => {
      setToggleUpdate(!toggleUpdate);
    };

    const handleDeleteComment = React.useCallback(async () => {
      await deleteCommentByRessourceIdAndByCommentId(ressourceId, commentId);
      navigate(`/post/${ressourceId}`);
      window.location.reload();
    }, []);


    const handleUpdateComment = (formValue: { value: string }) => {
      const { value } = formValue;
  
      setMessage("");
      setLoading(true);
  
      putCommentByRessourceIdAndByCommentId(ressourceId, commentId, value).then(
        () => {
          navigate(`/post/${ressourceId}`);
          window.location.reload();
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
        <div>
          <button className="mx-2" onClick={handleDeleteComment}><GrTrash/></button>
          <button className="mx-2" onClick={handleToggleUpdate}><GrEdit/></button>
        </div>
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