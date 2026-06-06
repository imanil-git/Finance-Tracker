import { useState } from "react";
import { Modal, Button, Form, InputGroup, Card } from "react-bootstrap";
import { BsChatDotsFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { askAI } from "../../helpers/axiosHelper";

export const ChatBox = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi I am your Finance Assistant. Ask me anything bout your expenses, income or savings.",
    },
  ]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setMessage("");

    //add user message
    setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);

    setLoading(true);

    try {
      const res = await askAI(userMsg);
      console.log(res);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: res.answer || res.message || "No response from AI",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong. Try again",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        variant="primary"
        className="rounded-circle shadow"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          zIndex: 999,
        }}
        onClick={() => setShow(true)}
      >
        <BsChatDotsFill size={22} />
      </Button>

      {/* Chat Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Finance AI Assistant</Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            height: "400px",
            overflow: "auto",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={1}
              className={`d-flex mb-2 ${
                msg.sender === "user"
                  ? "justify-content-end"
                  : "justify-content-start"
              }`}
            >
              <Card
                bg={msg.sender === "user" ? "primary" : "secondary"}
                text="white"
                style={{ maxWidth: "75%" }}
              >
                <Card.Body className="py-2 px-3">{msg.text}</Card.Body>
              </Card>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div className="d-flex justify-content-start mb-2">
              <Card bg="secondary" text="white">
                <Card.Body className="py-2 px-3">Thinking...</Card.Body>
              </Card>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <InputGroup>
            <Form.Control
              placeholder="Ask about your finances..."
              value={message}
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
    </>
  );
};
