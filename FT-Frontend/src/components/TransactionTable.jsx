import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useUser } from "../context/UserContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaCirclePlus } from "react-icons/fa6";
import { deleteTransactions } from "../../helpers/axiosHelper";
import { toast } from "react-toastify";

export const TransactionTable = () => {
  const [displayTran, setDisplayTran] = useState([]);
  const { transactions, toogleModal, getTransactions } = useUser();
  const [idsToDelete, setIdsToDelete] = useState([]);

  useEffect(() => {
    setDisplayTran(transactions);
  }, [transactions]);

  const handleOnSearch = (e) => {
    const { value } = e.target;

    const filteredArg = transactions.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase()),
    );

    setDisplayTran(filteredArg);
  };

  const balance = displayTran.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    if (value === "all") {
      checked
        ? setIdsToDelete(displayTran.map((item) => item._id))
        : setIdsToDelete([]);

      return;
    }

    if (checked) {
      setIdsToDelete([...idsToDelete, value]);
    } else {
      setIdsToDelete(idsToDelete.filter((id) => id !== value));
    }
    return;
  };

  const handleOnDelete = async () => {
    if (
      confirm(
        `Are you sure you want to delete ${idsToDelete.length} transactions`,
      )
    ) {
      const pending = deleteTransactions(idsToDelete);
      toast.promise(pending, {
        pending: "Please Wait...",
      });

      const { status, message } = await pending;
      toast[status](message);
      status === "success" && getTransactions() && setIdsToDelete([]);
    }
  };
  return (
    <>
      <p className="fs-4 fw-bold">{displayTran.length} transaction(s) found!</p>
      <div className="d-flex justify-content-between pt-3 mb-4">
        <div>
          <Form.Control className="rounded-pill" placeholder="Search transactions..." onChange={handleOnSearch} />
        </div>
        <div className="text-center">
          <Button className="rounded-pill" onClick={() => toogleModal(true)}>
            <FaCirclePlus /> Add New Transactions
          </Button>
        </div>
      </div>
      <div>
        <Form.Check
          label="Select All"
          value="all"
          onChange={handleOnSelect}
          checked={displayTran.length === idsToDelete.length}
        />
      </div>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Titile</th>
            <th>Out</th>
            <th>In</th>
          </tr>
        </thead>
        <tbody>
          {displayTran.length > 0 &&
            displayTran.map((t, i) => (
              <tr key={t._id}>
                <td>{i + 1}</td>
                <td>
                  <Form.Check
                    label={t.createdAt.slice(0, 10)}
                    value={t._id}
                    onChange={handleOnSelect}
                    checked={idsToDelete.includes(t._id)}
                  />
                </td>
                <td>{t.title}</td>
                {t.type === "expenses" && (
                  <>
                    <td className="out">-${t.amount}</td>
                    <td></td>
                  </>
                )}
                {t.type === "income" && (
                  <>
                    <td></td>
                    <td className="in">${t.amount}</td>
                  </>
                )}
              </tr>
            ))}
          <tr className="fw-bold text-center">
            <td colSpan={2}>Total</td>
            <td colSpan={3}>${balance}</td>
          </tr>
        </tbody>
      </Table>
      {idsToDelete.length > 0 && (
        <div className="d-grid">
          <Button onClick={handleOnDelete} variant="danger">
            Delete {idsToDelete.length} Transactions
          </Button>
        </div>
      )}
    </>
  );
};
