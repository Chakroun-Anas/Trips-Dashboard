import React, { Component } from "react";
import "./App.css";
import LockPage from "./LockPage";
import Dashboard from "./Dashboard";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import sadPlane from "./sad-plane.jpg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: window.localStorage.getItem("isLogged") === "true",
      isBackendUp: false
    };
  }
  componentDidMount() {
    fetch(`http://localhost:3004/`).then(response => {
      response.text().then(() => {
        this.setState({
          isBackendUp: true
        });
      });
    });
  }

  render() {
    const { isLogged, isBackendUp } = this.state;
    return isLogged ? (
      <React.Fragment>
        <div className="AppContainer">
          <Navbar
            logout={() => {
              this.setState({
                isLogged: false
              });
            }}
          />
          {isBackendUp ? (
            <div
              style={{
                display: "flex"
              }}
            >
              <Menu />
              <Dashboard />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                flexDirection: "column"
              }}
            >
              <img
                src={sadPlane}
                alt="Sad plane"
                style={{
                  width: 427,
                  height: 227
                }}
              />
              <h3
                style={{
                  fontFamily: "Courgette",
                  marginTop: 20
                }}
              >
                The server is down
              </h3>
            </div>
          )}
          <div className="MainContent" />
        </div>
      </React.Fragment>
    ) : (
      <div className="App">
        <LockPage
          showDashboard={() => {
            this.setState({
              isLogged: true
            });
          }}
        />
      </div>
    );
  }
}

export default App;
