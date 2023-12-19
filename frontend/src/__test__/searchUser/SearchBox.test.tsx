import { cleanup, render, waitFor } from "@testing-library/react";
import SearchBox from "../../searchUser/SearchBox";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

afterEach(() => cleanup());

describe("検索ボックス", () => {
  it("初期表示", () => {
    const { queryByRole } = render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );

    expect(queryByRole("textbox", { name: "加入者番号" })).toHaveValue("");
    expect(queryByRole("textbox", { name: "氏名" })).toHaveValue("");
    expect(queryByRole("textbox", { name: "住所" })).toHaveValue("");
    expect(queryByRole("textbox", { name: "電話番号" })).toHaveValue("");
    expect(queryByRole("table")).not.toBeInTheDocument();
  });

  it("入力確認", async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );
    const idInput = getByRole("textbox", { name: "加入者番号" });
    userEvent.type(idInput, "TS0001");
    expect(idInput).toHaveValue("TS0001");

    const nameInput = getByRole("textbox", { name: "氏名" });
    userEvent.type(nameInput, "鈴木");
    expect(nameInput).toHaveValue("鈴木");

    const addressInput = getByRole("textbox", { name: "住所" });
    userEvent.type(addressInput, "東京都");
    expect(addressInput).toHaveValue("東京都");

    const telInput = getByRole("textbox", { name: "電話番号" });
    userEvent.type(telInput, "09012345678");
    expect(telInput).toHaveValue("09012345678");
  });

  it("リセットボタン押下", async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );
    const idInput = getByRole("textbox", { name: "加入者番号" });
    userEvent.type(idInput, "TS0001");

    const nameInput = getByRole("textbox", { name: "氏名" });
    userEvent.type(nameInput, "鈴木");

    const addressInput = getByRole("textbox", { name: "住所" });
    userEvent.type(addressInput, "東京都");

    const telInput = getByRole("textbox", { name: "電話番号" });
    userEvent.type(telInput, "09012345678");

    await waitFor(() => {
      userEvent.click(getByRole("button", { name: "リセット" }));
    });

    expect(idInput).toHaveValue("");
    expect(nameInput).toHaveValue("");
    expect(addressInput).toHaveValue("");
    expect(telInput).toHaveValue("");
  });
});

describe("API呼び出し", () => {
  it("検索正常処理", async () => {
    const { getByRole, queryByRole } = render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );
    const idInput = getByRole("textbox", { name: "加入者番号" });
    userEvent.type(idInput, "TS0001");

    await waitFor(() => {
      userEvent.click(getByRole("button", { name: "検索" }));
    });

    expect(queryByRole("table")).toBeInTheDocument();
    expect(queryByRole("cell", { name: "id" })).toBeInTheDocument();
    expect(queryByRole("cell", { name: "ID検索 氏名" })).toBeInTheDocument();
    expect(queryByRole("cell", { name: "ID検索住所" })).toBeInTheDocument();
    expect(queryByRole("cell", { name: "012345678" })).toBeInTheDocument();
  });

  it("検索結果0件", async () => {
    const { getByRole, queryByRole, queryByText } = render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );
    const idInput = getByRole("textbox", { name: "加入者番号" });
    userEvent.type(idInput, "TS");

    await waitFor(() => {
      userEvent.click(getByRole("button", { name: "検索" }));
    });

    expect(queryByRole("table")).not.toBeInTheDocument();
    expect(queryByText("検索結果がありません")).toBeInTheDocument();
  });

  it("検索エラー表示", async () => {
    const { getByRole, queryByRole, queryByText } = render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );
    const idInput = getByRole("textbox", { name: "電話番号" });
    userEvent.type(idInput, "000");

    await waitFor(() => {
      userEvent.click(getByRole("button", { name: "検索" }));
    });

    expect(queryByRole("table")).not.toBeInTheDocument();
    expect(queryByText("検索処理でエラーが発生しました。")).toBeInTheDocument();
  });

  it("通信エラー表示", async () => {
    const { getByRole, queryByRole, queryByText } = render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );
    const idInput = getByRole("textbox", { name: "電話番号" });
    userEvent.type(idInput, "0120");

    await waitFor(() => {
      userEvent.click(getByRole("button", { name: "検索" }));
    });

    expect(queryByRole("table")).not.toBeInTheDocument();
    expect(queryByText("通信に失敗しました")).toBeInTheDocument();
  });
});
