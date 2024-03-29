import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/InsertPage.css";
import { ShowMessage } from "../ShowMessage/ShowMessage";

export const InsertUser = () => {
  const [nameInput, setNameInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [telInput, setTelInput] = useState("");

  const [message, setMesssage] = useState([""]);

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
        id: "",
        name,
        address,
        tel,
      }),
    };
    const url = "http://localhost:3001/insert-member";

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setMesssage(["通信に失敗しました"]);
          return;
        }
        response.json().then((json) => {
          setMesssage(json.message);
          if (200 == json.status) {
            setNameInput("");
            setAddressInput("");
            setTelInput("");
          }
        });
      })
      .catch((error) => {
        console.log(error);
        setMesssage(["通信に失敗しました"]);
      });
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
    <div className="insertUser" data-testid="insert-user">
      <h1 className="text-center">加入者登録</h1>
      <Link to={"/"}>
        <button className="btn btn-primary position-left btn-home">戻る</button>
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
            className="btn btn-primary btn-submit"
            onClick={() => {
              submitHandler();
            }}
          >
            登録
          </button>
          <button
            className="btn btn-primary btn-reset"
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
};
