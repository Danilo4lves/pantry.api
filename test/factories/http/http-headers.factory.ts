import * as faker from 'faker';
import { Factory } from 'fishery';

import { HttpHeaders } from '~/common';

import { miscellaneousFactories } from '../miscellaneous';

export const httpHeadersFactory = Factory.define<HttpHeaders>(() => {
  const createOptionalString = () =>
    miscellaneousFactories.optional.build(faker.datatype.string());

  return {
    accept: createOptionalString(),
    'accept-language': createOptionalString(),
    'accept-patch': createOptionalString(),
    'accept-ranges': createOptionalString(),
    'access-control-allow-credentials': createOptionalString(),
    'access-control-allow-headers': createOptionalString(),
    'access-control-allow-methods': createOptionalString(),
    'access-control-allow-origin': createOptionalString(),
    'access-control-expose-headers': createOptionalString(),
    'access-control-max-age': createOptionalString(),
    'access-control-request-headers': createOptionalString(),
    'access-control-request-method': createOptionalString(),
    age: createOptionalString(),
    allow: createOptionalString(),
    'alt-svc': createOptionalString(),
    authorization: createOptionalString(),
    'cache-control': createOptionalString(),
    connection: createOptionalString(),
    'content-disposition': createOptionalString(),
    'content-encoding': createOptionalString(),
    'content-language': createOptionalString(),
    'content-length': createOptionalString(),
    'content-location': createOptionalString(),
    'content-range': createOptionalString(),
    'content-type': createOptionalString(),
    cookie: createOptionalString(),
    date: createOptionalString(),
    etag: createOptionalString(),
    expect: createOptionalString(),
    expires: createOptionalString(),
    forwarded: createOptionalString(),
    from: createOptionalString(),
    host: createOptionalString(),
    'if-match': createOptionalString(),
    'if-modified-since': createOptionalString(),
    'if-none-match': createOptionalString(),
    'if-unmodified-since': createOptionalString(),
    'last-modified': createOptionalString(),
    location: createOptionalString(),
    origin: createOptionalString(),
    pragma: createOptionalString(),
    'proxy-authenticate': createOptionalString(),
    'proxy-authorization': createOptionalString(),
    'public-key-pins': createOptionalString(),
    range: createOptionalString(),
    referer: createOptionalString(),
    'retry-after': createOptionalString(),
    'sec-websocket-accept': createOptionalString(),
    'sec-websocket-extensions': createOptionalString(),
    'sec-websocket-key': createOptionalString(),
    'sec-websocket-protocol': createOptionalString(),
    'sec-websocket-version': createOptionalString(),
    'set-cookie': miscellaneousFactories.optional.build(
      faker.datatype
        .array()
        .filter(item => typeof item === 'string') as string[],
    ),
    'strict-transport-security': createOptionalString(),
    tk: createOptionalString(),
    trailer: createOptionalString(),
    'transfer-encoding': createOptionalString(),
    upgrade: createOptionalString(),
    'user-agent': createOptionalString(),
    vary: createOptionalString(),
    via: createOptionalString(),
    warning: createOptionalString(),
    'www-authenticate': createOptionalString(),
  };
});
