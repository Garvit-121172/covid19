import React from 'react';
import './App.css';
import Header from './Header';
import CountryWrapper from './CountryWrapper';
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log("asd");
  }
  render() {
    return (
      <div className="App">
        <Header />
        <CountryWrapper />
      </div>
    )
  }
}

export default App;
