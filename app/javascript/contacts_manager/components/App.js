import React from 'react';
import { Route } from 'react-router-dom';
import { Alert } from '../../helpers/notifications';
import Editor from './Editor';
import '../App.css';

const App = () => (
  <div>
    <Route path="/contacts/:id?" component={Editor} />
    <Alert stack={{ limit: 2 }} />
  </div>
);

export default App;
