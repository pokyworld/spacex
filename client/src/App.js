import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import AppRouter from "./routes";
import './styles/scss/App.scss';

const client = new ApolloClient({
  uri: "https://localhost:8443/graphql"
});

export class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppRouter />
      </ApolloProvider>
    );
  }
};

export default App;
