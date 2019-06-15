// component to allow to edit and create contacts
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isEmptyObject, validateContact } from '../../helpers/helpers';
import ContactNotFound from './ContactNotFound';
import Alert from 'react-s-alert';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contact: props.contact,
      contacts: props.contacts,
      errors: {},
    };

    // bind each of needed methods to the component instance
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {

  }

  // method to ensure that the fields are cleared
  // when a user is editing a contact and then clicks New Contact
  componentWillReceiveProps({ contact }) {
    this.setState({ contact });
  }

  // call update Contact method when editing any contact
  // refresh state of specific contact
  updateContact(key, value) {
    this.setState(prevState => ({
      contact: {
        ...prevState.contact,
        [key]: value,
      },
    }));
  }

  // check for errors when the form is submitted
  // simply that each field has a value - validateContact and isEmptyObject
  handleSubmit(e) {
    e.preventDefault();
    const { contact } = this.state;
    // console.log(contact.email);
    const { contacts } = this.state;
    const errors = validateContact(contact);

    if (!isEmptyObject(errors)) {
      this.setState({ errors });
    } else {
      const { onSubmit } = this.props;
      onSubmit(contact);
    }
  }

  // this method update the contact object which holding in state
  // this.state.contact should reflect what has been entered into the form
  handleInputChange(contact) {
    const { target } = contact;
    const { name } = target;
    const value = target.value;
    this.updateContact(name, value);
  }

  renderErrors() {
    const { errors } = this.state;

    if (isEmptyObject(errors)) {
      return null;
    }

    return (
      <div className="errors">
        <h3>The following errors prohibited the contact from being saved:</h3>
        <ul>
          {Object.values(errors).map(error => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { contact, errorMessage } = this.state;
    const { path } = this.props;

    if (!contact.id && path === '/contacts/:id/edit') return <ContactNotFound />;

    const cancelURL = contact.id ? `/contacts/${contact.id}` : '/contacts';
    const title = contact.id ? `${contact.first_name}   ${contact.last_name}` : 'New Contact';

    return (
      <div>
        <h2>{title}</h2>

        {this.renderErrors()}

        <form className="contactForm" onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="first_name">
              <strong>First name:</strong>
              <input
                type="text"
                id="contact_id"
                name="first_name"
                onChange={this.handleInputChange}
                value={contact.first_name}
                autoFocus
              />
            </label>
          </div>
          <div>
            <label htmlFor="last_name">
              <strong>First name:</strong>
              <input
                type="text"
                id="contact_id"
                name="last_name"
                onChange={this.handleInputChange}
                value={contact.last_name}
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              <strong>Email:</strong>
              <input
                type="text"
                id="contact_id"
                name="email"
                onChange={this.handleInputChange}
                value={contact.email}
              />
            </label>
          </div>
          <div>
            <label htmlFor="phone_number">
              <strong>Phone number:</strong>
              <input
                type="text"
                id="contact_id"
                name="phone_number"
                onChange={this.handleInputChange}
                value={contact.phone_number}
              />
            </label>
          </div>


          <div className="form-actions">
            <button className="button save" type="submit">Save</button>
              <Link to={cancelURL}>
               <button className="button cancel">
                  Cancel
                </button>
              </Link>
          </div>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  contact: PropTypes.shape(),
  onSubmit: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
};

ContactForm.defaultProps = {
  contact: {
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  },
};

export default ContactForm;
