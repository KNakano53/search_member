import { render, waitFor, cleanup } from "@testing-library/react";
import { InsertUser } from "../../insertUser/InsertUser";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

afterEach(() => cleanup());

describe("InsertUser", () => {
  it("初期表示", async () => {
    const { getByRole, queryByText } = render(
      <Router>
        <InsertUser />
      </Router>
    );

    expect(getByRole("textbox", { name: "氏名" })).toHaveValue("");
    expect(getByRole("textbox", { name: "住所" })).toHaveValue("");
    expect(getByRole("textbox", { name: "電話番号" })).toHaveValue("");
    expect(queryByText("通信に失敗しました")).not.toBeInTheDocument();
  });

  it("入力確認", async () => {
    const { getByLabelText } = render(
      <Router>
        <InsertUser />
      </Router>
    );

    const inputName = getByLabelText("氏名");
    userEvent.type(inputName, "テストユーザー");
    expect(inputName).toHaveValue("テストユーザー");

    const inputAddress = getByLabelText("住所");
    userEvent.type(inputAddress, "東京都新宿区");
    expect(inputAddress).toHaveValue("東京都新宿区");

    const inputTel = getByLabelText("電話番号");
    userEvent.type(inputTel, "03-1234-5678");
    expect(inputTel).toHaveValue("03-1234-5678");
  });

  it("リセット確認", async () => {
    const { getByLabelText, getByRole } = render(
      <Router>
        <InsertUser />
      </Router>
    );

    const inputName = getByLabelText("氏名");
    userEvent.type(inputName, "テストユーザー");

    const inputAddress = getByLabelText("住所");
    userEvent.type(inputAddress, "東京都新宿区");

    const inputTel = getByLabelText("電話番号");
    userEvent.type(inputTel, "03-1234-5678");

    await waitFor(() => {
      userEvent.click(getByRole("button", { name: "リセット" }));
    });
    expect(inputName).toHaveValue("");
    expect(inputAddress).toHaveValue("");
    expect(inputTel).toHaveValue("");
  });

  it("リクエスト送信", async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <InsertUser />
      </Router>
    );

    userEvent.type(getByLabelText("氏名"), "テストユーザー");

    userEvent.type(getByLabelText("住所"), "東京都新宿区");

    userEvent.type(getByLabelText("電話番号"), "03-1234-5678");

    await waitFor(() => {
      userEvent.click(getByText("登録"));
    });
    expect(getByText("登録が完了しました")).toBeInTheDocument();
    expect(getByText("新規加入者番号:TS0101")).toBeInTheDocument();
  });

  it("エラーメッセージ表示", async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <InsertUser />
      </Router>
    );

    userEvent.type(getByLabelText("氏名"), "テストユーザー");

    userEvent.type(getByLabelText("住所"), "東京都新宿区");

    await waitFor(() => {
      userEvent.click(getByText("登録"));
    });
    expect(getByText("登録処理に失敗しました")).toBeInTheDocument();
  });
});
