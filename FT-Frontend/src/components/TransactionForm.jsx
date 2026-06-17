import useForm from "../hooks/useForm";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CustomInput } from "./CustomInput";
import {
  NewPostTransaction,
  updateTransaction,
} from "../../helpers/axiosHelper";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

const initialState = {
  type: "",
  title: "",
  amount: "",
  tDate: "",
};

export const TransactionForm = () => {
  const { form, setForm, handleOnChange } = useForm(initialState);
  const {
    getTransactions,
    toogleModal,
    selectedTransaction,
    setSelectedTransaction,
  } = useUser();

  useEffect(() => {
    if (selectedTransaction) {
      setForm({
        type: selectedTransaction.type || "",
        title: selectedTransaction.title || "",
        amount: selectedTransaction.amount || "",
        tDate: selectedTransaction.tDate?.slice(0, 10) || "",
      });
    } else {
      setForm(initialState);
    }
  }, [selectedTransaction]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let pending;

    if (selectedTransaction?._id) {
      pending = updateTransaction(selectedTransaction._id, form);
      console.log(pending);
    } else {
      pending = NewPostTransaction(form);

      console.log(form);
    }
    toast.promise(pending, {
      pending: "Please Wait...",
    });
    const { status, message } = await pending;
    toast[status](message);
    if (status === "success") {
      setForm(initialState);
      //TODO: call the function to fetch all transcation
      getTransactions();

      // Close modal after Insertation
      toogleModal(false);

      setSelectedTransaction(null);
    }
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
      name: "tDate",
      value: form.tDate,
    },
  ];
  return (
    <div className="border rounded p-4">
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
            {selectedTransaction ? "Update Transaction" : "Add Transaction"}
          </Button>
        </div>
      </Form>
    </div>
  );
};
