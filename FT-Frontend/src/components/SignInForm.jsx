import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { useState } from "react";
import { toast } from "react-toastify";
import { NewPostUser } from "../../helpers/axiosHelper";

export const SignInForm = () => {
  const [form, setForm] = useState({});
  const fields = [
    {
      label: "Email",
      placeholder: "John@email.com",
      type: "email",
      required: true,
      name: "email",
    },
    {
      label: "Password",
      placeholder: "********",
      type: "password",
      required: true,
      name: "password",
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
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
