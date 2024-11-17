import React, { Suspense, lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/home"));
const Scenario = lazy(()=>import("./pages/scenario"))
// const LeapAI = lazy(() => import("./pages/leap-ai"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Scenario />} path="/:tagId" />
      </Routes>
    </Suspense>
  );
}

export default App;
