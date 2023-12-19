import { cleanup, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import { ShowTable } from "../../searchUser/ShowTable";
import { UserModel } from "../../type/userModel";
import { Meta } from "../../type/response.type";
import {
  limitChageMeta,
  limitChangeData,
  nextPageData,
  pageChangeMeta,
} from "../mock/mockData";
import React from "react";

afterEach(() => {
  cleanup();
  mockProps.dataState.setData.mockClear();
  mockProps.limitState.setLimit.mockClear();
  mockProps.messageState.setMesssage.mockClear();
  mockProps.metaState.setMeta.mockClear();
});

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

const emptyDataProps = {
  param: { id: "", name: "", address: "", tel: "" },
  metaState: {
    meta: mockMeta,
    setMeta: vi.fn(),
  },
  dataState: {
    data: [],
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
    const { queryByRole } = render(<ShowTable {...mockProps} />);
    expect(queryByRole("table")).toBeInTheDocument();

    expect(
      queryByRole("columnheader", { name: "加入者番号" })
    ).toBeInTheDocument();
    expect(queryByRole("columnheader", { name: "氏名" })).toBeInTheDocument();
    expect(queryByRole("columnheader", { name: "住所" })).toBeInTheDocument();
    expect(
      queryByRole("columnheader", { name: "電話番号" })
    ).toBeInTheDocument();

    expect(queryByRole("cell", { name: "1" })).toBeInTheDocument();
    expect(
      queryByRole("cell", { name: "テストユーザー1" })
    ).toBeInTheDocument();
    expect(
      queryByRole("cell", { name: "テストアドレス1" })
    ).toBeInTheDocument();
    expect(
      queryByRole("cell", { name: "テスト電話番号1" })
    ).toBeInTheDocument();
    expect(queryByRole("cell", { name: "2" })).toBeInTheDocument();
    expect(
      queryByRole("cell", { name: "テストユーザー2" })
    ).toBeInTheDocument();
    expect(
      queryByRole("cell", { name: "テストアドレス2" })
    ).toBeInTheDocument();
    expect(
      queryByRole("cell", { name: "テスト電話番号2" })
    ).toBeInTheDocument();
  });

  it("テーブル操作ボタン表示確認", () => {
    const { queryByRole, queryByLabelText } = render(
      <ShowTable {...mockProps} />
    );
    expect(queryByLabelText("表示件数")).toBeInTheDocument();
    expect(queryByLabelText("表示件数")).toHaveValue("20");
    expect(queryByRole("button", { name: "Next page" })).toBeInTheDocument();
    expect(
      queryByRole("button", { name: "Previous page" })
    ).toBeInTheDocument();
    expect(
      queryByRole("button", { name: "Page 1 is your current page" })
    ).toBeInTheDocument();
    expect(queryByRole("button", { name: "Page 2" })).toBeInTheDocument();
  });

  it("空データ時の表示確認", () => {
    const { queryByRole, queryByLabelText } = render(
      <ShowTable {...emptyDataProps} />
    );
    expect(queryByRole("table")).not.toBeInTheDocument();
    expect(queryByLabelText("表示件数")).not.toBeInTheDocument();
    expect(queryByRole("button")).not.toBeInTheDocument();
  });
});

describe("データ更新", () => {
  it("表示件数変更", async () => {
    const { getByLabelText } = render(<ShowTable {...mockProps} />);
    await waitFor(() => {
      userEvent.selectOptions(getByLabelText("表示件数"), ["50"]);
    });

    expect(mockProps.limitState.setLimit).toHaveBeenCalledWith(50);
    expect(mockProps.messageState.setMesssage).toHaveBeenCalledWith([""]);
    expect(mockProps.dataState.setData).toHaveBeenCalledWith(limitChangeData);
    expect(mockProps.metaState.setMeta).toHaveBeenCalledWith(limitChageMeta);
  });

  it("表示ページ変更", async () => {
    const { getByRole } = render(<ShowTable {...mockProps} />);
    await waitFor(async () => {
      userEvent.click(getByRole("button", { name: "Next page" }));
    });

    expect(mockProps.messageState.setMesssage).toHaveBeenCalledWith([""]);
    expect(mockProps.dataState.setData).toHaveBeenCalledWith(nextPageData);
    expect(mockProps.metaState.setMeta).toHaveBeenCalledWith(pageChangeMeta);
  });

  it("通信エラー", async () => {
    const { getByLabelText } = render(<ShowTable {...mockProps} />);
    await waitFor(() => {
      userEvent.selectOptions(getByLabelText("表示件数"), ["100"]);
    });

    expect(mockProps.limitState.setLimit).toHaveBeenCalledWith(100);
    expect(mockProps.messageState.setMesssage).toHaveBeenCalledWith([
      "通信に失敗しました",
    ]);
    expect(mockProps.dataState.setData).toHaveBeenCalledWith([]);
    expect(mockProps.metaState.setMeta).not.toHaveBeenCalled();
  });
});
