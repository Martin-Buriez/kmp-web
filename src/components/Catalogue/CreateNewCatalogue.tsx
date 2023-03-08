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
      <div className="col-md-12">
        <div className="card bg-white shadow-lg rounded-lg px-4 py-6">
          <Formik
            initialValues={initialValues}
            onSubmit={handlecatalogueCreateNewPosts}
          >
            <Form>
              <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
                <Field name="category" type="text" className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-stone-500" />
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
  
              <div className="mb-6">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Create Category</span>
                </button>
              </div>
  
              {message && (
                <div className="form-group">
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong className="font-bold">Error:</strong>
                    <span className="block sm:inline"> {message}</span>
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