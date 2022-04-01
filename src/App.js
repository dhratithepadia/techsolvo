import React, {useState} from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Employeeform from './Form';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './Home';

//C:\Users\lenovo\Documents\GitHub\technsolvo\node_modules\bootstrap\dist\css\bootstrap.min.css
export const FormContext = React.createContext();

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Home}/>
          <Route exact path={"/Form"} component={Employeeform}/>
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
