import _ from "lodash";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import {
  Response,
  emptyResponse,
  errorResponse,
  findAllResponse,
  idResponse,
  nextPageResponse,
} from "./mockResponse";

export const getServer = setupServer(
  http.post("http://localhost:3001/search-member", async ({ request }) => {
    const body = (await request.json()) as {
      id?: string;
      name?: string;
      address?: string;
      tel?: string;
    };
    const selectedPage = new URL(request.url).searchParams.get("page");
    if (selectedPage && selectedPage == "2") {
      return HttpResponse.json<Response>(nextPageResponse);
    }
    if (!_.isEmpty(body.id)) {
      if (_.isEqual("TS", body.id)) {
        return HttpResponse.json<Response>(emptyResponse);
      }
      return HttpResponse.json<Response>(idResponse);
    }
    if (!_.isEmpty(body.tel)) {
      if (_.isEqual("000", body.tel)) {
        return HttpResponse.json<Response>(errorResponse);
      }
      return HttpResponse.error();
    }
    return HttpResponse.json<Response>(findAllResponse);
  }),
  http.post("http://localhost:3001/insert-member", async ({ request }) => {
    const body = (await request.json()) as {
      name?: string;
      address?: string;
      tel?: string;
    };
    if (
      _.isEmpty(body.name) ||
      _.isEmpty(body.address) ||
      _.isEmpty(body.tel)
    ) {
      return HttpResponse.json<Response>({
        data: [],
        message: ["登録処理に失敗しました"],
        statusCode: 400,
      });
    }
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
      statusCode: 200,
    });
  })
);
