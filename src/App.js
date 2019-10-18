import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './AppTheme';

// Components
import NavBar from './components/NavBar';

// Pages
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
