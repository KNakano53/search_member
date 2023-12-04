import { cleanup, render, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import SearchBox from "../../searchUser/SearchBox";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { ShowTable } from "../../searchUser/ShowTable";
import { UserModel } from "../../type/userModel";
import { Meta } from "../../type/response.type";
import { nextPageData } from "../mock/mockData";

afterEach(() => cleanup());

// テスト用のデータを作成します
const mockData: UserModel[] = [
  {
    id: "1",
    name: "テストユーザー1",
    address: "テストアドレス1",
    tel: "テスト電話番号1",
  },
  {
    id: "2",
    name: "テストユーザー2",
    address: "テストアドレス2",
    tel: "テスト電話番号2",
  },
];

const mockMeta: Meta = {
  totalPages: 2,
  totalItems: 2,
  itemsPerPage: 1,
  currentPage: 1,
  itemCount: 1,
};

// テスト用のpropsを作成します
const mockProps = {
  param: { id: "", name: "", address: "", tel: "" },
  metaState: {
    meta: mockMeta,
    setMeta: vi.fn(),
  },
  dataState: {
    data: mockData,
    setData: vi.fn(),
  },
  messageState: {
    message: [],
    setMesssage: vi.fn(),
  },
  limitState: {
    limit: 20,
    setLimit: vi.fn(),
  },
};

describe("ShowTable", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<ShowTable {...mockProps} />);
    expect(getByText("テストユーザー1")).toBeInTheDocument();
    expect(getByText("テストユーザー2")).toBeInTheDocument();
  });

  it("handles limit change", () => {
    const { getByLabelText } = render(<ShowTable {...mockProps} />);
    fireEvent.change(getByLabelText("表示件数"), { target: { value: "50" } });
    expect(mockProps.limitState.setLimit).toHaveBeenCalledWith(50);
  });

  it("handles page change", async () => {
    const { getByRole } = render(<ShowTable {...mockProps} />);
    await waitFor(async () => {
      await userEvent.click(getByRole("button", { name: "Next page" }));
    });
    expect(mockProps.dataState.setData).toHaveBeenCalledWith(nextPageData);
  });
});

describe("テーブル表示 with API", () => {
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
