import React, { Component } from "react";
import "./LockPage.css";

class LockPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredKey: "",
      wrongKey: false
    };
  }

  evaluateSecretKey = () => {
    if (this.state.enteredKey !== "PASS") {
      this.setState({
        wrongKey: true
      });
    } else {
      window.localStorage.setItem("isLogged", true);
      this.props.showDashboard();
    }
  };

  render() {
    return (
      <div className="lockPage">
        <div className="lockPageContainer">
          <div>
            <p style={{ display: "inline-block" }}>
              <img src={require("./assets/logo.png")} alt="AgriAfrica Logo" />
            </p>
            <h4 style={{}} className="lockPageTitle">
              Trips Admin
            </h4>
            <div style={{ width: "100%", marginTop: 15 }}>
              <input
                type="password"
                style={{ width: "100%", borderRadius: 5 }}
                placeholder="Code Secret"
                onChange={evt => {
                  if (evt.target.value !== this.state.enteredKey) {
                    this.setState({
                      enteredKey: evt.target.value,
                      wrongKey: false
                    });
                  }
                }}
                aria-label="Code Secret"
              />
            </div>
            {this.state.wrongKey && (
              <p style={{ color: "#d9534f", marginTop: 10 }}>
                Le code secret entré est erroné.
              </p>
            )}
            <div style={{ marginTop: 20 }}>
              <button
                type="button"
                className="btn enterButton"
                onClick={this.evaluateSecretKey}
              >
                ENTRER
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LockPage;
