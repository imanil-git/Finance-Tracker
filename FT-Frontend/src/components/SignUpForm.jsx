import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
import { NewPostUser } from "../../helpers/axiosHelper";
import useForm from "../hooks/useForm";
import { signUpSchema } from "../schema/authSchema";
import { useEffect, useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const { form, setForm, handleOnChange } = useForm(initialState);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState({});

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

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  useEffect(() => {
    if (Object.keys(touched).length === 0) return;

    const result = signUpSchema.safeParse(form);

    if (!result.success) {
      setErrors(result.error.format());
      setIsValid(false);
    } else {
      setErrors({});
      setIsValid(true);
    }
  }, [form]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...input } = form;

    // if (confirmPassword !== input.password) {
    //   return toast.error("Password didn't match");
    // }

    const pending = NewPostUser(input);
    toast.promise(pending, {
      pending: "Please Wait...",
    });
    const { status, message } = await pending;
    toast[status](message);

    if (status === "success") {
      setForm(initialState);
      setErrors({});
      setTouched({});
      setIsValid(false);
    }
  };
  return (
    <div className="border rounded p-4">
      <h4 className="mb-5 text-center">Sign up now!</h4>
      <Form noValidate onSubmit={handleOnSubmit}>
        {fields.map((input) => (
          <CustomInput
            key={input.name}
            {...input}
            onChange={handleOnChange}
            onBlur={handleBlur}
            error={touched[input.name] ? errors[input.name]?._errors : []}
          />
        ))}
        <div className="d-grid mt-4">
          <Button variant="primary" type="submit" disabled={!isValid}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
