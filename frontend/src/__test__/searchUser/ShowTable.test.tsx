import { cleanup, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import SearchBox from "../../searchUser/SearchBox";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

afterEach(() => cleanup());

describe("テーブル表示", () => {
  test("api呼び出し", async () => {
    render(
      <BrowserRouter>
        <SearchBox />
      </BrowserRouter>
    );
    const idInput: HTMLInputElement = screen.getByRole("textbox", {
      name: "加入者番号",
    });
    await userEvent.type(idInput, "TS0001");

    const searchBtn = screen.getByRole("button", { name: "検索" });
    await waitFor(async () => {
      await userEvent.click(searchBtn);
    });

    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
