import "../css/SearchPage.css";
import React, { useState } from "react";
import { ShowMessage } from "../ShowMessage/ShowMessage";
import { ShowTable } from "./ShowTable";
import { Link } from "react-router-dom";
import { Meta } from "../type/response.type";

export const SearchBox = () => {
  const [data, setData] = useState([]);
  const [message, setMesssage] = useState([""]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");

  const [meta, setMeta] = useState<Meta>({
    totalItems: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalPages: 0,
    currentPage: 0,
  });
  const [limit, setLimit] = useState(20);

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
    const url = "http://localhost:3001/search-member?limit=" + limit;

    fetch(url, requestOptions)
      .then((response) => {
        if (!response.ok) {
          setMesssage(["通信に失敗しました"]);
          return;
        }
        response.json().then((json) => {
          if (undefined == json.error) {
            setData(json.data.items);
            setMeta(json.data.meta);
          }
          setMesssage(json.message);
        });
      })
      .catch((error) => {
        console.error(error);
        setMesssage(["通信に失敗しました"]);
      });
  }

  const submitHandler = () => {
    setData([]);
    callApi(id, name, address, tel);
  };

  const resetData = () => {
    setMesssage([""]);
    setData([]);
    setId("");
    setName("");
    setAddress("");
    setTel("");
  };

  return (
    <div className="App" data-testid="search-box">
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
                className="search form-control"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
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
                className="search form-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
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
                className="search form-control"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
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
                className="search form-control"
                value={tel}
                onChange={(e) => {
                  setTel(e.target.value);
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
      <div className="d-flex flex-row-reverse btn-div">
        <Link to={"/insertUser"}>
          <button className="btn btn-primary btn-insert">加入者登録</button>
        </Link>
      </div>
      <ShowMessage message={message} />
      <ShowTable
        param={{ id, name, address, tel }}
        metaState={{ meta, setMeta }}
        dataState={{ data, setData }}
        messageState={{ message, setMesssage }}
        limitState={{ limit, setLimit }}
      />
    </div>
  );
};
