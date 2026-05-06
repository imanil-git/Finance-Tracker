import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
// import { useState } from "react";
import { toast } from "react-toastify";
import { NewPostUser } from "../../helpers/axiosHelper";
import useForm from "../hooks/useForm";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  // const [form, setForm] = useState({});
  const { form, setForm, handleOnChange } = useForm(initialState);
  const fields = [
    {
      label: "Name",
      placeholder: "John Doe",
      type: "text",
      required: true,
      name: "name",
      value: form.name,
    },
    {
      label: "Email",
      placeholder: "John@email.com",
      type: "email",
      required: true,
      name: "email",
      value: form.email,
    },
    {
      label: "Password",
      placeholder: "********",
      type: "password",
      required: true,
      name: "password",
      value: form.password,
    },
    {
      label: "Confirm Password",
      placeholder: "*********",
      type: "password",
      required: true,
      name: "confirmPassword",
      value: form.confirmPassword,
    },
  ];

  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   // console.log(name, value);
  //   setForm({
  //     ...form,
  //     [name]: value,
  //   });
  // };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { confirmPassword, ...input } = form;
    if (confirmPassword !== input.password) {
      return toast.error("Password didn't match");
    }
    const { status, message } = await NewPostUser(input);
    toast[status](message);

    status === "success" && setForm(initialState);
  };
  return (
    <div className="border rounded p-4">
      <h4 className="mb-5 text-center">Sign up now!</h4>
      <Form onSubmit={handleOnSubmit}>
        {fields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnChange} />
        ))}
        <div className="d-grid mt-4">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
