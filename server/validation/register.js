import validator from "validator";

const { isLength, isAlphanumeric, isEmpty, equals } = validator;

export default function validateRegisterInput(data) {
  let errors = {};

  // Helper function to check if string is valid (not empty and not only spaces)
  const validText = (str) => typeof str === "string" && str.trim().length > 0;

  data.username = validText(data.username) ? data.username : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.password2) ? data.password2 : "";

  // Username validations
  if (!isLength(data.username, { min: 2, max: 20 })) {
    errors.username = "Username must be between 2 and 20 characters";
  }
  if (!isAlphanumeric(data.username)) {
    errors.username = "Username should contain alphabetic characters";
  }
  if (isEmpty(data.username)) {
    errors.username = "Username is required";
  }

  // Password validations
  if (isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  // Password confirmation validation
  if (!equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
