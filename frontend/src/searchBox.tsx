import React, { useState } from "react";
import SearchResult from "./searchResult";
import "./css/SearchPage.css";

function SearchBox() {
  const [searchFlag, setSeatchFlag] = useState(false);

  return (
    <div className="App">
      <h1 className="text-center">加入者検索</h1>
      <div className="searchBox mx-auto">
        <div id="searchUserForm">
          <div className="d-flex flex-row">
            <div>
              <label htmlFor="inputUserID">加入者番号</label>
              <br />
              <input
                name="inputUserId"
                id="inputUserID"
                type="text"
                className="searchInput"
              />
            </div>
            <div>
              <label htmlFor="inputUserName">氏名</label>
              <br />
              <input
                name="inputUserName"
                id="inputUserName"
                type="text"
                className="searchInput"
              />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div>
              <label htmlFor="inputUserAddress">住所</label>
              <br />
              <input
                name="inputUserId"
                id="inputUserAddress"
                type="text"
                className="searchInput"
              />
            </div>
            <div>
              <label htmlFor="inputUserTel">電話番号</label>
              <br />
              <input
                name="inputUserId"
                id="inputUserTel"
                type="text"
                className="searchInput"
              />
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="showAll"
              style={{ marginLeft: "20px" }}
            />
            <label
              htmlFor="showAll"
              style={{ marginRight: "5px", marginLeft: "5px" }}
            >
              全件表示
            </label>
            <button
              className="btn btn-primary"
              onClick={() => setSeatchFlag(true)}
            >
              検索
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setSeatchFlag(false)}
            >
              リセット
            </button>
          </div>
        </div>
      </div>
      <SearchResult searchFlag={searchFlag} />
    </div>
  );
}

export default SearchBox;
