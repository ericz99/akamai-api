/* eslint-disable no-param-reassign */
const { net, IncomingMessage, session, Session } = require("electron");

const defaults = {
  timeout: 15000,
  method: "GET",
};

module.exports.request = ({ proxySession, opts }) => {
  const {
    url,
    headers,
    proxy,
    encoding = "utf8",
    timeout = 15000,
    useSessionCookies = true,
    followRedirect = false,
    followAllRedirects = false,
    body,
    form,
    json,
  } = opts;

  return new Promise((resolve, reject) => {
    try {
      const options = {
        ...defaults,
        ...opts,
        session: proxySession,
        useSessionCookies,
        redirect: followAllRedirects || followRedirect ? "follow" : "manual",
        cache: false,
      };

      const request = net.request(options);

      if (headers) {
        Object.entries(headers).map(([key, value]) => {
          if (key) {
            return request.setHeader(key, value);
          }

          return null;
        });
      }

      if (json && typeof json !== "boolean") {
        request.write(JSON.stringify(json));
      }

      if (body) {
        request.write(body);
      }

      if (form) {
        request.setHeader("Content-Type", "application/x-www-form-urlencoded");
        if (typeof form === "string") {
          request.write(form);
        } else {
          // assume it's an objectified form
          const body = Object.entries(form)
            .map(
              ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            )
            .join("&");
          request.write(body);
        }
      }

      request.on("error", (err) => {
        return reject(err);
      });

      request.on("login", (_, callback) => {
        if (proxy) {
          const [username, password] = proxy
            .split("@")[0]
            .split("http://")[1]
            .split(":");

          callback(username, password);
        }
      });

      let currentUrl = url; // no redirect - set as initial URL
      let respBody; // empty body (UTF-8) - can be buffer or string in some cases
      let bufferBody; // buffered body
      let redirects = false; // follow redirects?
      let buffers = []; // list of Buffers
      let bufferLength = 0;
      if (followRedirect || followAllRedirects) {
        redirects = true;
      }

      setTimeout(() => {
        try {
          // only if we haven't started receiving a response, time out the request
          if (bufferLength === 0) {
            request.abort();
          }
        } catch (e) {
          // Silently let it fail
        }
        return reject(new Error("net::ERR_TIMED_OUT"));
      }, timeout);

      request.on("response", async (response) => {
        response.on("error", (error) => {
          return reject(error);
        });

        response.on("end", () => {
          if (bufferLength) {
            bufferBody = Buffer.concat(buffers, bufferLength);
            if (encoding !== null) {
              respBody = bufferBody.toString(encoding);
            } else {
              respBody = bufferBody;
            }

            buffers = [];
            bufferLength = 0;
          }

          if (json) {
            // Try to parse the body
            try {
              respBody = JSON.parse(respBody);
            } catch (e) {
              // Silently fail, it's not parseable
            }
          }

          if (response.headers?.location) {
            [response.headers.location] = response.headers.location;
          }

          return resolve({
            statusCode: response.statusCode,
            headers: response.headers,
            body: respBody,
            request: {
              uri: {
                href: currentUrl,
              },
            },
          });
        });

        response.on("data", (chunk) => {
          bufferLength += chunk.length;
          buffers.push(chunk);
        });
      });

      request.on("redirect", (statusCode, _, redirectUrl, responseHeaders) => {
        if (redirects !== false) {
          currentUrl = redirectUrl;
          request.followRedirect();
        } else {
          request.abort();
          // patch in respBody to avoid TypeError
          respBody = `<html><body>You are being <a href="${redirectUrl}">redirected</a>.</body></html>`;

          if (responseHeaders.location) {
            [responseHeaders.location] = responseHeaders.location;
          }

          return resolve({
            statusCode,
            headers: responseHeaders,
            body: respBody,
            request: {
              uri: {
                href: currentUrl,
              },
            },
          });
        }
      });

      request.end();
    } catch (err) {
      return reject(new Error("Unknown error"));
    }
  });
};
