// component to display one contact
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import ContactNotFound from './ContactNotFound';

const Contact = ({ contact, onDelete }) => {
  if (!contact) return <ContactNotFound />;

  return (
    <div className="contactContainer">
      <h2>
        {contact.first_name}
        {'  '}
        {contact.last_name}
        {' '}
        <Link to={`/contacts/${contact.id}/edit`}>
          <button className="button edit" type="button">
            Edit
          </button>
        </Link>
        <button className="button delete" type="button" onClick={() => onDelete(contact.id)}>
          Delete
        </button>
      </h2>
      <table className="contactView">
        <tbody>
          <tr>
            <th>First name:</th>
            <td>{contact.first_name}</td>
          </tr>
          <tr>
            <th>Last name</th>
            <td>{contact.last_name}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{contact.email}</td>
          </tr>
          <tr>
            <th>Phone number:</th>
            <td>{contact.phone_number}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape(),
  onDelete: PropTypes.func.isRequired,
};

Contact.defaultProps = {
  contact: undefined,
};

export default Contact;
