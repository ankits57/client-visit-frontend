import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

import Visits from "./pages/Visits";
import CreateVisit from "./pages/CreateVisit";
import VisitDetails from "./pages/VisitDetails";

import PublicVisit from "./pages/PublicVisit";

import Register from "./pages/Register";

import Home from "./pages/Home";

import EditVisit from "./pages/EditVisit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/visit/:token" element={<PublicVisit />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/visits"
          element={
            <ProtectedRoute>
              <Visits />
            </ProtectedRoute>
          }
        />
        <Route
          path="/visits/create"
          element={
            <ProtectedRoute>
              <CreateVisit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/visits/:visitId/edit"
          element={
            <ProtectedRoute>
              <EditVisit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/visits/:visitId"
          element={
            <ProtectedRoute>
              <VisitDetails />
            </ProtectedRoute>
          }
        />

        <Route path="/visit/:token" element={<PublicVisit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
