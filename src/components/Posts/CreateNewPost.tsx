import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";

import Navbar from "../Navbar";
import { postRessource } from "../../services/ressources.service";
import { Relation } from "../../types/relation.type";
import { getAllCatalogues } from "../../services/catalogues.service";
import CatalogueType from "../../types/catalogue.type";

type Props = {}

const CreateNewPost: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [catalogues, setCatalogues] = useState<CatalogueType[]>();

  const initialValues: {
    catalogId: number;
    access: Relation | 'Veuillez entrer un accès';
    content: string;
  } = {
    catalogId: 0,
    access: 'Veuillez entrer un accès',
    content: '',
  };

  useEffect(()=> {
    handleGetAllCatalogues();
  }, []);

  const handleGetAllCatalogues = React.useCallback(async () => {
    setCatalogues(await getAllCatalogues());
  }, []);


  const handlepostCreateNewPosts = (formValue: { catalogId: number; access: Relation | 'Veuillez entrer un accès'; content: string }) => {
    const { catalogId, access, content } = formValue;

    setMessage("");
    setLoading(true);

    postRessource(catalogId, access, content).then(
      () => {
        navigate("/post");
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
 
  return (
    <>
      <div className="col-md-12">
        <div className="card card-container">
          <Formik
            initialValues={initialValues}
            onSubmit={handlepostCreateNewPosts}
          >
            <Form>
            <div className="form-group">
              <label htmlFor="catalogue">Catalogue</label>
              <Field as="select" name="catalogId" className="form-control border-2 rounded-lg border-stone-500">
                <option value="Veuillez entrer un catalogue">Veuillez entrer un catalogue</option>
              {catalogues && catalogues.map(catalogue => (
                  <option key={catalogue.id} value={catalogue.id}>{catalogue.category}</option>
                ))}
              </Field>
              <ErrorMessage
                name="catalogId"
                component="div"
                className="alert alert-danger"
              />
            </div>
    
              <div className="form-group">
                <label htmlFor="access">Accès</label>
                <Field as="select" name="access" className="form-control border-2	rounded-lg border-stone-500	" >
                  <option value="Veuillez entrer un public">Veuillez entrer un public</option>
                  <option value="public">Public</option>
                  <option value="connaissance">Connaissance</option>
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
                  <span>Create Post</span>
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

export default CreateNewPost;