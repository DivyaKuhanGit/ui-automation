import fetch from 'node-fetch';
import { Headers } from 'node-fetch';

import { ContextHeader, RestContext } from './ContextModel';

export async function executeRestCall<T>(requestContext: RestContext, responseType: T) {
  let requestHeaders = new Headers();

  requestContext.headers.forEach((element: ContextHeader) => {
    requestHeaders.append(element.key, element.value);
  });

  const requestOptions = {
    method: requestContext.method,
    headers: requestHeaders,
    body: JSON.stringify(requestContext.body)
  };

  let response = await fetch(
    `${Cypress.env('api-gateway')}${requestContext.route}`,
    requestOptions
  );
  let responseText = await response.text();

  return JSON.parse(responseText) as T;
}
