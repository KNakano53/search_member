import React, { useState } from "react";
import SearchResult from "./searchResult";
import "./css/SearchPage.css";

function SearchBox() {
  const [searchFlag, setSeatchFlag] = useState(false);

  return (
    <div className="App">
      <h1>testPage</h1>
      <form id="searchUserForm">
        <div className="d-flex flex-row">
          <div>
            <label htmlFor="inputUserID">加入者番号</label>
            <br />
            <input name="inputUserId" id="inputUserID" type="text" />
          </div>
          <div>
            <label htmlFor="inputUserName">氏名</label>
            <br />
            <input name="inputUserName" id="inputUserName" type="text" />
          </div>
        </div>
        <div className="d-flex flex-row">
          <div>
            <label htmlFor="inputUserAddress">住所</label>
            <br />
            <input name="inputUserId" id="inputUserAddress" type="text" />
          </div>
          <div>
            <label htmlFor="inputUserTel">電話番号</label>
            <br />
            <input name="inputUserId" id="inputUserTel" type="text" />
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setSeatchFlag(true)}>
          検索
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setSeatchFlag(false)}
        >
          リセット
        </button>
      </form>
      <SearchResult searchFlag={searchFlag} />
    </div>
  );
}

export default SearchBox;
