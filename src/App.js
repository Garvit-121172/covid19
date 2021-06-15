import React from 'react';
import './App.css';
import Header from './Header';
import CountryWrapper from './CountryWrapper';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      searchField: ""
    };

  }
  serchHandler = (e) => {
    this.setState({ searchField: e.target.value });
  }

  async componentDidMount() {
    const allcountries = await fetch("https://disease.sh/v3/covid-19/countries");
    const countries = await allcountries.json();
    this.setState({ countries });
  }
  render() {
    const { countries, searchField } = this.state;
    const filteredData = countries.filter((each) => each.country.toLowerCase().includes(searchField.toLowerCase()));
    filteredData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
    return (
      <div className="App" >
        <Header placeholder="Type in country name to search....." onchange={this.serchHandler} />
        <CountryWrapper data={filteredData} />
      </div>
    )
  }
}

export default App;
