import { Route, Routes, BrowserRouter } from "react-router-dom";
import React from "react";
import SearchBox from "./searchUser/SearchBox";
import { InsertUser } from "./insertUser/InsertUser";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchBox />} />
        <Route path="/insertUser" element={<InsertUser />} />
      </Routes>
    </BrowserRouter>
  );
}
