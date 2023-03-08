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
        <div className="container mx-auto">
          <p className="font-bold">
            <span className="text-gray-600"></span>{" "}
            {value ? value : "Not available"}
          </p>
        </div>
        <div>
          <button
            className="mx-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            onClick={handleDeleteComment}
          >
            <GrTrash />
          </button>
          <button
            className="mx-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            onClick={handleToggleUpdate}
          >
            <GrEdit />
          </button>
        </div>
        {toggleUpdate && (
          <div className="container mx-auto">
            <div className="max-w-md mx-auto my-8 bg-white p-6 rounded-md shadow-md">
              <Formik initialValues={initialValues} onSubmit={handleUpdateComment}>
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-4">
                      <label
                        htmlFor="value"
                        className="block text-gray-700 font-bold mb-2"
                      >
                        Commentaire :
                      </label>
                      <Field
                        name="value"
                        type="text"
                        className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <ErrorMessage
                        name="value"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
    
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
                        disabled={isSubmitting}
                      >
                        {isSubmitting && (
                          <span className="mr-2 spinner-border spinner-border-sm"></span>
                        )}
                        Mettre à jour le commentaire
                      </button>
                    </div>
    
                    {message && (
                      <div className="text-red-500 text-sm mt-4">{message}</div>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        )}
      </>
    );
    
};
export default Post;