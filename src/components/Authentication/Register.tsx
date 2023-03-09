import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import IUser from "../../types/user.type";
import { register } from "../../services/auth.service";
import RegisterInput from "./RegisterInput";
import UserType from "../../types/user.type";
import { Navigate } from "react-router-dom";

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
        "Le nom doit contenir entre 3 et 20 caractères.",
        (val: any) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("Ce champ est requis"),
    lastName: Yup.string()
      .required("Ce champ est requis"),
    email: Yup.string()
      .email("Cet email n'est pas valide.")
      .required("Ce champ est requis"),
    zipCode: Yup.string()
      .test(
        "len",
        "Le nom doit contenir 2 caractères.",
        (val: any) =>
          val &&
          val.toString().length === 2
      ),
    password: Yup.string()
      .test(
        "len",
        "Le mot de passe doit contenir entre 6 et 40 caractères.",
        (val: any) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("Ce champ est requis"),
  });

  const handleRegister = (formValue: IUser) => {
    const { name, lastName, birthday, address, city, zipCode, email, password } = formValue;

    register(name, lastName, birthday, address, city, zipCode, email, password).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
        Navigate({to: "/login"})
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
                  <RegisterInput value="Prénom" name="name" type="string"/>
                  <RegisterInput value="Nom" name="lastName" type="string"/>
                  <RegisterInput value="Date de naissance" name="birthday" type="date"/>
                  <RegisterInput value="Email" name="email" type="string"/>
                  <RegisterInput value="Adresse" name="address" type="string"/>
                  <RegisterInput value="Ville" name="city" type="string"/>
                  <RegisterInput value="Code postal" name="zipCode" type="strign"/>
                  <RegisterInput value="Mot de passe" name="password" type="password"/>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded focus:outline-none focus:shadow-outline"
                  >
                    S'enregistrer
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