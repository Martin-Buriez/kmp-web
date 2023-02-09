import { Formik, Field, ErrorMessage, Form } from "formik";
import React, { useEffect } from "react";
import { getRessourceById, deleteRessource, putRessource } from "../../services/ressources.service";
import PostType from "../../types/post.type";
import Navbar from "../Navbar";

let Post: React.FC = () => {

    let [postById, setPostById] = React.useState<PostType>({} as PostType);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const [toggleUpdate, setToggleUpdate] = React.useState<boolean>(false);
  
    const initialValues: {
      catalogId: number;
      access: string;
      content: string;
    } = {
      catalogId: 0,
      access: '',
      content: '',
    };
  

    let url = window.location.pathname;
    let postId = parseInt(url.substring(url.lastIndexOf('/') + 1));

    useEffect(()=> {
      handleGetPostById();
    }, []);

    const handleToggleUpdate = () => {
      setToggleUpdate(!toggleUpdate);
    };

    const handleDeleteRessource = React.useCallback(async () => {
      await deleteRessource(postId);
      console.log(getRessourceById(postId))
    }, []);


    const handleUpdateRessource = (formValue: { catalogId: number, access: string, content: string }) => {
      const { catalogId, access, content } = formValue;
  
      setMessage("");
      setLoading(true);
  
      putRessource(catalogId, access, content, postId).then(
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
      setPostById(await getRessourceById(postId));
      console.log(getRessourceById(postId))
    }, []);

    const { id, access, value, comments } = postById;

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
        <button onClick={handleDeleteRessource}>Delete</button>
        <br/>
        <button onClick={handleToggleUpdate}>Update</button>
        {toggleUpdate && (
        <div className="col-md-12">
          <div className="card card-container">
            <Formik
              initialValues={initialValues}
              onSubmit={handleUpdateRessource}
            >
              <Form>
              <div className="form-group">
                <label htmlFor="catalogId">catalogId</label>
                <Field name="catalogId" type="text" className="form-control border-2	rounded-lg border-stone-500	" />
                <ErrorMessage
                  name="catalogId"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
    
              <div className="form-group">
                <label htmlFor="access">access</label>
                <Field name="access" type="text" className="form-control border-2	rounded-lg border-stone-500	" />
                <ErrorMessage
                  name="access"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">content</label>
                <Field name="content" type="text" className="form-control border-2	rounded-lg border-stone-500	" />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="alert alert-danger"
                />
              </div>
    

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Update Ressource</span>
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