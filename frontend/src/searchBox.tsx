import React, { useState } from "react";
import SearchResult from "./searchResult";
import "./css/SearchPage.css";

function SearchBox() {
  const [searchFlag, setSeatchFlag] = useState(false);

  return (
    <div className="App">
      <h1>testPage</h1>
      <input name="inputUserId" type="text" />
      <button className="btn btn-primary" onClick={() => setSeatchFlag(true)}>
        検索
      </button>
      <button className="btn btn-primary" onClick={() => setSeatchFlag(false)}>
        リセット
      </button>
      <SearchResult searchFlag={searchFlag} />
    </div>
  );
}

export default SearchBox;
