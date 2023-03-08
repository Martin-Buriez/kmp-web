import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useEffect } from "react";
import { deleteCatalogue, getCatalogueById, postBlockCatalogue, postLikeCatalogue, postShareCatalogue, postViewCatalogue, putCatalogue } from "../../services/catalogues.service";
import { getRessourceById } from "../../services/ressources.service";
import CatalogueType from "../../types/catalogue.type";
import Navbar from "../Navbar";
import PostListByCatalogueId from "../Posts/PostListByCategoryId";
import { GrTrash } from "react-icons/gr";
import { AiFillBook, AiFillEdit, AiFillHeart, AiFillStop, AiOutlineBook, AiOutlineEdit, AiOutlineHeart, AiOutlineStop } from "react-icons/ai";


let Catalogue: React.FC = () => {

    let [catalogueById, setCatalogueById] = React.useState<CatalogueType>({} as CatalogueType);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const [toggleUpdate, setToggleUpdate] = React.useState<boolean>(false);
    const [toggleShare, setToggleShare] = React.useState<boolean>(true);
    const [toggleLike, setToggleLike] = React.useState<boolean>(true);
    const [toggleBlock, setToggleBlock] = React.useState<boolean>(true);
  
    const initialValues: {
      category: string;
    } = {
      category: "",
    };
  

    let url = window.location.pathname;
    let catalogueId = parseInt(url.substring(url.lastIndexOf('/') + 1));

    useEffect(()=> {
      handleGetCatalogueById();
      handleViewCatalogue();
    }, []);

    const handleToggleUpdate = () => {
      setToggleUpdate(!toggleUpdate);
    };

    const handleToggleShared = () => {
      setToggleShare(!toggleShare);
      handleShareCatalogue(toggleShare);
    };

    const handleToggleLike = () => {
      setToggleLike(!toggleLike);
      handleLikeCatalogue(toggleLike);
    };

    const handleToggleBlock = () => {
      setToggleBlock(!toggleBlock);
      handleBlockCatalogue(toggleBlock);
    };


    const handleGetCatalogueById = React.useCallback(async () => {
      setCatalogueById(await getCatalogueById(catalogueId));
    }, []);

    const handleDeleteCatalogue = React.useCallback(async () => {
      await deleteCatalogue(catalogueId);
    }, []);

    const handleViewCatalogue = React.useCallback(async () => {
      await postViewCatalogue(catalogueId, true);
    }, []);

    const handleShareCatalogue = React.useCallback(async (toggleShare: boolean) => {
      await postShareCatalogue(catalogueId, toggleShare);
    }, []);

    const handleLikeCatalogue = React.useCallback(async (toggleShare: boolean) => {
      await postLikeCatalogue(catalogueId, toggleShare);
    }, []);

    const handleBlockCatalogue = React.useCallback(async (toggleShare: boolean) => {
      await postBlockCatalogue(catalogueId, toggleShare);
    }, []);


    const handleUpdateCatalogue = (formValue: { category: string }) => {
      const { category } = formValue;
  
      setMessage("");
      setLoading(true);
  
      putCatalogue(catalogueId, category).then(
        () => {
          setMessage("Category updated successfully!");
          setLoading(false);
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
  

    const { id, category} = catalogueById;

    return (
      <>
        <Navbar />
        <div className="container mx-auto py-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">{category}</h1>
            <div className="flex">
              <button className="mx-2 focus:outline-none" onClick={() => setToggleShare(!toggleShare)}>
                {!toggleShare ? (<AiFillBook className="text-2xl text-gray-800" />) : (<AiOutlineBook className="text-2xl text-gray-800" />)}
              </button>
              <button className="mx-2 focus:outline-none" onClick={() => setToggleLike(!toggleLike)}>
                {!toggleLike ? (<AiFillHeart className="text-2xl text-gray-800" />) : (<AiOutlineHeart className="text-2xl text-gray-800" />)}
              </button>
              <button className="mx-2 focus:outline-none" onClick={() => setToggleBlock(!toggleBlock)}>
                {!toggleBlock ? (<AiFillStop className="text-2xl text-gray-800" />) : (<AiOutlineStop className="text-2xl text-gray-800" />)}
              </button>
              <button className="mx-2 focus:outline-none" onClick={handleDeleteCatalogue}><GrTrash className="text-2xl text-gray-800" /></button>
              <button className="mx-2 focus:outline-none" onClick={handleToggleUpdate}>
                {toggleUpdate ? (<AiFillEdit className="text-2xl text-gray-800" />) : (<AiOutlineEdit className="text-2xl text-gray-800" />)}
              </button>
            </div>
          </div>
          {toggleUpdate && (
          <div className="my-4">
            <div className="border rounded-md p-4">
              <h2 className="text-lg font-semibold mb-2">Update Catalogue</h2>
              <Formik
                initialValues={initialValues}
                onSubmit={handleUpdateCatalogue}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="my-2">
                      <label htmlFor="category" className="block font-medium mb-1">Category</label>
                      <Field name="category" type="text" className="w-full px-3 py-2 rounded-md border-gray-400 focus:outline-none focus:border-blue-500" />
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
    
                    <div className="mt-4">
                      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out" disabled={isSubmitting}>
                        {loading && (
                          <span className="spinner-border spinner-border-sm mr-2"></span>
                        )}
                        Update Category
                      </button>
                      {message && (
                        <div className="text-red-500 text-sm mt-2">
                          {message}
                        </div>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          )}
          <hr className="my-4" />
          <PostListByCatalogueId/>
        </div>
      </>
    );
    
};
export default Catalogue;