import React from 'react';
import './App.css';
import Header from './Components/Header';
import CountryWrapper from './Components/CountryWrapper';
import Select from './Components/Select.js';
import StatsWrapper from "./Components/StatsWrapper";
import SelectTime from "./Components/SelectTime";
import MyChart from "./Components/MyChart"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      searchField: "",
      selectField: "all",
      chartData: {},
      selectData: {},
      selectTime: {},
      statsData: {},
      Xvalue: [],
      caseValues: [],
      deathValues: [],
      recoveredValues: []
    };
  }
  serchHandler = (e) => {
    this.setState({ searchField: e.target.value });
  }
  selectHandler = async (e) => {
    await this.setState({ selectField: e.target.value });
    const eachCountry = await fetch(`https://disease.sh/v3/covid-19/historical/${this.state.selectField}?lastdays=${this.state.selectTime}`);
    const eachData = await eachCountry.json();
    console.log(eachData.timeline);
    const caseXval = [];
    var caseYval = [];
    for (let x in eachData.timeline.cases) {
      await caseXval.push(x);
    }
    caseYval = await Object.values(eachData.timeline.cases);
    await this.setState({ Xvalue: caseXval });
    await this.setState({ caseValues: caseYval });
    await this.setState({ selectData: eachData });
    const stats = this.state.selectField === "all" ? await fetch(`https://disease.sh/v3/covid-19/${this.state.selectField}`) : await fetch(`https://disease.sh/v3/covid-19/countries/${this.state.selectField}?stict=true`);
    const statsData = await stats.json();
    await this.setState({ statsData });
  }
  selectTimeHandler = async (e) => {
    await this.setState({ selectTime: e.target.value });
    const eachCountry = await fetch(`https://disease.sh/v3/covid-19/historical/${this.state.selectField}?lastdays=${this.state.selectTime}`);
    const stats = await fetch(`https://disease.sh/v3/covid-19/countries/${this.state.selectField}?strict=true`);
    const statsData = await stats.json();
    const eachData = await eachCountry.json();
    await this.setState({ statsData });
    await this.setState({ selectData: eachData });
  }


  async componentDidMount() {
    const allcountries = await fetch("https://disease.sh/v3/covid-19/countries");
    const countries = await allcountries.json();
    this.setState({ countries });
    const eachCountry = await fetch(`https://disease.sh/v3/covid-19/historical/${this.state.selectField}?lastdays=${this.state.selectTime}`);
    const eachData = await eachCountry.json();
    this.setState({ selectData: eachData });
    const stats = this.state.selectField === "all" ? await fetch(`https://disease.sh/v3/covid-19/${this.state.selectField}`) : await fetch(`https://disease.sh/v3/covid-19/countries/${this.state.selectField}?stict=true`);
    const statsData = await stats.json();
    this.setState({ statsData });
  }
  render() {
    console.log(this.state.Xvalue);
    const { countries, searchField } = this.state;
    const filteredData = countries.filter((each) => each.country.toLowerCase().includes(searchField.toLowerCase()));
    filteredData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
    return (
      <div className="App" >
        <Header placeholder="Type in country name to search....." onchange={this.serchHandler} />
        <div className="selectwrapper">
          <Select list={this.state.countries} onchange={this.selectHandler} />
          <SelectTime onchange={this.selectTimeHandler} />
        </div>
        <MyChart caseXval={this.state.Xvalue} caseYval={this.state.caseValues} />
        <StatsWrapper todayCases={this.state.statsData.todayCases} todayDeaths={this.state.statsData.todayDeaths} todayRecovered={this.state.statsData.todayRecovered} />
        <CountryWrapper data={filteredData} />
      </div>
    )
  }
}

export default App;
