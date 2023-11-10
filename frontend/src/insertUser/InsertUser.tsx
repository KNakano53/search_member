import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/InsertPage.css";
import { ShowMessage } from "../ShowMessage";

export function InsertUser(): JSX.Element {
  const [nameInput, setNameInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [telInput, setTelInput] = useState("");

  const [message, setMesssage] = useState("");

  async function callApi(
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
        name,
        address,
        tel,
      }),
    };
    // console.log(requestOptions);
    const url = "http://localhost:3001/search-member/insert";

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      //   setMesssage("通信に失敗しました");
    }
    const json = await response.json();
    setMesssage(json.message);
    // setData(json.data);
  }

  const submitHandler = () => {
    const name = nameInput;
    const address = addressInput;
    const tel = telInput;
    callApi(name, address, tel);
  };

  const resetData = () => {
    setNameInput("");
    setAddressInput("");
    setTelInput("");
  };

  return (
    <div className="insertUser">
      <h1 className="text-center">加入者登録</h1>
      <Link to={"/"}>
        <button className="btn btn-primary position-left">戻る</button>
      </Link>
      <div className="insertForm mx-auto">
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
        <div style={{ marginLeft: "7em" }}>
          <button
            className="btn btn-primary"
            onClick={() => {
              submitHandler();
            }}
          >
            登録
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
      <ShowMessage message={message} />
    </div>
  );
}
