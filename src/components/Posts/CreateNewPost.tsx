import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";

import Navbar from "../Navbar";
import { postRessource } from "../../services/ressources.service";

type Props = {}

const CreateNewPost: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    catalogId: number;
    access: string;
    content: string;
  } = {
    catalogId: 0,
    access: '',
    content: '',
  };

  const handlepostCreateNewPosts = (formValue: { catalogId: number; access: string; content: string }) => {
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
      <Navbar />
      <div className="col-md-12">
        <div className="card card-container">
          <Formik
            initialValues={initialValues}
            onSubmit={handlepostCreateNewPosts}
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