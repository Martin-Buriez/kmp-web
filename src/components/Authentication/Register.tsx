import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../../types/user.type";
import { register } from "../../services/auth.service";
import RegisterInput from "./RegisterInput";
import UserType from "../../types/user.type";
import Navbar from "../Navbar";

const Register: React.FC = () => {
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: UserType = {
    name: "",
    lastName: "",
    birthday: "",
    address: "",
    city: "",
    zipCode: "",
    email: "",
    password: "",
    id: 0
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "len",
        "The name must be between 3 and 20 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    lastName: Yup.string()
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue: IUser) => {
    const { name, lastName, birthday, address, city, zipCode, email, password } = formValue;

    register(name, lastName, birthday, address, city, zipCode, email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );
  };
  return (
    <>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-md">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="w-32 mx-auto mb-6"
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form className="flex flex-col space-y-4">
              {!successful && (
                <>
                  <RegisterInput name="name" type="string"/>
                  <RegisterInput name="lastName" type="string"/>
                  <RegisterInput name="birthday" type="string"/>
                  <RegisterInput name="email" type="string"/>
                  <RegisterInput name="address" type="string"/>
                  <RegisterInput name="city" type="string"/>
                  <RegisterInput name="zipCode" type="strign"/>
                  <RegisterInput name="password" type="password"/>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    Sign Up
                  </button>
                </>
              )}
  
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "bg-green-100 border-green-500 text-green-900" : "bg-red-100 border-red-500 text-red-900"
                    }
                    role="alert"
                  >
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

export default Register;