// import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router";
import Structure from "./structure/Structure";
import Dashboard from "./mainContent/Dashboard";
import HungarianAssigFrontEnd from "./mainContent/Hungarian";

function App() {
  return (
    <>
      <BrowserRouter>
        <Structure>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/demo/hungarian"
              element={<HungarianAssigFrontEnd />}
            />
          </Routes>
        </Structure>
      </BrowserRouter>
    </>
  );
}

export default App;
