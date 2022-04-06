import "./App.css";
import Albums from "./components/Albums";
import { Route, Routes } from "react-router-dom";
import WebApp from "./pages/implicit_grant/App";
import CreatePlaylist from "./pages/CreatePlaylist";
import { connect } from "react-redux";
import { Component } from "react";

class App extends Component {
  componentDidMount() {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    let foundToken = hash.access_token;
    if (foundToken) {
      this.props.setToken(foundToken);
    }
  }

  isValidToken = () => {
    if (this.props.state.token) {
      return true;
    }
  };

  render() {
    return (
      <div className="wrapper">
        {/* {this.isValidToken() ? <Albums token={this.props.token} /> : <WebApp />} */}
        <Routes>
          <Route path="/" element={<WebApp />} />
          <Route path="/dashboard" element={<Albums />} />
          <Route path="/createplaylist" element={<CreatePlaylist />} />
        </Routes>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setToken: (tokenText) =>
      dispatch({ type: "SET_TOKEN", payload: tokenText }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
