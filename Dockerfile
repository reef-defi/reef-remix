FROM node:14.15.0 as build-stage

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./ /app/

RUN npm install -g @nrwl/cli
RUN npm install

RUN nx build remix-ide --with-deps --output-hashing=all

FROM nginx:latest
COPY ./apps/remix-ide/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/apps/remix-ide /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

EXPOSE 80
