import { cleanup, render, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import { ShowTable } from "../../searchUser/ShowTable";
import { UserModel } from "../../type/userModel";
import { Meta } from "../../type/response.type";
import { nextPageData } from "../mock/mockData";
import React from "react";

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

describe("テーブル表示", () => {
  it("テーブル要素表示確認", () => {
    const { queryByText, queryByRole } = render(<ShowTable {...mockProps} />);
    expect(queryByRole("table")).toBeInTheDocument();
    expect(queryByText("テストユーザー1")).toBeInTheDocument();
    expect(queryByText("テストアドレス1")).toBeInTheDocument();
    expect(queryByText("テスト電話番号1")).toBeInTheDocument();
    expect(queryByText("テストユーザー2")).toBeInTheDocument();
    expect(queryByText("テストアドレス2")).toBeInTheDocument();
    expect(queryByText("テスト電話番号2")).toBeInTheDocument();
  });

  it("テーブル操作ボタン表示確認", () => {
    const { queryByRole, queryByLabelText } = render(
      <ShowTable {...mockProps} />
    );
    expect(queryByLabelText("表示件数")).toBeInTheDocument();
    expect(queryByRole("button", { name: "Next page" })).toBeInTheDocument();
    expect(
      queryByRole("button", { name: "Previous page" })
    ).toBeInTheDocument();
    expect(
      queryByRole("button", { name: "Page 1 is your current page" })
    ).toBeInTheDocument();
    expect(queryByRole("button", { name: "Page 2" })).toBeInTheDocument();
  });
});

describe("データ更新", () => {
  it("表示件数変更", () => {
    const { getByLabelText } = render(<ShowTable {...mockProps} />);
    fireEvent.change(getByLabelText("表示件数"), { target: { value: "50" } });
    expect(mockProps.limitState.setLimit).toHaveBeenCalledWith(50);
  });

  it("表示ページ変更", async () => {
    const { getByRole } = render(<ShowTable {...mockProps} />);
    await waitFor(async () => {
      await userEvent.click(getByRole("button", { name: "Next page" }));
    });
    expect(mockProps.dataState.setData).toHaveBeenCalledWith(nextPageData);
  });
});
