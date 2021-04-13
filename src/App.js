import React, { useState } from 'react';
import './App.css';
//import {CreateSurvey} from './pages/CreateSurvey';
import {ExportSurvey} from './pages/ExportSurvey';
import {AnalyseSurvey} from './pages/AnalyseSurvey';
import {Nav} from './components/Nav';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Home} from './pages/home';
import SurveyIFrame from './components/surveyIFrame';
import CreateSurvey from './pages/CreateSurvey';
import Login from '../src/pages/login';
import { AuthService } from './services/authService';
import SignInSide from '../src/pages/login';


function App() {
  
  
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route path="/login" component={SignInSide}/>
        <div>
           <Nav/>

            <Route path="/" exact component={Home}/>
            <Route path="/CreateSurvey" component={CreateSurvey} />
            <Route path="/ExportSurvey" component={ExportSurvey} />
            <Route path="/AnalyseSurvey/:id" component={AnalyseSurvey}/>
            <Route path="/Survey/:id" component={SurveyIFrame}/>
        </div>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
