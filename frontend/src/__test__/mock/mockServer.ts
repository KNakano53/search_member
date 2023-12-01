import _ from "lodash";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";
import {
  addressResponse,
  emptyResponse,
  errorResponse,
  findAllResponse,
  idResponse,
  nameResponse,
  telResponse,
} from "./mockResponse";

export const getServer = setupServer(
  http.post("http://localhost:3001/search-member", async ({ request }) => {
    const body = await request.json();
    if (!_.isEmpty(body.id)) {
      if (_.isEqual("TS", body.id)) {
        return HttpResponse.json(emptyResponse);
      }
      return HttpResponse.json(idResponse);
    }
    if (!_.isEmpty(body.name)) {
      return HttpResponse.json(nameResponse);
    }
    if (!_.isEmpty(body.address)) {
      return HttpResponse.json(addressResponse);
    }
    if (!_.isEmpty(body.tel)) {
      if (_.isEqual("000", body.tel)) {
        return HttpResponse.json(errorResponse);
      }
      return HttpResponse.json(telResponse);
    }

    return HttpResponse.json(findAllResponse);
  })
);
