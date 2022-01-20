import React, { Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Launches from './components/Launches';
import Launch from  './components/Launch.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})
class App extends Component {
  render(){
    return (
      <ApolloProvider client={client}>
      <Router>
        <div className="container">
        <h2 style={{ width: 300, display: 'block', margin: 'auto' }}>Space X</h2>
        <Route exact path="/" component={Launches} />
            <Route exact path="/launch/:id" component={Launch} />
      </div>
      </Router>
      
      </ApolloProvider>
    );
  }  
}

export default App;
