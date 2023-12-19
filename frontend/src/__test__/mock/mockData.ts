import { Meta } from "../../type/response.type";
import { UserModel } from "../../type/userModel";

export const defaultMeta: Meta = {
  totalItems: 5,
  itemCount: 5,
  itemsPerPage: 3,
  totalPages: 2,
  currentPage: 1,
};

export const pageChangeMeta: Meta = {
  totalItems: 5,
  itemCount: 5,
  itemsPerPage: 3,
  totalPages: 2,
  currentPage: 2,
};

export const limitChageMeta: Meta = {
  totalItems: 5,
  itemCount: 5,
  itemsPerPage: 50,
  totalPages: 1,
  currentPage: 1,
};

export const limitChangeData: UserModel[] = [
  {
    id: "limit",
    name: "件数変更",
    address: "件数変更",
    tel: "012345678",
  },
];

export const nextPageData: UserModel[] = [
  {
    id: "nextPg",
    name: "ページ送り",
    address: "ページ送り",
    tel: "012345678",
  },
];

export const idResponseData: UserModel[] = [
  {
    id: "id",
    name: "ID検索 氏名",
    address: "ID検索住所",
    tel: "012345678",
  },
];

export const nameResponseData: UserModel[] = [
  {
    id: "name",
    name: "name検索 氏名",
    address: "name検索住所",
    tel: "012345678",
  },
];

export const addressResponseData: UserModel[] = [
  {
    id: "address",
    name: "address検索 氏名",
    address: "address検索住所",
    tel: "012345678",
  },
];

export const telResponseData: UserModel[] = [
  {
    id: "tel",
    name: "tel検索 氏名",
    address: "tel検索住所",
    tel: "012345678",
  },
];
