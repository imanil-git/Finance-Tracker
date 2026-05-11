import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import { toast } from "react-toastify";
import { loginUser, NewPostUser } from "../../helpers/axiosHelper";
import useForm from "../hooks/useForm";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const navigate = useNavigate();

  const { user, setUser } = useUser();
  const { form, setForm, handleOnChange } = useForm(initialState);

  useEffect(() => {
    user?._id && navigate("/dashboard");
  }, [user?._id, navigate]);

  //   const [form, setForm] = useState({});
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

  //   const handleOnChange = (e) => {
  //     const { name, value } = e.target;
  //     // console.log(name, value);
  //     setForm({
  //       ...form,
  //       [name]: value,
  //     });
  //   };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log(form);

    const pendingResp = loginUser(form);
    toast.promise(pendingResp, {
      pending: "Please wait ....",
    });

    const { status, message, user, accessJWT } = await pendingResp;

    toast[status](message);
    console.log(user, accessJWT);
    setUser(user);
    localStorage.setItem("accessJWT", accessJWT);
  };
  return (
    <div className="border rounded p-4">
      <h4 className="mb-5 text-center">Sign In now!</h4>
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
