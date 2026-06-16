import { Card } from "react-bootstrap";

export const ChatMessage = ({ sender, text }) => {
  return (
    <div
      className={`d-flex mb-2 ${
        sender === "user" ? "justify-content-end" : "justify-content-start"
      }`}
    >
      <Card
        bg={sender === "user" ? "primary" : "secondary"}
        text="white"
        style={{ maxWidth: "75%" }}
      >
        <Card.Body className="py-2 px-3">{text}</Card.Body>
      </Card>
    </div>
  );
};
