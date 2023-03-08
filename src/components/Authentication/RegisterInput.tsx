import { ErrorMessage, Field } from "formik";

type RegisterInputProps = {
  value: string;
  name: string;
  type: string;
};   

function RegisterInput({ name, type, value }: RegisterInputProps) {
  return (
    <div className="mt-4">
      <label htmlFor={name} className="text-gray-700">{value}</label>
      <Field
        name={name}
        type={type}
        className="block w-full px-4 py-3 mt-2 leading-tight text-gray-700 border-2 rounded-lg focus:outline-none focus:bg-white focus:border-stone-500"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="mt-2 text-red-500"
      />
    </div>
  );
}

export default RegisterInput;
