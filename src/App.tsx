// import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router";
import Structure from "./structure/Structure";
import Dashboard from "./mainContent/Dashboard";
import HungarianAssigFrontEnd from "./mainContent/Hungarian";
import CbbaDemo from "./mainContent/CbbaTest";

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
            <Route path="/demo/cbba" element={<CbbaDemo />} />
          </Routes>
        </Structure>
      </BrowserRouter>
    </>
  );
}

export default App;
