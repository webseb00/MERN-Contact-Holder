import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthState } from './context/auth/AuthState';
import { ContactState } from './context/contacts/ContactState';
import { AlertState } from './context/alert/AlertState';
import PrivateRoute from './components/routing/PrivateRoute';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Navbar />
            <Alerts />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
}

export default App;