import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import {
  Response,
  emptyResponse,
  errorResponse,
  findAllResponse,
  idResponse,
  limitChangeResponse,
  nextPageResponse,
} from "./mockResponse";

export const getLimitChange = setupServer(
  http.get("http://localhost:3001/search-member", async ({ request }) => {
    const pageLimit = new URL(request.url).searchParams.get("limit");
    if (pageLimit && pageLimit == "50") {
      return HttpResponse.json<Response>(limitChangeResponse);
    }
    return HttpResponse.error();
  })
);

export const getPageChange = setupServer(
  http.get("http://localhost:3001/search-member", async ({ request }) => {
    const selectedPage = new URL(request.url).searchParams.get("page");
    if (selectedPage && selectedPage == "2") {
      return HttpResponse.json<Response>(nextPageResponse);
    }
    return HttpResponse.error();
  })
);

export const getEmptyResponse = setupServer(
  http.get("http://localhost:3001/search-member", async ({ request }) => {
    const id = new URL(request.url).searchParams.get("id");
    if (id && id == "TS") {
      return HttpResponse.json<Response>(emptyResponse);
    }
    return HttpResponse.error();
  })
);

export const getIdResponse = setupServer(
  http.get("http://localhost:3001/search-member", async ({ request }) => {
    const id = new URL(request.url).searchParams.get("id");
    if (id) {
      return HttpResponse.json<Response>(idResponse);
    }
    return HttpResponse.error();
  })
);

export const getFindAll = setupServer(
  http.get("http://localhost:3001/search-member", async () => {
    return HttpResponse.json<Response>(findAllResponse);
  })
);

export const getSearchError = setupServer(
  http.get("http://localhost:3001/search-member", async ({ request }) => {
    const tel = new URL(request.url).searchParams.get("tel");
    if (tel && "000" == tel) {
      return HttpResponse.json<Response>(errorResponse);
    }
    return HttpResponse.error();
  })
);

export const getSearchNotFound = setupServer(
  http.get("http://localhost:3001/search-member", async () => {
    return new HttpResponse(null, {
      status: 404,
      statusText: "server error",
    });
  })
);

export const getSearchSeverError = setupServer(
  http.get("http://localhost:3001/search-member", async () => {
    return HttpResponse.error();
  })
);

export const getInsertMember = setupServer(
  http.post("http://localhost:3001/insert-member", async ({ request }) => {
    const body = (await request.json()) as {
      name?: string;
      address?: string;
      tel?: string;
    };
    if (body.name && body.address && body.tel) {
      const idNum = 101;
      const strHeader = "TS";
      let strNum = idNum.toString();
      while (strNum.length < 4) {
        strNum = "0" + strNum;
      }
      const userId = strHeader + strNum;

      // レスポンスを返す
      return HttpResponse.json<Response>({
        data: [],
        message: ["登録が完了しました", "新規加入者番号:" + userId],
        status: 200,
      });
    }
    return HttpResponse.error();
  })
);

export const getInsertError = setupServer(
  http.post("http://localhost:3001/insert-member", async ({ request }) => {
    const body = (await request.json()) as {
      name?: string;
      address?: string;
      tel?: string;
    };
    if (body.name && body.address && body.tel) {
      return HttpResponse.error();
    }
    return HttpResponse.json<Response>({
      data: [],
      message: ["登録処理に失敗しました"],
      status: 400,
    });
  })
);

export const getInsertNotFound = setupServer(
  http.post("http://localhost:3001/insert-member", async () => {
    return new HttpResponse(null, {
      status: 404,
      statusText: "server error",
    });
  })
);

export const getInsertServerError = setupServer(
  http.post("http://localhost:3001/insert-member", async () => {
    return HttpResponse.error();
  })
);
