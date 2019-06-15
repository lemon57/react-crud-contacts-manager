// component to display a list of contacts
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faAt, faCoffee } from '@fortawesome/free-solid-svg-icons'

class ContactList extends React.Component {
  constructor(props) {
    super(props);
  }

// method which returns a list of contacts for the render
  renderContacts() {
    const { activeId, contacts } = this.props;

// using React router’s Link component to create the navigation around the app
      return contacts.map(contact => (
      <Link to={`/contacts/${contact.id}`} className={activeId === contact.id ? 'active' : ''} key={contact.id}>
        <li key={contact.id}>
          {contact.first_name}
          {'  '}
          {contact.last_name}
          <p><FontAwesomeIcon icon={faAt}/> {contact.email} <span>&nbsp;&nbsp;&nbsp;</span> <FontAwesomeIcon icon={faPhone}/> {contact.phone_number}</p>
        </li>
      </Link>
    ));
  }

  render() {
    return (
      <section className="contactList">
        <h2>
        Contacts
          <Link to="/contacts/new">
            <button className="button new">
              New Contact
            </button>
          </Link>
        </h2>

        <ul>{this.renderContacts()}</ul>
      </section>
    );
  }
}

// simple prop validation to ensure that the component is passed an array
ContactList.propTypes = {
  activeId: PropTypes.number,
  contacts: PropTypes.arrayOf(PropTypes.object),
};

ContactList.defaultProps = {
  activeId: undefined,
  contacts: [],
};

export default ContactList;
