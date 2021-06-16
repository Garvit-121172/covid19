import React from 'react';
import './App.css';
import Header from './Header';
import CountryWrapper from './CountryWrapper';
import Select from './Select.js';
import StatsCard from "./StatsCard";
import SelectTime from "./SelectTime";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      searchField: "",
      selectField: "all",
      chartData: {},
      selectData: {},
      selectTime: {}
    };
  }
  serchHandler = (e) => {
    this.setState({ searchField: e.target.value });
  }
  selectHandler = async (e) => {
    await this.setState({ selectField: e.target.value });
    const eachCountry = await fetch(`https://disease.sh/v3/covid-19/historical/${this.state.selectField}?lastdays=${this.state.selectTime}`);
    const eachData = await eachCountry.json();
    console.log(eachData);
    this.setState({ selectData: eachData });
  }
  selectTimeHandler = async (e) => {
    await this.setState({ selectTime: e.target.value });
    const eachCountry = await fetch(`https://disease.sh/v3/covid-19/historical/${this.state.selectField}?lastdays=${this.state.selectTime}`);
    const eachData = await eachCountry.json();
    console.log(eachData);
    this.setState({ selectData: eachData });
  }


  async componentDidMount() {
    const allcountries = await fetch("https://disease.sh/v3/covid-19/countries");
    const countries = await allcountries.json();
    this.setState({ countries });
    const eachCountry = await fetch(`https://disease.sh/v3/covid-19/historical/${this.state.selectField}?lastdays=30`);
    const eachData = await eachCountry.json();
    console.log(eachData);
    this.setState({ selectData: eachData });
  }
  render() {

    const { countries, searchField } = this.state;
    const filteredData = countries.filter((each) => each.country.toLowerCase().includes(searchField.toLowerCase()));
    filteredData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
    return (
      <div className="App" >
        <Header placeholder="Type in country name to search....." onchange={this.serchHandler} />
        <Select list={this.state.countries} onchange={this.selectHandler} />
        <SelectTime onchange={this.selectTimeHandler} />
        <StatsCard data={this.state.selectData} head />
        <CountryWrapper data={filteredData} />
      </div>
    )
  }
}

export default App;
