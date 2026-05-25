import Form from "react-bootstrap/Form";

export const CustomInput = ({ label, error, ...rest }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>

      <Form.Control {...rest} isInvalid={error?.length > 0} />

      {Array.isArray(error) &&
        error.map((err, i) => (
          <p key={i} className="text-danger m-0">
            {err}
          </p>
        ))}
    </Form.Group>
  );
};
