import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidenav from "./components/Sidenav";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";

// Lazy-load Langflow route configuration
const loadLangflowRoutes = () =>
  import("langflow/langflowRoutes").then((module) => module.default);

function Home() {
  return (
    <div className="main-content">
      <h1>Welcome to the Parent App</h1>
    </div>
  );
}

export default function App() {
  const [langflowRoutes, setLangflowRoutes] = useState([]);

  useEffect(() => {
    loadLangflowRoutes().then((routes) => setLangflowRoutes(routes));
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Sidenav />
        <Routes>
          <Route path="/" element={<Home />} />
          {langflowRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
          <Route path="/page2" element={<Page2 />} />
        </Routes>
      </div>
    </Router>
  );
}
