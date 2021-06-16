import React from 'react';
// import ReactDom from 'react-dom';
import CountryCard from "./CountryCard";
class CountryWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="country_wrapper">
                {this.props.data.map((country) => (
                    <CountryCard flag={country.countryInfo.flag} name={country.country} newcases={country.todayCases} newdeaths={country.todayDeaths} newrecovery={country.todayRecovered} totcases={country.cases} totdeaths={country.deaths} totrecovery={country.recovered} />
                ))}</div>
        )
    }
}
export default CountryWrapper;