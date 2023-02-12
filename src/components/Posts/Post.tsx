import { Formik, Field, ErrorMessage, Form } from "formik";
import React, { useEffect } from "react";
import { getRessourceById, deleteRessource, putRessource, postViewRessource, postShareRessource, postLikeRessource, postBlockRessource } from "../../services/ressources.service";
import PostType from "../../types/post.type";
import Navbar from "../Navbar";
import CreateNewComment from "../Comments/CreateNewComment";
import CommentList from "../Comments/CommentsList";

let Post: React.FC = () => {

    let [postById, setPostById] = React.useState<PostType>({} as PostType);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const [toggleUpdate, setToggleUpdate] = React.useState<boolean>(false);
    const [toggleShare, setToggleShare] = React.useState<boolean>(false);
    const [toggleLike, setToggleLike] = React.useState<boolean>(false);
    const [toggleBlock, setToggleBlock] = React.useState<boolean>(false);


    let url = window.location.pathname;
    let postId = parseInt(url.substring(url.lastIndexOf('/') + 1));

    useEffect(()=> {
      handleGetPostById();
      handleViewRessource();
    }, []);

    const handleToggleUpdate = () => {
      setToggleUpdate(!toggleUpdate);
    };

    const handleToggleShared = () => {
      setToggleShare(!toggleShare);
      handleShareRessource(toggleShare);
    };

    const handleToggleLike = () => {
      setToggleLike(!toggleLike);
      handleLikeRessource(toggleLike);
    };

    const handleToggleBlock = () => {
      setToggleBlock(!toggleBlock);
      handleBlockRessource(toggleBlock);
    };


    const handleDeleteRessource = React.useCallback(async () => {
      await deleteRessource(postId);
      console.log(getRessourceById(postId))
    }, []);

    const handleViewRessource = React.useCallback(async () => {
      await postViewRessource(postId, true);
    }, []);

    const handleShareRessource = React.useCallback(async (toggleShare: boolean) => {
      await postShareRessource(postId, toggleShare);
    }, []);

    const handleLikeRessource = React.useCallback(async (toggleShare: boolean) => {
      await postLikeRessource(postId, toggleShare);
    }, []);

    const handleBlockRessource = React.useCallback(async (toggleShare: boolean) => {
      await postBlockRessource(postId, toggleShare);
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

    const initialValues: {
      catalogId: number;
      access: string;
      content: string;
    } = {
      catalogId: id,
      access: access,
      content: value,
    };

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
        <button onClick={handleToggleShared}>Share</button>
        <br/>
        <button onClick={handleToggleLike}>Like</button>
        <br/>
        <button onClick={handleToggleBlock}>Block</button>
        <br/>
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
                <Field as="select" name="access" className="form-control border-2	rounded-lg border-stone-500	" >
                  <option value="public">Publique</option>
                  <option value="friends">Amis</option>
                  <option value="family">Famille</option>
                </Field>
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
        <CommentList/>
        <CreateNewComment/>
      </>
    );
};
export default Post;