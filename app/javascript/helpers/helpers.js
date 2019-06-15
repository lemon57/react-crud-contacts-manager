import { error } from './notifications';

export const isEmptyObject = obj => Object.keys(obj).length === 0;

export const validateContact = (contact) => {
  const errors = {};

  if (contact.first_name === '') {
    errors.first_name = 'You must enter an First Name';
  }

  if (contact.last_name === '') {
    errors.last_name = 'You must enter a Last Name';
  }

  if (contact.email === '') {
    errors.email = 'You must enter a email';
  }

  if (contact.phone_number === '') {
    errors.phone_number = 'You must enter a phone number';
  }

  return errors;
};

export const handleAjaxError = (err) => {

  error('This email already exists, please provide another!');
  console.warn(err);
};
