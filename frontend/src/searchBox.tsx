import React, { useState } from "react";
import SearchResult from "./searchResult";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function SearchBox() {
  const [searchFlag, setSeatchFlag] = useState(false);

  return (
    <div className="App">
      <h1>testPage</h1>
      <input type="text" />
      <button className="btn btn-primary" onClick={() => setSeatchFlag(true)}>
        検索
      </button>
      <SearchResult searchFlag={searchFlag} />
    </div>
  );
}

export default SearchBox;
