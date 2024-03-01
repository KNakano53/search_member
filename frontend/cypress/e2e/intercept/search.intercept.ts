import { limit100Data, limit20Data, limit50Data } from "./limitData";

export const findUser = () => {
  cy.intercept(
    "GET",
    "http://localhost:3001/search-member?limit=20&id=TS0001&*",
    {
      status: 200,
      message: [""],
      data: {
        items: [
          {
            id: "TS0001",
            name: "山田 太郎",
            address: "東京都港区芝公園1-2-3",
            tel: "8012345678",
          },
        ],
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
    }
  ).as("findUser");
};

export const notFound = () => {
  cy.intercept("GET", "http://localhost:3001/search-member?*", {
    status: 200,
    message: ["検索結果がありません"],
    data: {
      items: [],
    },
  }).as("notFound");
};

export const searchError = () => {
  cy.intercept("GET", "http://localhost:3001/search-member?*", {
    statusCode: 500,
  }).as("searchError");
};

export const serverError = () => {
  cy.intercept("GET", "http://localhost:3001/search-member?*", {
    forceNetworkError: true,
  }).as("serverError");
};

export const findOnes = () => {
  cy.intercept("GET", "http://localhost:3001/search-member?limit=20&*", {
    status: 200,
    message: [""],
    data: {
      items: [
        {
          id: "TS0001",
          name: "山田 太郎",
          address: "東京都港区芝公園1-2-3",
          tel: "8012345678",
        },
      ],
      meta: {
        totalItems: 2,
        itemCount: 2,
        itemsPerPage: 20,
        totalPages: 2,
        currentPage: 1,
      },
      links: {
        first: "http://localhost:3001/search-member?limit=20",
        previous: "",
        next: "http://localhost:3001/search-member?page=2&limit=20",
        last: "http://localhost:3001/search-member?page=2&limit=20",
      },
    },
  }).as("findOnes");
};

export const page1 = () => {
  cy.intercept("GET", "http://localhost:3001/search-member?page=1&*", {
    status: 200,
    message: [""],
    data: {
      items: [
        {
          id: "TS0001",
          name: "山田 太郎",
          address: "東京都港区芝公園1-2-3",
          tel: "8012345678",
        },
      ],
      meta: {
        totalItems: 2,
        itemCount: 2,
        itemsPerPage: 20,
        totalPages: 2,
        currentPage: 1,
      },
      links: {
        first: "http://localhost:3001/search-member?limit=20",
        previous: "",
        next: "http://localhost:3001/search-member?page=2&limit=20",
        last: "http://localhost:3001/search-member?page=2&limit=20",
      },
    },
  }).as("page1");
};

export const page2 = () => {
  cy.intercept("GET", "http://localhost:3001/search-member?page=2&*", {
    status: 200,
    message: [""],
    data: {
      items: [
        {
          id: "TS0002",
          name: "山田 二郎",
          address: "東京都港区芝公園1-2-3",
          tel: "9012345678",
        },
      ],
      meta: {
        totalItems: 2,
        itemCount: 2,
        itemsPerPage: 20,
        totalPages: 2,
        currentPage: 2,
      },
      links: {
        first: "http://localhost:3001/search-member?limit=20",
        previous: "http://localhost:3001/search-member?page=1&limit=20",
        next: "",
        last: "http://localhost:3001/search-member?page=2&limit=20",
      },
    },
  }).as("page2");
};

export const limit20 = () => {
  cy.intercept("GET", "http://localhost:3001/search-member?page=1&limit=20*", {
    status: 200,
    message: [""],
    data: {
      items: limit20Data,
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
  }).as("limit20");
};

export const limit50 = () => {
  cy.intercept("GET", "http://localhost:3001/search-member?page=1&limit=50*", {
    status: 200,
    message: [""],
    data: {
      items: limit50Data,
      meta: {
        totalItems: 106,
        itemCount: 50,
        itemsPerPage: 50,
        totalPages: 3,
        currentPage: 1,
      },
      links: {
        first: "http://localhost:3001/search-member?limit=50",
        previous: "",
        next: "http://localhost:3001/search-member?page=2&limit=50",
        last: "http://localhost:3001/search-member?page=3&limit=50",
      },
    },
  }).as("limit50");
};

export const limit100 = () => {
  cy.intercept("GET", "http://localhost:3001/search-member?page=1&limit=100*", {
    status: 200,
    message: [""],
    data: {
      items: limit100Data,
      meta: {
        totalItems: 110,
        itemCount: 100,
        itemsPerPage: 100,
        totalPages: 2,
        currentPage: 1,
      },
      links: {
        first: "http://localhost:3001/search-member?limit=100",
        previous: "",
        next: "http://localhost:3001/search-member?page=2&limit=100",
        last: "http://localhost:3001/search-member?page=2&limit=100",
      },
    },
  }).as("limit100");
};

export const limit50Search = () => {
  cy.intercept(
    "GET",
    "http://localhost:3001/search-member?limit=50&id=TS0001&*",
    {
      status: 200,
      message: [""],
      data: {
        items: limit50Data,
        meta: {
          totalItems: 106,
          itemCount: 50,
          itemsPerPage: 50,
          totalPages: 3,
          currentPage: 1,
        },
        links: {
          first: "http://localhost:3001/search-member?limit=50",
          previous: "",
          next: "http://localhost:3001/search-member?page=2&limit=50",
          last: "http://localhost:3001/search-member?page=3&limit=50",
        },
      },
    }
  ).as("limit50Search");
};

export const limit100Search = () => {
  cy.intercept(
    "GET",
    "http://localhost:3001/search-member?limit=100&id=TS0001&*",
    {
      status: 200,
      message: [""],
      data: {
        items: limit100Data,
        meta: {
          totalItems: 110,
          itemCount: 100,
          itemsPerPage: 100,
          totalPages: 2,
          currentPage: 1,
        },
        links: {
          first: "http://localhost:3001/search-member?limit=100",
          previous: "",
          next: "http://localhost:3001/search-member?page=2&limit=100",
          last: "http://localhost:3001/search-member?page=2&limit=100",
        },
      },
    }
  ).as("limit100Search");
};
