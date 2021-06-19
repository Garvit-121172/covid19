import React from 'react';
import './App.css';
import Header from './Components/Header';
import CountryWrapper from './Components/CountryWrapper';
import Select from './Components/Select.js';
import StatsWrapper from "./Components/StatsWrapper";
import SelectTime from "./Components/SelectTime";
import MyChart from "./Components/MyChart"
// import MyMap from './Components/MyMap';
import SMap from './Components/SMap';
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      countries: [],
      searchField: "",
      selectField: "all",
      chartData: {},
      selectData: {},
      selectTime: 7,
      statsData: {},
      Xvalue: [],
      caseValues: [],
      deathValues: [],
      recoveredValues: [],
    };
  }
  serchHandler = (e) => {
    this.setState({ searchField: e.target.value });
  }
  selectHandler = async (e) => {
    await this.setState({ selectField: e.target.value });
    const eachCountry = await fetch(`https://disease.sh/v3/covid-19/historical/${this.state.selectField}?lastdays=${this.state.selectTime}`);
    const eachData = await eachCountry.json();
    await this.setState({ selectData: eachData });
    const stats = this.state.selectField === "all" ? await fetch(`https://disease.sh/v3/covid-19/${this.state.selectField}`) : await fetch(`https://disease.sh/v3/covid-19/countries/${this.state.selectField}?stict=true`);
    const statsData = await stats.json();
    await this.setState({ statsData });
  }
  setContent = async (e) => {
    this.setState({ content: e.target.value })
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
  static getDerivedStateFromProps(props, state) {
    const url = `https://disease.sh/v3/covid-19/historical/${state.selectField}?lastdays=${state.selectTime}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (state.selectField === "all") {
          if (state.Xvalue.length !== data.cases.length) {
            state.Xvalue = Object.keys(data.cases);
          }
          state.caseValues = Object.values(data.cases);
          state.deathValues = Object.values(data.deaths);
          state.recoveredValues = Object.values(data.recovered);
        }
        else {
          if (state.Xvalue.length !== data.timeline.recovered.length) {
            state.Xvalue = Object.keys(data.timeline.cases);
          }
          state.caseValues = Object.values(data.timeline.cases);
          state.deathValues = Object.values(data.timeline.deaths);
          state.recoveredValues = Object.values(data.timeline.recovered);
        }
      })
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
        <MyChart x1={this.state.Xvalue} y1={this.state.caseValues} y2={this.state.deathValues} y3={this.state.recoveredValues} />

        <SMap setTooltipContent={this.setContent} />
        <ReactTooltip>{this.state.content}</ReactTooltip>
        <StatsWrapper todayCases={this.state.statsData.todayCases} todayDeaths={this.state.statsData.todayDeaths} todayRecovered={this.state.statsData.todayRecovered} />
        <CountryWrapper data={filteredData} />
      </div>
    )
  }
}

export default App;
