import React from "react";
import useForm from "../hooks/useForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";

const initialState = {
  type: "",
  title: "",
  amount: "",
  tdate: "",
};

export const TransactionForm = () => {
  const { form, setForm, handleOnChange } = useForm(initialState);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const fields = [
    {
      label: "Title",
      placeholder: "Salary",
      type: "text",
      required: true,
      name: "title",
      value: form.title,
    },
    {
      label: "Amount",
      placeholder: "amount",
      type: "number",
      required: true,
      name: "amount",
      value: form.amount,
    },
    {
      label: "Transaction Date",
      type: "date",
      required: true,
      name: "tdate",
      value: form.tdate,
    },
  ];
  return (
    <div className="border rounded p-4">
      <h4 className="mb-5 text-center">Sign up now!</h4>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Transaction Type</Form.Label>
          <Form.Select name="type" onChange={handleOnChange}>
            <option value="">--select--</option>
            <option value="income">Income</option>
            <option value="expenses">Expenses</option>
          </Form.Select>
        </Form.Group>
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
