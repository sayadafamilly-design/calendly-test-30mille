import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Availability from "./pages/Availability";
import PublicBooking from "./pages/PublicBooking";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/availability" element={<Availability />} />
        <Route path="/book/:username" element={<PublicBooking />} />
      </Routes>
    </BrowserRouter>
  );
}