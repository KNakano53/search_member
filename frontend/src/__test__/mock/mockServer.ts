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
  http.post("http://localhost:3001/search-member", ({ params }) => {
    if (!_.isEmpty(params.id)) {
      if (_.isEqual("TS", params.id)) {
        return HttpResponse.json(JSON.stringify(emptyResponse));
      }
      return HttpResponse.json(JSON.stringify(idResponse));
    }
    if (!_.isEmpty(params.name)) {
      return HttpResponse.json(JSON.stringify(nameResponse));
    }
    if (!_.isEmpty(params.address)) {
      return HttpResponse.json(JSON.stringify(addressResponse));
    }
    if (!_.isEmpty(params.tel)) {
      if (_.isEqual("000", params.tel)) {
        return HttpResponse.json(JSON.stringify(errorResponse));
      }
      return HttpResponse.json(JSON.stringify(telResponse));
    }
    return HttpResponse.json(JSON.stringify(findAllResponse));
  })
);
