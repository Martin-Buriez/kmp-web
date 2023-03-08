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
        <div className="card card-container p-6 border-2 rounded-lg border-gray-300">
          <Formik
            initialValues={initialValues}
            onSubmit={handlepostCreateNewPosts}
          >
            <Form>
              <div className="form-group">
                <label htmlFor="catalogue" className="block font-medium text-gray-700">Catalogue</label>
                <Field as="select" name="catalogId" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm">
                  <option value="Veuillez entrer un catalogue">Veuillez entrer un catalogue</option>
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
  
              <div className="form-group">
                <label htmlFor="access" className="block font-medium text-gray-700">Accès</label>
                <Field as="select" name="access" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm">
                  <option value="Veuillez entrer un public">Veuillez entrer un public</option>
                  <option value="public">Public</option>
                  <option value="connaissance">Connaissance</option>
                  <option value="amis">Amis</option>
                  <option value="famille">Famille</option>
                </Field>
                <ErrorMessage
                  name="access"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="content" className="block font-medium text-gray-700">Contenu</label>
                <Field name="content" type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm" />
                <ErrorMessage
                  name="content"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
  
              <div className="form-group">
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-stone-500 hover:bg-stone-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-500" disabled={loading}>
                  {loading && (
                    <span className="mr-2 spinner-border spinner-border-sm"></span>
                  )}
                  <span>Créer</span>
                </button>
              </div>
  
              {message && (
                <div className="form-group">
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{message}</span>
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