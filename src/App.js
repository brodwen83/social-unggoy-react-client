import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Components
import NavBar from './components/NavBar';

// Pages
import Home from './pages/home';
import SignUp from './pages/signup';
import Login from './pages/login';

function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
