import { useEffect,useState } from "react";
import { BrowserRouter, Route, Router, Routes, Navigate } from "react-router-dom";
import { endPoints } from "./api/apiEndpoints/endPoints";
import { getApi } from "./api/apiMethods/apiMethods";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";

function App() {


  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
