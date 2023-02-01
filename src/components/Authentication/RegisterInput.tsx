import { ErrorMessage, Field } from "formik";

type RegisterInputProps = {
    name: string;
    type: string;
  };   

function RegisterInput({name, type}: RegisterInputProps) {
  return (
        <div className="form-group">
            <label htmlFor={name}> {name} </label>
            <Field name={name} type={type} className="form-control border-2	rounded-lg border-stone-500	"/>
            <ErrorMessage
              name={name}
              component="div"
              className="alert alert-danger"
            />
        </div>
  );
}

export default RegisterInput;