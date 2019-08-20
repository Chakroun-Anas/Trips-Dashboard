import React, { Component } from "react";
import "./App.css";
import LockPage from "./LockPage";
import Dashboard from "./Dashboard";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDashboard: window.localStorage.getItem("isLogged") === "true"
    };
  }

  render() {
    const { showDashboard } = this.state;
    return showDashboard ? (
      <React.Fragment>
        <div className="AppContainer">
          <Navbar
            logout={() => {
              this.setState({
                showDashboard: false
              });
            }}
          />
          <div className="MainContent">
            <Menu />
            <Dashboard />
          </div>
        </div>
      </React.Fragment>
    ) : (
      <div className="App">
        <LockPage
          showDashboard={() => {
            this.setState({
              showDashboard: true
            });
          }}
        />
      </div>
    );
  }
}

export default App;
