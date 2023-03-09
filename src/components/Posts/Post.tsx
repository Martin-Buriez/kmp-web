import { Formik, Field, ErrorMessage, Form } from "formik";
import React, { useEffect } from "react";
import { getRessourceById, deleteRessource, putRessource, postViewRessource, postShareRessource, postLikeRessource, postBlockRessource } from "../../services/ressources.service";
import PostType from "../../types/post.type";
import CreateNewComment from "../Comments/CreateNewComment";
import CommentList from "../Comments/CommentsList";
import { Relation } from "../../types/relation.type";
import { GrTrash } from "react-icons/gr";
import { AiFillBook, AiFillEdit, AiFillHeart, AiFillStop, AiOutlineBook, AiOutlineEdit, AiOutlineHeart, AiOutlineStop } from "react-icons/ai";
import CatalogueType from "../../types/catalogue.type";
import { getAllCatalogues } from "../../services/catalogues.service";
import { getActivityByRessourceId } from "../../services/activity.service";

let Post: React.FC = () => {

    let [postById, setPostById] = React.useState<PostType>({} as PostType);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const [toggleUpdate, setToggleUpdate] = React.useState<boolean>(false);
    const [toggleShare, setToggleShare] = React.useState<boolean>(true);
    const [toggleLike, setToggleLike] = React.useState<boolean>(true);
    const [toggleBlock, setToggleBlock] = React.useState<boolean>(true);
    const [catalogues, setCatalogues] = React.useState<CatalogueType[]>();
    const [activity, setActivity] = React.useState<any>();


    let url = window.location.pathname;
    let postId = parseInt(url.substring(url.lastIndexOf('/') + 1));

    useEffect(()=> {
      handleGetPostById();
      handleGetActivityByRessourceId();
      handleViewRessource();
      handleGetAllCatalogues();
    }, []);

    const handleGetActivityByRessourceId = React.useCallback(async () => {
      try {
        const activity = await getActivityByRessourceId(postId)
        setActivity(activity);
        setToggleShare(!activity[0].share);
        setToggleLike(!activity[0].favorite);
        setToggleBlock(!activity[0].block);
      } catch (error) {
        console.error(error);
    }
    }, []);
  
    const handleGetAllCatalogues = React.useCallback(async () => {
      setCatalogues(await getAllCatalogues());
    }, []);

    const handleToggleUpdate = () => {
      setToggleUpdate(!toggleUpdate);
    };

    const handleToggleShared = () => {
      setToggleShare(!toggleShare);
      handleShareRessource(toggleShare);
    };

    const handleToggleLike =async  () => {
      handleGetActivityByRessourceId();
      setToggleLike(!toggleLike);
      handleLikeRessource(toggleLike);
      handleGetActivityByRessourceId();

    };

    const handleToggleBlock = () => {
      setToggleBlock(!toggleBlock);
      handleBlockRessource(toggleBlock);
    };


    const handleDeleteRessource = React.useCallback(async () => {
      await deleteRessource(postId);
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



    const handleUpdateRessource = (formValue: { catalogId: number, access: Relation | 'public', content: string }) => {
      const { catalogId, access, content } = formValue;
  
      setMessage("");
      setLoading(true);
  
      putRessource(catalogId, access, content, postId).then(
        () => {
          setLoading(false);
          setMessage("Post updated successfully!");
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
    }, []);

    const { access, value } = postById;

    const initialValues: {
      catalogId: number;
      access: Relation | 'public';
      content: string;
    } = {
      catalogId: postById.catalogue ? postById.catalogue[0].id : 0,
      access: access as Relation | 'public',
      content: value,
    };

    return (
      <>
        <div className="container mx-auto py-8">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="mb-4">
             {value ? value : "Not available"}
            </p>
            <p className="mb-4">
              <strong>accès :</strong> {access ? access : "Not available"}
            </p>
          </div>
          <div className="flex items-center mb-8">
            <button
              className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleToggleShared}
            >
              {!toggleShare ? <AiFillBook /> : <AiOutlineBook />}
            </button>
            <button
              className="mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleToggleLike}
            >
              {!toggleLike ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
            <button
              className="mx-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleToggleBlock}
            >
              {!toggleBlock ? <AiFillStop /> : <AiOutlineStop />}
            </button>
            <button
              className="mx-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDeleteRessource}
            >
              <GrTrash />
            </button>
            <button
              className="mx-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleToggleUpdate}
            >
              {toggleUpdate ? <AiFillEdit /> : <AiOutlineEdit />}
            </button>
          </div>
          {toggleUpdate && (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <Formik initialValues={initialValues} onSubmit={handleUpdateRessource}>
                <Form>
                <div className="form-group">
                <label htmlFor="catalogue" className="block font-medium text-gray-700">Catalogue</label>
                <Field as="select" name="catalogId" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-500">
                  {catalogues && catalogues.map(catalogue => (
                    <option key={catalogue.id} value={catalogue.id}>{catalogue.category}</option>
                  ))}
                </Field>
                <ErrorMessage
                  name="catalogId"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
  
                  <div className="mb-4">
                    <label htmlFor="access" className="block text-gray-700 font-bold mb-2">
                      accès
                    </label>
                    <Field
                      as="select"
                      name="access"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-500"
                    >
                      <option value="public">Public</option>
                      <option value="connaissance">Privé</option>
                      <option value="amis">Amis</option>
                      <option value="famille">Famille</option>
                    </Field>
                  <ErrorMessage
                    name="access"
                    component="div"
                    className="alert alert-danger"
                  />
                  </div>
                  <div className="form-group">
                    <label htmlFor="content">Post</label>
                    <Field name="content" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-500"/>
                    <ErrorMessage
                      name="content"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group pt-3">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={loading}>
                      {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Mettre à jour le post</span>
                    </button>
                  </div>
                      
                  {message && (
                    <div className="form-group pt-3">
                      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2" role="alert">
                        {message}
                      </div>
                    </div>
                  )}
                </Form>
              </Formik>
            </div>
           )}
        </div>
        <CommentList/>
        <CreateNewComment/>
      </>
    );
};
export default Post;