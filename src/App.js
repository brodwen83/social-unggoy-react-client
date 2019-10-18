import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './App.css';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './AppTheme';

// Components
import NavBar from './components/NavBar';

// Pages
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import AuthRoute from './components/Route/AuthRoute';

let authenticated;
const token = localStorage.FBToken;

if (token) {
  const { exp } = jwtDecode(token);

  if (exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else authenticated = true;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <AuthRoute
              authenticated={authenticated}
              exact
              path='/login'
              component={Login}
            />
            <AuthRoute
              authenticated={authenticated}
              exact
              path='/signup'
              component={Signup}
            />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
