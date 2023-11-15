import ReactPaginate from "react-paginate";
import SearchResult from "./SearchResult";
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
};

export function ShowTable(props: Props) {
  const meta = props.metaState.meta;

  if (isEmpty(props.dataState.data)) {
    return null;
  }

  async function callApi(
    param: { id: string; name: string; address: string; tel: string },
    selectedPage: number
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
    const url = "http://localhost:3001/search-member?page=" + selectedPage;

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

  return (
    <div>
      <SearchResult data={props.dataState.data} />
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
