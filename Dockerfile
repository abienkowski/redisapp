FROM node:18 AS build-env
COPY ./app /app
WORKDIR /app

RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs18-debian11
COPY --from=build-env /app /app
WORKDIR /app
ENTRYPOINT ["/nodejs/bin/node", "server.js"]
