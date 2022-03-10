import React from "react";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

function AlertMessage({ variant, message }) {
  return (
    <Alert variant={variant}>
      <Alert.Heading>{message}</Alert.Heading>
    </Alert>
  );
}
AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default AlertMessage;
