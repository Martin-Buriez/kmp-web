import React, { useState } from "react";
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import Navbar from "../Navbar";
import { postCatalogue } from "../../services/catalogues.service";

type Props = {}

const Login: React.FC<Props> = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    category: string;
  } = {
    category: "",
  };

  const handlecatalogueCreateNewPosts = (formValue: { category: string }) => {
    const { category } = formValue;

    setMessage("");
    setLoading(true);

    postCatalogue(category).then(
      () => {
        navigate("/catalogue");
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
            onSubmit={handlecatalogueCreateNewPosts}
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
                  <span>Create Category</span>
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

export default Login;