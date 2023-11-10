import "../css/SearchPage.css";
import React, { useState } from "react";
import { ShowMessage } from "../ShowMessage";
import { ShowTable } from "./ShowTable";
import { Link } from "react-router-dom";

function SearchBox(): JSX.Element {
  const [data, setData] = useState([]);
  const [message, setMesssage] = useState("");
  const [pageIndex, setPageIndex] = useState(0);

  const [idInput, setIdInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [telInput, setTelInput] = useState("");

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
        id,
        name,
        address,
        tel,
      }),
    };
    // console.log(requestOptions);
    const url = "http://localhost:3001/search-member";

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      setMesssage("通信に失敗しました");
    }
    const json = await response.json();
    setMesssage(json.message);
    setData(json.data);
  }

  const submitHandler = () => {
    const id = idInput;
    const name = nameInput;
    const address = addressInput;
    const tel = telInput;
    setPageIndex(0);
    callApi(id, name, address, tel);
  };

  const resetData = () => {
    setMesssage("");
    setData([]);
    setIdInput("");
    setNameInput("");
    setAddressInput("");
    setTelInput("");
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
                className="searchInput form-control"
                value={idInput}
                onChange={(e) => {
                  setIdInput(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="inputUserName">氏名</label>
              <br />
              <input
                name="inputUserName"
                id="inputUserName"
                type="text"
                className="searchInput form-control"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="d-flex flex-row">
            <div>
              <label htmlFor="inputUserAddress">住所</label>
              <br />
              <input
                name="inputUserAddress"
                id="inputUserAddress"
                type="text"
                className="searchInput form-control"
                value={addressInput}
                onChange={(e) => {
                  setAddressInput(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="inputUserTel">電話番号</label>
              <br />
              <input
                name="inputUserTel"
                id="inputUserTel"
                type="text"
                className="searchInput form-control"
                value={telInput}
                onChange={(e) => {
                  setTelInput(e.target.value);
                }}
              />
            </div>
          </div>
          <div style={{ marginLeft: "7em" }}>
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
      <Link to={"/insertUser"}>
        <button className="btn btn-primary position-right">加入者登録</button>
      </Link>
      <ShowMessage message={message} />
      <ShowTable
        data={data}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
      />
    </div>
  );
}

export default SearchBox;
