import _ from "lodash";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import {
  Response,
  addressResponse,
  emptyResponse,
  errorResponse,
  findAllResponse,
  idResponse,
  nameResponse,
  nextPageResponse,
  telResponse,
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
    if (!_.isEmpty(body.name)) {
      return HttpResponse.json<Response>(nameResponse);
    }
    if (!_.isEmpty(body.address)) {
      return HttpResponse.json<Response>(addressResponse);
    }
    if (!_.isEmpty(body.tel)) {
      if (_.isEqual("000", body.tel)) {
        return HttpResponse.json<Response>(errorResponse);
      }
      return HttpResponse.json<Response>(telResponse);
    }
    console.log("findAll");
    return HttpResponse.json<Response>(findAllResponse);
  })
);
