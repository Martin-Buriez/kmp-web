import { Formik, Field, ErrorMessage, Form } from "formik";
import React, { useEffect } from "react";
import { postComment } from "../../services/comments.service";
import { getRessourceById, deleteRessource, putRessource } from "../../services/ressources.service";
import PostType from "../../types/post.type";
import Navbar from "../Navbar";

let Comment: React.FC = () => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");

    let url = window.location.pathname;
    let postId = parseInt(url.substring(url.lastIndexOf('/') + 1));

    const handlePostComment = (formValue: { value: string }) => {
      const { value } = formValue;
    
      console.log("postId", postId)
      setMessage("");
      setLoading(true);
  
      postComment(postId, value).then(
        () => {
          console.log('created')
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

    const initialValues: {
      value: string;
    } = {
      value: "",
    };

    return (
      <>
        <div className="col-md-12">
          <div className="card card-container">
            <Formik
              initialValues={initialValues}
              onSubmit={handlePostComment}
            >
              <Form>
              <div className="form-group">
                <label htmlFor="value">comment</label>
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
                    <span>Post Comment</span>
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
      </>
    );
};
export default Comment;