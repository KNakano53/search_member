import { UserModel } from "../userModel";
import React from "react";

type Props = {
  data: UserModel[];
};

const TABLE_HEAD = [
  { label: "加入者番号", key: "id" },
  { label: "氏名", key: "name" },
  { label: "住所", key: "address" },
  { label: "電話番号", key: "tel" },
];

function SearchResult(props: Props) {
  const data = props.data;

  return (
    <div className="resultTable mx-auto">
      <table className="table">
        <thead>
          <tr>
            {TABLE_HEAD.map((def) => (
              <th key={def.key}>{def.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: UserModel) => (
            <tr key={row.id}>
              {TABLE_HEAD.map((def) => {
                return <td key={`${row.id} ${def.key}`}>{row[def.key]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchResult;
