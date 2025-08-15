import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import TerminalPage from "@/pages/TerminalPage";
import HomePage from "@/pages/HomePage";
import Protected from "@/components/Protected";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TerminalPage />} />
        <Route
          path="/home"
          element={
            <Protected>
              <HomePage />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
