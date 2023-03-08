import { Formik, Field, ErrorMessage, Form } from "formik";
import React from "react";
import { Navigate } from "react-router-dom";
import { postComment } from "../../services/comments.service";

let CreateNewComment: React.FC = () => {

    const [loading, setLoading] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");

    let url = window.location.pathname;
    let postId = parseInt(url.substring(url.lastIndexOf('/') + 1));

    const handlePostComment = (formValue: { value: string }) => {
      const { value } = formValue;
    
      setMessage("");
      setLoading(true);
  
      postComment(postId, value).then(
        () => {
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

    const initialValues: {
      value: string;
    } = {
      value: "",
    };
    return (
      <>
        <div className="col-md-12">
          <div className="card border border-gray-400 p-6 rounded-md shadow-sm">
            <Formik
              initialValues={initialValues}
              onSubmit={handlePostComment}
            >
              <Form>
                <div className="mb-4">
                  <label htmlFor="value" className="block text-gray-700 font-bold mb-2">Comment</label>
                  <Field name="value" type="text" className="form-control border-2 rounded-lg border-gray-400 py-2 px-4 w-full text-gray-700 leading-tight focus:outline-none focus:border-blue-500" />
                  <ErrorMessage
                    name="value"
                    component="div"
                    className="text-red-500 text-sm mt-2"
                  />
                </div>
    
                <div className="mb-6">
                  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading}>
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
export default CreateNewComment;