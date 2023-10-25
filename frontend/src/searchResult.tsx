import { UserModel } from "./userModel";

type Props = {
  searchFlag: boolean;
};

const TABLE_HEAD = [
  { label: "加入者番号", key: "id" },
  { label: "氏名", key: "name" },
  { label: "住所", key: "address" },
  { label: "電話番号", key: "tel" },
];

const users: UserModel[] = [
  new UserModel("TS1234", "田中 太郎", "愛知県", "012-345-678"),
  new UserModel("TS2234", "藤本 亮介", "千葉県", "012-345-678"),
  new UserModel("TS3234", "伊織 順平", "東京都", "012-345-678"),
  new UserModel("TS4234", "里中 千枝", "長野県", "012-345-678"),
  new UserModel("TS5234", "雨宮 蓮", "東京都", "012-345-678"),
];

function SearchResult(props: Props) {
  if (!props.searchFlag) return null;

  return (
    <div className="resultTable">
      <table className="table">
        <thead>
          <tr>
            {TABLE_HEAD.map((def) => (
              <th key={def.key}>{def.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* 定義にしたがって各プロパティを呼び出して Cell を作成 */}
          {users.map((row) => (
            <tr key={row.id}>
              {TABLE_HEAD.map((def) => {
                return (
                  <td key={`${row.id} ${def.key}`}>
                    {row.getParameter(def.key)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchResult;
