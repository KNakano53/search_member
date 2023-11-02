import SearchResult from "./searchResult";
import "./css/SearchPage.css";
import React, { useState } from "react";

function SearchBox() {
  const idInput = React.createRef<HTMLInputElement>();
  const nameInput = React.createRef<HTMLInputElement>();
  const addressInput = React.createRef<HTMLInputElement>();
  const telInput = React.createRef<HTMLInputElement>();
  const [data, setData] = useState([]);

  async function callApi(
    id: string | undefined,
    name: string | undefined,
    address: string | undefined,
    tel: string | undefined
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        address: address,
        tel: tel,
      }),
    };
    console.log(requestOptions);
    const url = "http://localhost:3001/search-member";

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const json = await response.json();
    setData(json.data);
  }

  const submitHandler = () => {
    const id = idInput.current?.value;
    const name = nameInput.current?.value;
    const address = addressInput.current?.value;
    const tel = telInput.current?.value;
    callApi(id, name, address, tel);
  };
  const resetData = () => {
    setData([]);
  };

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
                ref={idInput}
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
                ref={nameInput}
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
                ref={addressInput}
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
                ref={telInput}
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
              onClick={() => {
                submitHandler();
              }}
            >
              検索
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                resetData();
              }}
            >
              リセット
            </button>
          </div>
        </div>
      </div>
      <SearchResult data={data} />
    </div>
  );
}

export default SearchBox;
