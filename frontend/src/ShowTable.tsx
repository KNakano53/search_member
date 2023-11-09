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
          marginPagesDisplayed={2} //先頭と末尾に表示するページの数。今回は2としたので1,2…今いるページの前後…後ろから2番目, 1番目 のように表示されます。
          pageRangeDisplayed={5} //上記の「今いるページの前後」の番号をいくつ表示させるかを決めます。
          onPageChange={handlePageChange} //ページネーションのリンクをクリックしたときのイベント(詳しくは下で解説します)
          containerClassName="pagination" //ページネーションリンクの親要素のクラス名
          pageClassName="page-item" //各子要素(li要素)のクラス名
          pageLinkClassName="page-link" //ページネーションのリンクのクラス名
          activeClassName="active" //今いるページ番号のクラス名。今いるページの番号だけ太字にしたりできます
          previousLabel="<" //前のページ番号に戻すリンクのテキスト
          nextLabel=">" //次のページに進むボタンのテキスト
          previousClassName="page-item" // '<'の親要素(li)のクラス名
          nextClassName="page-item" //'>'の親要素(li)のクラス名
          previousLinkClassName="page-link" //'<'のリンクのクラス名
          nextLinkClassName="page-link" //'>'のリンクのクラス名
          disabledClassName="disabled" //先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくするためのクラス
          breakLabel="..." // ページがたくさんあるときに表示しない番号に当たる部分をどう表示するか
          breakClassName="page-item" // 上記の「…」のクラス名
          breakLinkClassName="page-link" // 「…」の中のリンクにつけるクラス
        />
      </div>
    </div>
  );
}
