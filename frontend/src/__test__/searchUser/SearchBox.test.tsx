import { cleanup, render, screen } from "@testing-library/react";
import SearchBox from "../../searchUser/SearchBox";
import React from "react";
import * as _ from "lodash";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

afterEach(() => cleanup());

describe("検索ボックス", () => {
  it("初期表示", () => {
    render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );
    const idInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "加入者番号",
    });
    expect(_.isEmpty(idInput.value)).toBe(true);

    const nameInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "氏名",
    });
    expect(_.isEmpty(nameInput.value)).toBe(true);

    const addressInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "住所",
    });
    expect(_.isEmpty(addressInput.value)).toBe(true);

    const telInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "電話番号",
    });
    expect(_.isEmpty(telInput.value)).toBe(true);
  });

  it("入力確認", async () => {
    render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );
    const idInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "加入者番号",
    });
    await userEvent.type(idInput, "TS0001");
    expect(idInput.value).toBe("TS0001");

    const nameInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "氏名",
    });
    await userEvent.type(nameInput, "鈴木");
    expect(nameInput.value).toBe("鈴木");

    const addressInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "住所",
    });
    await userEvent.type(addressInput, "東京都");
    expect(addressInput.value).toBe("東京都");

    const telInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "電話番号",
    });
    await userEvent.type(telInput, "09012345678");
    expect(telInput.value).toBe("09012345678");
  });

  it("リセットボタン押下", async () => {
    render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );
    const idInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "加入者番号",
    });
    await userEvent.type(idInput, "TS0001");

    const nameInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "氏名",
    });
    await userEvent.type(nameInput, "鈴木");

    const addressInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "住所",
    });
    await userEvent.type(addressInput, "東京都");

    const telInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "電話番号",
    });
    await userEvent.type(telInput, "09012345678");

    const resetBtn = screen.getByRole("button", { name: "リセット" });
    await userEvent.click(resetBtn);

    expect(_.isEmpty(idInput.value)).toBe(true);
    expect(_.isEmpty(nameInput.value)).toBe(true);
    expect(_.isEmpty(addressInput.value)).toBe(true);
    expect(_.isEmpty(telInput.value)).toBe(true);
  });
});
