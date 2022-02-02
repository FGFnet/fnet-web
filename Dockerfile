FROM node:14-alpine AS builder

ADD ./frontend /build
WORKDIR /build

RUN yarn install && \
    yarn build

FROM python:3.8-alpine3.14

ENV FNET_ENV production

ADD ./backend /app
WORKDIR /app

RUN apk add --update --no-cache build-base nginx curl supervisor mysql-client mariadb-connector-c-dev && \
    pip install --no-cache-dir -r /app/deploy/requirements.txt && \
    apk del build-base --purge

COPY --from=builder /build/dist /app/dist

ENTRYPOINT ["sh", "/app/deploy/entrypoint.sh" ]