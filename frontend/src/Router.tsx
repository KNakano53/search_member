import { Route, Routes } from "react-router-dom";
import React from "react";
import SearchBox from "./searchUser/SearchBox";
import { InsertUser } from "./insertUser/InsertUser";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<SearchBox />} />
      <Route path="/insertUser" element={<InsertUser />} />
    </Routes>
  );
}
