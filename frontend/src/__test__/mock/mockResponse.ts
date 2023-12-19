import {
  addressResponseData,
  idResponseData,
  nameResponseData,
  nextPageData,
  telResponseData,
} from "./mockData";

export interface Response {
  statusCode: number;
  message: string[];
  data: unknown;
}

export const idResponse = {
  statusCode: 200,
  message: [""],
  data: {
    items: idResponseData,
    meta: {
      totalItems: 1,
      itemCount: 1,
      itemsPerPage: 20,
      totalPages: 1,
      currentPage: 1,
    },
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "",
      last: "http://localhost:3001/search-member?page=1&limit=20",
    },
  },
};

export const nameResponse = {
  statusCode: 200,
  message: [""],
  data: {
    items: nameResponseData,
    meta: {
      totalItems: 7,
      itemCount: 7,
      itemsPerPage: 20,
      totalPages: 1,
      currentPage: 1,
    },
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "http://localhost:3001/search-member?page=2&limit=20",
      last: "http://localhost:3001/search-member?page=6&limit=20",
    },
  },
};

export const addressResponse = {
  statusCode: 200,
  message: [""],
  data: {
    items: addressResponseData,
    meta: {
      totalItems: 2,
      itemCount: 2,
      itemsPerPage: 20,
      totalPages: 1,
      currentPage: 1,
    },
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "http://localhost:3001/search-member?page=2&limit=20",
      last: "http://localhost:3001/search-member?page=6&limit=20",
    },
  },
};

export const telResponse = {
  statusCode: 200,
  message: [""],
  data: {
    items: telResponseData,
    meta: {
      totalItems: 1,
      itemCount: 1,
      itemsPerPage: 20,
      totalPages: 1,
      currentPage: 1,
    },
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "http://localhost:3001/search-member?page=2&limit=20",
      last: "http://localhost:3001/search-member?page=6&limit=20",
    },
  },
};

export const emptyResponse = {
  statusCode: 200,
  message: ["検索結果がありません"],
  data: {
    items: [],
  },
};

export const errorResponse = {
  statusCode: 400,
  message: ["検索処理でエラーが発生しました。"],
  data: {
    items: [],
  },
};

export const findAllResponse = {
  statusCode: 200,
  message: [""],
  data: {
    items: idResponse,
    meta: {
      totalItems: 106,
      itemCount: 20,
      itemsPerPage: 20,
      totalPages: 6,
      currentPage: 1,
    },
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "http://localhost:3001/search-member?page=2&limit=20",
      last: "http://localhost:3001/search-member?page=6&limit=20",
    },
  },
};

export const nextPageResponse = {
  statusCode: 200,
  message: [""],
  data: {
    items: nextPageData,
    meta: {
      totalItems: 2,
      itemCount: 2,
      itemsPerPage: 1,
      totalPages: 2,
      currentPage: 2,
    },
    links: {
      first: "http://localhost:3001/search-member?limit=20",
      previous: "",
      next: "",
      last: "http://localhost:3001/search-member?page=1&limit=20",
    },
  },
};
