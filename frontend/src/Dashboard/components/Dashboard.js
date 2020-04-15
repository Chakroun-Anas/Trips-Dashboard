import React, { Component } from "react";
import Map from "./Map";
import Calendar from "react-calendar";
import "./Dashboard.css";
import Plot from "react-plotly.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDashboard: false,
      countriesTotalVisitors: null,
      countriesTotalVisitorsByAgeRange: null,
      countriesTotalVisitorsByNationality: null,
      countriesTotalVisitorsByGender: null,
      currentCountry: "FRANCE",
      currentDay: 1,
      windowWidth: window.innerWidth
    };
  }

  componentDidMount() {
    const initialDate = "07-01-2020";
    this.countriesTotalVisitors(initialDate);
    this.countriesTotalVisitorsByAgeRange(initialDate);
    this.countriesTotalVisitorsByNationality(initialDate);
    this.countriesTotalVisitorsByGender(initialDate);
    window.addEventListener("resize", this.handleWindowResize);
  }

  handleWindowResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  countriesTotalVisitors(date) {
    fetch(`http://localhost:3004/travels/${date}`).then(response => {
      response.json().then(countriesTotalVisitors => {
        this.setState({
          countriesTotalVisitors
        });
      });
    });
  }

  countriesTotalVisitorsByAgeRange(date) {
    fetch(`http://localhost:3004/travels/${date}/ageRanges`).then(response => {
      response.json().then(countriesTotalVisitorsByAgeRange => {
        this.setState({
          countriesTotalVisitorsByAgeRange
        });
      });
    });
  }

  countriesTotalVisitorsByNationality(date) {
    fetch(`http://localhost:3004/travels/${date}/nationalities/`).then(
      response => {
        response.json().then(countriesTotalVisitorsByNationality => {
          this.setState({
            countriesTotalVisitorsByNationality
          });
        });
      }
    );
  }

  countriesTotalVisitorsByGender(date) {
    fetch(`http://localhost:3004/travels/${date}/genders/`).then(response => {
      response.json().then(countriesTotalVisitorsByGender => {
        this.setState({
          countriesTotalVisitorsByGender
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
      currentCountry,
      countriesTotalVisitors,
      countriesTotalVisitorsByAgeRange,
      countriesTotalVisitorsByNationality,
      countriesTotalVisitorsByGender
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
            minDate={new Date(2020, 6, 1)}
            maxDate={new Date(2020, 6, 31)}
            activeStartDate={new Date(2020, 6, 1)}
            className={`${currentDay === 1 ? "highlightFirstDay" : ""}`}
            onClickDay={date => {
              const dateUSAFormat = `0${date.getMonth() +
                1}-${date.getDate()}-${date.getFullYear()}`;
              this.setState(
                {
                  currentDay: date.getDate()
                },
                () => {
                  this.countriesTotalVisitors(dateUSAFormat);
                  this.countriesTotalVisitorsByAgeRange(dateUSAFormat);
                  this.countriesTotalVisitorsByNationality(dateUSAFormat);
                  this.countriesTotalVisitorsByGender(dateUSAFormat);
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
            Number of trips by country in 07-
            {currentDay}
            -2020
          </h4>
          <Map
            countriesTotalVisitors={countriesTotalVisitors}
            changeCountry={currentCountry => {
              this.setState({
                currentCountry
              });
            }}
          />
        </div>
        <div className="nbrOfVisitorsByNationality">
          {countriesTotalVisitorsByNationality && (
            <Plot
              data={[
                {
                  x: ["USA", "CHINA", "MOROCCO", "ITALY", "SPAIN"],
                  y: [
                    countriesTotalVisitorsByNationality[currentCountry]["USA"],
                    countriesTotalVisitorsByNationality[currentCountry][
                      "CHINA"
                    ],
                    countriesTotalVisitorsByNationality[currentCountry][
                      "MOROCCO"
                    ],
                    countriesTotalVisitorsByNationality[currentCountry][
                      "ITALY"
                    ],
                    countriesTotalVisitorsByNationality[currentCountry]["SPAIN"]
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
          )}
        </div>
        <div className="visitorsGender">
          {countriesTotalVisitorsByGender && (
            <Plot
              data={[
                {
                  values: [
                    countriesTotalVisitorsByGender[currentCountry]["MALE"],
                    countriesTotalVisitorsByGender[currentCountry]["FEMALE"]
                  ],
                  labels: ["MALE", "FEMALE"],
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
          )}
        </div>
        <div className="visitorsByAgeGroup">
          {countriesTotalVisitorsByAgeRange && (
            <Plot
              data={[
                {
                  y: ["18-34", "35-50", "51-75", "+75"],
                  x: [
                    countriesTotalVisitorsByAgeRange[currentCountry]["18_34"],
                    countriesTotalVisitorsByAgeRange[currentCountry]["35_50"],
                    countriesTotalVisitorsByAgeRange[currentCountry]["51_75"],
                    countriesTotalVisitorsByAgeRange[currentCountry]["+75"]
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
                title: "Number of visitors by age range"
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
