import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BusinessesList from "./components/BusinessesList";
import BusinessDetails from "./components/BusinessDetails";
import Axios from "axios";
import "./App.css";

// using context to share data globally for a tree of React components
export const BusinessDirectoryContext = React.createContext({
  businessList: [],
  isLoaded: false,
});

const App = () => {
  const [businessList, setBusinessList] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // using axios to make API request to get related data
    Axios.get("https://api.jsonbin.io/b/6231abada703bb67492d2b8f").then(
      (response) => {
        setBusinessList(response.data);
        setIsLoaded(true);
      }
    );
  }, []);

  return (
    // using Provider to pass the current response of business list to the defined tree
    <BusinessDirectoryContext.Provider value={{ isLoaded, businessList }}>
      <div>
        {/* LOGO header */}
        <header className="text-center text-uppercase py-4 border-bottom">
          <h5>
            <a href="/" style={{ textDecoration: "none", color: "black" }}>
              <div className="logo-sign mx-2"></div>logo
            </a>
          </h5>
        </header>

        {/* showing components based on URL routes after the response data has been loaded*/}
        {isLoaded ? (
          <div className="app-body pt-5">
            <Router>
              <Routes>
                <Route path="/" element={<BusinessesList />} index />
                <Route path="/:businessId" element={<BusinessDetails />} />
              </Routes>
            </Router>
          </div>
        ) : (
          <div className="container my-5 fw-bold fst-italic">Loading directoy...</div>
        )}
      </div>
    </BusinessDirectoryContext.Provider>
  );
};

export default App;
