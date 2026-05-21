import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useUser } from "../context/UserContext";

export const CustomModal = ({ children }) => {
  const { show, toogleModal, selectedTransaction, setSelectedTransaction } =
    useUser();

  const handleClose = () => {
    toogleModal(false);
    setSelectedTransaction(null);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => toogleModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedTransaction ? "Edit Transaction" : "Add New Transaction"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};
