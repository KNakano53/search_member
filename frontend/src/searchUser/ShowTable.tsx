import ReactPaginate from "react-paginate";
import { isEmpty } from "lodash";
import React from "react";
import { UserModel } from "../userModel";
import { Meta } from "../response.type";

type Props = {
  param: { id: string; name: string; address: string; tel: string };
  metaState: {
    meta: Meta;
    setMeta: React.Dispatch<React.SetStateAction<Meta>>;
  };
  dataState: {
    data: UserModel[];
    setData: React.Dispatch<React.SetStateAction<never[]>>;
  };
  messageState: {
    message: string[];
    setMesssage: React.Dispatch<React.SetStateAction<string[]>>;
  };
  limitState: {
    limit: number;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
  };
};

const TABLE_HEAD = [
  { label: "加入者番号", key: "id" },
  { label: "氏名", key: "name" },
  { label: "住所", key: "address" },
  { label: "電話番号", key: "tel" },
];

export function ShowTable(props: Props) {
  const meta = props.metaState.meta;

  if (isEmpty(props.dataState.data)) {
    return null;
  }

  async function callApi(
    param: { id: string; name: string; address: string; tel: string },
    selectedPage: number,
    pageLimit?: number
  ) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        id: param.id,
        name: param.name,
        address: param.address,
        tel: param.tel,
      }),
    };
    pageLimit ??= meta.itemsPerPage;
    const url =
      "http://localhost:3001/search-member?page=" +
      selectedPage +
      "&limit=" +
      pageLimit;

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      props.messageState.setMesssage(["通信に失敗しました"]);
    }
    const json = await response.json();
    props.messageState.setMesssage(json.message);
    props.dataState.setData(json.data.items);
    props.metaState.setMeta(json.data.meta);
  }

  const handlePageChange = (selectedItem: { selected: number }) => {
    callApi(props.param, selectedItem.selected + 1);
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    props.limitState.setLimit(parseInt(event.target.value));
    props.dataState.setData([]);
    callApi(props.param, 1, parseInt(event.target.value));
  };

  return (
    <div>
      <div className="resultTable mx-auto">
        <label htmlFor="pageLimit">表示件数</label>
        <select
          id="pageLimit"
          value={props.limitState.limit}
          onChange={(e) => handleLimitChange(e)}
        >
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <table className="table">
          <thead>
            <tr>
              {TABLE_HEAD.map((def) => (
                <th key={def.key}>{def.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.dataState.data.map((row: UserModel) => (
              <tr key={row.id}>
                {TABLE_HEAD.map((def) => {
                  return <td key={`${row.id} ${def.key}`}>{row[def.key]}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paginate mx-auto">
        <ReactPaginate
          pageCount={meta.totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          previousLabel="<"
          nextLabel=">"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
          disabledClassName="disabled"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
        />
      </div>
    </div>
  );
}
