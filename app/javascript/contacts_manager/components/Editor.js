/* axios - Promise based HTTP client which allows to fetch contacts from backend */
import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import Contact from './Contact';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Header from './Header';
import PropsRoute from './PropsRoute';
import { success } from '../../helpers/notifications';
import { handleAjaxError } from '../../helpers/helpers';

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: null,
    };

    // bind each of needed methods to the component instance
    this.addContact = this.addContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
  }

  componentDidMount() {
    // fetch the contacts from the API
    axios
      .get('/api/contacts.json')
      .then(response => this.setState({ contacts: response.data }))
      .catch(handleAjaxError);
  }

  // this method receives a newContact object
  // then request to API to create a new contact using that data
  // add the new contact to the array of contacts that are being held in state
  // and the UI update accordingly
  addContact(newContact) {
    axios
      .post('/api/contacts.json', newContact)
      .then((response) => {
        success('Contact Added!');
        const savedContact = response.data;
        this.setState(prevState => ({
          contacts: [...prevState.contacts, savedContact],
        }));
        const { history } = this.props;
        history.push(`/contacts/${savedContact.id}`);
      })
      .catch(handleAjaxError);
  }

  // send a DELETE request to API and once a successful response comes back
  // inform the user that the contact has been deleted
  // redirect the user to /contacts and remove the deleted contact from state
  deleteContact(contactId) {
    const sure = window.confirm('Are you sure?');
    if (sure) {
      axios
        .delete(`/api/contacts/${contactId}.json`)
        .then((response) => {
          if (response.status === 204) {
            success('Contact deleted successfully');
            const { history } = this.props;
            history.push('/contacts');

            const { contacts } = this.state;
            this.setState({ contacts: contacts.filter(contact => contact.id !== contactId) });
          }
        })
        .catch(handleAjaxError);
    }
  }

  updateContact(updatedContact) {
    axios
      .put(`/api/contacts/${updatedContact.id}.json`, updatedContact)
      .then(() => {
        success('Contact updated');
        const { contacts } = this.state;
        const idx = contacts.findIndex(contact => contact.id === updatedContact.id);
        contacts[idx] = updatedContact;
        const { history } = this.props;
        history.push(`/contacts/${updatedContact.id}`);
        this.setState({ contacts });
      })
      .catch(handleAjaxError);
  }

  render() {
    const { contacts } = this.state;
    if (contacts === null) return null;

    const { match } = this.props;
    const contactId = match.params.id;
    const contact = contacts.find(e => e.id === Number(contactId));

  // when user selects a contact, then we need to pass that contact
  // to the Contact component for displaying it
  // create for this new component PropsRoute to pass props through React Route
  // Switch component, which will render the one first child Route that matches the location
    return (
      <div>
        <Header />
        <div className="grid">
          <ContactList contacts={contacts} activeId={Number(contactId)} />
          <Switch>
            <PropsRoute
              path="/contacts/new"
              component={ContactForm}
              contacts={contacts}
              onSubmit={this.addContact}
            />
            <PropsRoute
              exact
              path="/contacts/:id/edit"
              component={ContactForm}
              contact={contact}
              contacts={contacts}
              onSubmit={this.updateContact}
            />
            <PropsRoute
              path="/contacts/:id"
              component={Contact}
              contact={contact}
              onDelete={this.deleteContact}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

Editor.propTypes = {
  match: PropTypes.shape(),
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Editor.defaultProps = {
  match: undefined,
};

export default Editor;
