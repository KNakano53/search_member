import {
  addressResponseData,
  defaultMeta,
  idResponseData,
  limitChageMeta,
  limitChangeData,
  nameResponseData,
  nextPageData,
  pageChangeMeta,
  telResponseData,
} from "./mockData";

export interface Response {
  status: number;
  message: string[];
  data: unknown;
}

export const idResponse = {
  status: 200,
  message: [""],
  data: {
    items: idResponseData,
    meta: defaultMeta,
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "",
      last: "http://localhost:3001/search-member?page=1&limit=20",
    },
  },
};

export const nameResponse = {
  status: 200,
  message: [""],
  data: {
    items: nameResponseData,
    meta: defaultMeta,
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "http://localhost:3001/search-member?page=2&limit=20",
      last: "http://localhost:3001/search-member?page=6&limit=20",
    },
  },
};

export const addressResponse = {
  status: 200,
  message: [""],
  data: {
    items: addressResponseData,
    meta: defaultMeta,
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "http://localhost:3001/search-member?page=2&limit=20",
      last: "http://localhost:3001/search-member?page=6&limit=20",
    },
  },
};

export const telResponse = {
  status: 200,
  message: [""],
  data: {
    items: telResponseData,
    meta: defaultMeta,
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "http://localhost:3001/search-member?page=2&limit=20",
      last: "http://localhost:3001/search-member?page=6&limit=20",
    },
  },
};

export const emptyResponse = {
  status: 200,
  message: ["検索結果がありません"],
  data: {
    items: [],
  },
};

export const errorResponse = {
  status: 400,
  message: ["検索処理でエラーが発生しました。"],
  data: {
    items: [],
  },
};

export const findAllResponse = {
  status: 200,
  message: [""],
  data: {
    items: idResponse,
    meta: defaultMeta,
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "http://localhost:3001/search-member?page=2&limit=20",
      last: "http://localhost:3001/search-member?page=6&limit=20",
    },
  },
};

export const nextPageResponse = {
  status: 200,
  message: [""],
  data: {
    items: nextPageData,
    meta: pageChangeMeta,
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "",
      last: "http://localhost:3001/search-member?page=1&limit=20",
    },
  },
};

export const limitChangeResponse = {
  status: 200,
  message: [""],
  data: {
    items: limitChangeData,
    meta: limitChageMeta,
    links: {
      first: "http://localhost:3001/search-member?limit=50",
      previous: "",
      next: "",
      last: "http://localhost:3001/search-member?page=1&limit=50",
    },
  },
};
