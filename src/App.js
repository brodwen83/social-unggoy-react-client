import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { authenticateUser, userLoggedOut } from './redux/user/user.actions';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './AppTheme';

// Components
import NavBar from './components/NavBar';

// Pages
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import AuthRoute from './components/Route/AuthRoute';

const token = localStorage.FBIdToken;

if (token) {
  store.dispatch(authenticateUser(token));
} else store.dispatch(userLoggedOut());

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <AuthRoute exact path='/login' component={Login} />
              <AuthRoute exact path='/signup' component={Signup} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
