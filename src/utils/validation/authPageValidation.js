import Ajv from 'ajv';
import validationSchema from './authPageValidationScheme.js';

const ajv = new Ajv();

export const validateFields = (email, password, name) => {
  const data = { name, email, password };
  const validate = ajv.compile(validationSchema);
  const isValid = validate(data);

  return isValid;
};
