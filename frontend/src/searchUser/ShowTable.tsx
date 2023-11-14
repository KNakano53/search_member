import ReactPaginate from "react-paginate";
import SearchResult from "./SearchResult";
import { isEmpty } from "lodash";
import React from "react";
import { UserModel } from "../userModel";

type Props = {
  data: UserModel[];
  pageIndex: number;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
};

export function ShowTable(props: Props) {
  const pageSize: number = 20;

  if (isEmpty(props.data)) {
    return null;
  }

  const handlePageChange = (selectedItem: { selected: number }) => {
    props.setPageIndex(selectedItem.selected);
  };

  return (
    <div>
      <SearchResult
        data={props.data.slice(
          props.pageIndex * pageSize,
          (props.pageIndex + 1) * pageSize
        )}
      />
      <div className="paginate mx-auto">
        <ReactPaginate
          pageCount={Math.ceil(props.data.length / pageSize)}
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
