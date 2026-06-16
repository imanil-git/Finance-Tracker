import React, { useState } from "react";
import { Button, Card, Form, InputGroup, Modal } from "react-bootstrap";
import { useChatStore } from "../../store/useChatStore";
import { ChatMessage } from "./ChatMessage";
import { IoSend } from "react-icons/io5";
import { askAI } from "../../../helpers/axiosHelper";

export const ChatModal = () => {
  const [message, setMessage] = useState("");

  const { show, closeChat, loading, setLoading, addMessage, messages } =
    useChatStore();

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessage("");

    addMessage({
      sender: "user",
      text: userMessage,
    });

    try {
      setLoading(true);

      const response = await askAI(userMessage);

      addMessage({
        sender: "ai",
        text: response?.answer || "No response received",
      });
    } catch (error) {
      addMessage({
        sender: "ai",
        text: "Something went worng. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal show={show} onHide={closeChat} centered>
      <Modal.Header closeButton>
        <Modal.Title>Finance AI Assistant</Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          height: "400px",
          overflow: "auto",
        }}
      >
        {messages.map((msg, index) => (
          <ChatMessage key={index} sender={msg.sender} text={msg.text} />
        ))}

        {loading && (
          <div className="d-flex justify-content-start">
            <Card bg="secondary" text="white">
              <Card.Body className="py-2 px-3">Thinking...</Card.Body>
            </Card>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <InputGroup>
          <Form.Control
            value={message}
            placeholder="Ask about finances..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading}>
            <IoSend />
          </Button>
        </InputGroup>
      </Modal.Footer>
    </Modal>
  );
};
