import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// screens
// import Home from "./Home";
// import About from "./About";
import Waku from "./pages/Home";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Waku />} />
          {/* <Route exact path="/" element={<Home/>} /> */}
          {/* <Route exact path="/about" element={<About />} /> */}
          <Route render={() => <p>Page not found</p>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
