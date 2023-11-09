import ReactPaginate from "react-paginate";
import SearchResult from "./searchResult";
import _ from "lodash";

type Props = {
  data: any;
  pageIndex: number;
  setPageIndex: any;
};

export function ShowTable(props: Props) {
  const pageSize: number = 20;

  if (_.isEqual(props.data, [])) {
    return null;
  }

  const handlePageChange = (event: any) => {
    props.setPageIndex(event.selected);
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
