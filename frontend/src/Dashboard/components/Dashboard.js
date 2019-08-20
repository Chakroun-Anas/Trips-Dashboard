import React, { Component } from "react";
import Map from "./Map";
import Calendar from "react-calendar";
import "./Dashboard.css";
import Plot from "react-plotly.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countriesVisitorsPerDay: {},
      nbrOfVisitorsByNationality: {},
      percentageOfGenders: {},
      nbrOfPeopleWithinAgeRange: {},
      currentCountry: "France",
      currentDay: 1,
      windowWidth: window.innerWidth
    };
  }

  componentDidMount() {
    this.countriesVisitorsPerDay(1);
    this.nbrOfVisitorsByNationality(1, "France");
    this.percentageOfGenders(1, "France");
    this.nbrOfPeopleWithinAgeRange(1, "France");
    window.addEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  countriesVisitorsPerDay(day) {
    console.log(`🥴: Dashboard -> countriesVisitorsPerDay -> day`, day);
    fetch("http://localhost:3004/countries-visitors-per-day", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        day: `${day < 10 ? "0" : ""}${day}`
      })
    }).then(response => {
      response.json().then(countriesVisitorsPerDay => {
        this.setState({
          countriesVisitorsPerDay
        });
      });
    });
  }

  nbrOfVisitorsByNationality(day, country) {
    fetch("http://localhost:3004/nbr-of-visitors-by-nationality", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        day: `${day < 10 ? "0" : ""}${day}`,
        country
      })
    }).then(response => {
      response.json().then(nbrOfVisitorsByNationality => {
        this.setState({
          nbrOfVisitorsByNationality
        });
      });
    });
  }

  percentageOfGenders(day, country) {
    fetch("http://192.168.1.7:3004/percentage-of-genders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        day: `${day < 10 ? "0" : ""}${day}`,
        country
      })
    }).then(response => {
      response.json().then(percentageOfGenders => {
        this.setState({
          percentageOfGenders
        });
      });
    });
  }

  nbrOfPeopleWithinAgeRange(day, country) {
    fetch("http://localhost:3004/nbr-of-people-within-age-range", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        day: `${day < 10 ? "0" : ""}${day}`,
        country
      })
    }).then(response => {
      response.json().then(nbrOfPeopleWithinAgeRange => {
        this.setState({
          nbrOfPeopleWithinAgeRange
        });
      });
    });
  }

  plotlyGraphWidth() {
    const { windowWidth } = this.state;
    /**
      134: Represents the width of the menu items
      100: Represents dashboard container padding
    */
    if (windowWidth - 134 - 100 > 768) {
      return (windowWidth - 134 - 100) / 2;
    } else if (
      windowWidth - 134 - 100 > 400 &&
      windowWidth - 134 - 100 <= 768
    ) {
      return windowWidth - 134 - 100;
    } else {
      return 400;
    }
  }

  render() {
    const {
      currentDay,
      countriesVisitorsPerDay,
      nbrOfVisitorsByNationality,
      currentCountry,
      percentageOfGenders,
      nbrOfPeopleWithinAgeRange
    } = this.state;
    const plotlyGraphWidth = this.plotlyGraphWidth();
    return (
      <div
        style={{ padding: 50, backgroundColor: "#f0f1f4" }}
        className="dashboard"
      >
        <div
          className="widget calendar"
          style={{
            padding: 30,
            backgroundColor: "white"
          }}
        >
          <h4
            style={{
              fontFamily: "Courgette",
              textAlign: "center",
              marginBottom: 25,
              fontSize: "1.25rem"
            }}
          >
            Day trips
          </h4>
          <Calendar
            minDate={new Date(2018, 7, 1)}
            maxDate={new Date(2018, 7, 31)}
            activeStartDate={new Date(2018, 7, 1)}
            className={`${currentDay === 1 ? "highlightFirstDay" : ""}`}
            onClickDay={date => {
              this.setState(
                {
                  currentDay: date.getDate()
                },
                () => {
                  this.countriesVisitorsPerDay(currentDay);
                  this.nbrOfVisitorsByNationality(currentDay, currentCountry);
                  this.percentageOfGenders(currentDay, currentCountry);
                  this.nbrOfPeopleWithinAgeRange(currentDay, currentCountry);
                }
              );
            }}
          />
        </div>
        <div
          className="widget map"
          id="map"
          style={{ padding: 30, backgroundColor: "white" }}
        >
          <h4
            style={{
              fontFamily: "Courgette",
              textAlign: "center",
              fontSize: "1.25rem"
            }}
          >
            Number of trips by country in {currentDay}
            /08/2018
          </h4>
          <Map
            countriesVisitorsPerDay={countriesVisitorsPerDay}
            changeCountry={currentCountry => {
              this.setState(
                {
                  currentCountry
                },
                () => {
                  this.nbrOfVisitorsByNationality(currentDay, currentCountry);
                  this.percentageOfGenders(currentDay, currentCountry);
                  this.nbrOfPeopleWithinAgeRange(currentDay, currentCountry);
                }
              );
            }}
          />
        </div>
        <div className="nbrOfVisitorsByNationality">
          <Plot
            data={[
              {
                x: ["USA", "China", "Morocco", "Italy", "Spain"],
                y: [
                  nbrOfVisitorsByNationality["USA"],
                  nbrOfVisitorsByNationality["China"],
                  nbrOfVisitorsByNationality["Morocco"],
                  nbrOfVisitorsByNationality["Italy"],
                  nbrOfVisitorsByNationality["Spain"]
                ],
                marker: {
                  color: [
                    "rgba(0,0,0,1)",
                    "rgba(223,188,94, 1)",
                    "rgba(212,0,29,1)",
                    "rgba(0,150,59,1)",
                    "rgba(255,197,204,1)"
                  ]
                },
                type: "bar"
              }
            ]}
            layout={{
              height: 400,
              width: plotlyGraphWidth,
              title: "Number of visitors by nationality"
            }}
          />
        </div>
        <div className="visitorsGender">
          <Plot
            data={[
              {
                values: [
                  percentageOfGenders["males"],
                  percentageOfGenders["females"]
                ],
                labels: ["Male", "Female"],
                marker: {
                  colors: ["#BBDEFB", "#F8BBD0"]
                },
                type: "pie"
              }
            ]}
            layout={{
              height: 400,
              width: plotlyGraphWidth,
              title: "Visitors gender"
            }}
          />
        </div>
        <div className="visitorsByAgeGroup">
          <div className="">
            <Plot
              data={[
                {
                  y: ["18-34", "35-50", "51-75", "+75"],
                  x: [
                    nbrOfPeopleWithinAgeRange["18-34"],
                    nbrOfPeopleWithinAgeRange["35-50"],
                    nbrOfPeopleWithinAgeRange["51-75"],
                    nbrOfPeopleWithinAgeRange["+75"]
                  ],
                  marker: {
                    color: [
                      "rgba(0,0,0,1)",
                      "rgba(223,188,94, 1)",
                      "rgba(212,0,29,1)",
                      "rgba(0,150,59,1)",
                      "rgba(255,197,204,1)"
                    ]
                  },
                  type: "bar",
                  orientation: "h"
                }
              ]}
              layout={{
                height: 400,
                width: plotlyGraphWidth,
                title: "Number of visitors by age group"
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
