import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useEffect } from "react";
import { deleteCatalogue, getCatalogueById, postBlockCatalogue, postLikeCatalogue, postShareCatalogue, postViewCatalogue, putCatalogue } from "../../services/catalogues.service";
import { getRessourceById } from "../../services/ressources.service";
import CatalogueType from "../../types/catalogue.type";
import Navbar from "../Navbar";
import PostListByCatalogueId from "../Posts/PostListByCategoryId";
import { GrEdit, GrFormLock, GrLike, GrShare, GrTrash } from "react-icons/gr";

let Catalogue: React.FC = () => {

    let [catalogueById, setCatalogueById] = React.useState<CatalogueType>({} as CatalogueType);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const [toggleUpdate, setToggleUpdate] = React.useState<boolean>(false);
    const [toggleShare, setToggleShare] = React.useState<boolean>(false);
    const [toggleLike, setToggleLike] = React.useState<boolean>(false);
    const [toggleBlock, setToggleBlock] = React.useState<boolean>(false);
  
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
      console.log(getRessourceById(catalogueId))
    }, []);

    const handleDeleteCatalogue = React.useCallback(async () => {
      await deleteCatalogue(catalogueId);
      console.log(getRessourceById(catalogueId))
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
  

    const { id, category} = catalogueById;

    return (
      <>
        <Navbar />
        <div className="container">
          <p>
            <strong>id:</strong> {id? id : "Not available"}
          </p>
          <p>
            <strong>category:</strong> {category? category : "Not available"}
          </p>
        </div>
        <button onClick={handleToggleShared}><GrShare/></button>
        <br/>
        <button onClick={handleToggleLike}><GrLike/></button>
        <br/>
        <button onClick={handleToggleBlock}><GrFormLock/></button>
        <br/>
        <button onClick={handleDeleteCatalogue}><GrTrash/></button>
        <br/>
        <button onClick={handleToggleUpdate}><GrEdit/></button>
        {toggleUpdate && (
        <div className="col-md-12">
          <div className="card card-container">
            <Formik
              initialValues={initialValues}
              onSubmit={handleUpdateCatalogue}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="category">category</label>
                  <Field name="category" type="text" className="form-control border-2	rounded-lg border-stone-500	" />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Update Category</span>
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
        <br/>
        
        <p>--------------------</p>
        <PostListByCatalogueId />
        <br />
      </>
    );
};
export default Catalogue;