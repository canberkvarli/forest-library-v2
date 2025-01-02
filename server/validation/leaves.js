export default function validateLeafInput(data) {
  let errors = {};
  const validText = (str) => typeof str === "string" && str.trim().length > 0;

  data.text = validText(data.text) ? data.text : "";

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
