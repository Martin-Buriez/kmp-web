import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useEffect } from "react";
import { deleteCatalogue, getCatalogueById, putCatalogue } from "../../services/catalogues.service";
import { getRessourceById } from "../../services/ressources.service";
import CatalogueType from "../../types/catalogue.type";
import Navbar from "../Navbar";

let Catalogue: React.FC = () => {

    let [catalogueById, setCatalogueById] = React.useState<CatalogueType>({} as CatalogueType);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [message, setMessage] = React.useState<string>("");
    const [toggleUpdate, setToggleUpdate] = React.useState<boolean>(false);
  
    const initialValues: {
      category: string;
    } = {
      category: "",
    };
  

    let url = window.location.pathname;
    let catalogueId = parseInt(url.substring(url.lastIndexOf('/') + 1));

    useEffect(()=> {
      handleGetCatalogueById();
    }, []);

    const handleToggleUpdate = () => {
      setToggleUpdate(!toggleUpdate);
    };

    const handleGetCatalogueById = React.useCallback(async () => {
      setCatalogueById(await getCatalogueById(catalogueId));
      console.log(getRessourceById(catalogueId))
    }, []);

    const handleDeleteCatalogue = React.useCallback(async () => {
      await deleteCatalogue(catalogueId);
      console.log(getRessourceById(catalogueId))
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
        <button onClick={handleDeleteCatalogue}>Delete</button>
        <br/>
        <button onClick={handleToggleUpdate}>Update</button>
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
      </>
    );
};
export default Catalogue;